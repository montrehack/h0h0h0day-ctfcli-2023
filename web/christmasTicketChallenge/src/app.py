import hashlib
from flask import Flask, flash, redirect, render_template, request, session, url_for, g
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Set flask app secret key for session
app.secret_key = "Grueling8-Chatroom0-Buckskin4-Possible2"


# configure the database URI or binds
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
db = SQLAlchemy(app)



# creating the user model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(64), nullable=False)

    def __repr__(self):
        return '<User %r, %r>' % (self.username, self.id)


# creating the Ticker model
class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    priority = db.Column(db.Enum('low', 'medium', 'high'), nullable=False)

    def __repr__(self):
        return '<Ticket %r, User_id : %r>' % (self.title, self.user_id)


# route for index
@app.route('/')
def index():
    return render_template('index.html')


# route for login user with a sqlite DB
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        # Hash the password.
        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        # Check if the user exists in the database.
        user = User.query.filter_by(username=username).first()

        if user and user.password_hash == hashed_password:
            # The user exists and the password is correct.
            session["user_id"] = user.id
            return redirect(url_for("dashboard"))

        else:
            # The user does not exist or the password is incorrect.
            return render_template("login.html", error="Invalid credentials.")

    return render_template("login.html")



# route for register user with a sqlite DB
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        # Hash the password.
        hashed_password = hashlib.sha256(password.encode()).hexdigest()



        # Check if the user exists in the database.
        user = User.query.filter_by(username=username).first()

        if user:
            # The user already exists.
            return render_template("register.html", error="User already exists.")

        # Create the user in the database.
        user = User(username=username, password_hash=hashed_password)
        db.session.add(user)
        db.session.commit()

        # Redirect the user to the dashboard page.
        session["user_id"] = user.id
        return redirect(url_for("dashboard"))

    return render_template("register.html")


# route for dashboard
@app.route("/dashboard", methods=["GET", "POST"])
def dashboard():
    if not session.get("user_id"):
        return redirect(url_for("login"))

    # Get all the tickets associated with the authenticated user.
    tickets = Ticket.query.filter_by(user_id=session["user_id"]).all()

    # Display the tickets in priority order.
    return render_template("dashboard.html", tickets=tickets)


# route for create ticket
@app.route("/create_ticket", methods=["GET", "POST"])
def create_ticket():
    if not session.get("user_id"):
        return redirect(url_for("login"))

    if request.method == "GET":
        return render_template("create_ticket.html")

    if request.method == "POST":
        title = request.form["title"]
        description = request.form["description"]
        priority = request.form["priority"]

        # Create a new ticket.
        ticket = Ticket(user_id=session["user_id"], title=title, description=description, priority=priority)
        db.session.add(ticket)
        db.session.commit()

        # Redirect the user to the dashboard.
        return redirect(url_for("dashboard"))


# route for view tickets
@app.route('/view_tickets', methods=['GET', 'POST'])
def view_tickets():
    
    # First verify that the user is logged-in
    if not session.get("user_id"):
        return redirect(url_for("login"))

    # Get all the tickets associated with the authenticated user.
    tickets = Ticket.query.filter_by(user_id=session["user_id"]).order_by(Ticket.priority).all()

    # Display the tickets in priority order.
    return render_template('view_tickets.html', tickets=tickets)


# route for edit ticket
@app.route('/edit', methods=['GET'])
def edit():
    
    # is the user logged-in 
    if not session.get("user_id"):
        return redirect(url_for("login"))
    

    # Get all the tickets associated with the authenticated user.
    tickets = Ticket.query.filter_by(user_id=session["user_id"]).order_by(Ticket.priority).all()

    return render_template("choose_ticket.html", tickets=tickets)


# route for edit ticket
@app.route('/edit_ticket/<ticket_id>', methods=['GET', 'POST'])
def edit_ticket(ticket_id):
    
    # is the user logged-in 
    if not session.get("user_id"):
        return redirect(url_for("login"))

    # get the ticket from the database
    ticket = Ticket.query.filter_by(id=ticket_id).first()
    
    if not ticket:
        flash("Ce ticket n'existe pas.", 'error')
        return redirect('/edit')
    
    # if method is get, return edit page
    if request.method == "GET":
        return render_template('edit_ticket.html', ticket=ticket)

    if request.method == "POST":
        if session["user_id"] != ticket.user_id:
                flash("Vous n'êtes pas autorisé à effectuer cette action, vous n'êtes pas le propriétaire du ticket.", 'error')
                return redirect('/edit_ticket/{}'.format(ticket_id ))
        
        # modify the ticket with the new form
        ticket.title = request.form["title"]
        ticket.description = request.form["description"]
        ticket.priority = request.form["priority"]
        db.session.commit()

        return redirect(url_for("dashboard"))
    
    return render_template(url_for("dashboard"))



# route for delete ticket
@app.route('/delete_ticket', methods=['GET', 'POST'])
def delete_ticket():
    if not session.get("user_id"):
        return redirect(url_for("login"))

    # verify that the current user_id is associated with the targeted ticker
    ticket_id = request.args.get("ticket_id")
    if not ticket_id:
        return redirect(url_for("dashboard"))

    ticket = Ticket.query.filter_by(id=ticket_id).first()
    if ticket.user_id != session["user_id"]:
        return redirect(url_for("dashboard"))

    # delete the ticket
    db.session.delete(ticket)
    db.session.commit()

    # Can we notify the user that the deletion have been done
    return render_template("deleted.html")


# route for logout
@app.route('/logout', methods=['GET', 'POST'])
def logout():
    # remove the user_id from the session
    session.pop("user_id", None)

    # redirect the user to the login page
    return render_template('logout.html')


# Set the current user as a global variable
@app.before_request
def before_request():
    id = session.get("user_id")

    if id:
        if not User.query.filter_by(id=id).first():
            # remove the user_id from the session
            session.pop("user_id", None)
        else :
            user = User.query.filter_by(id=id).first()
            g.username = user.username


# Create users and tickets in the database
@app.before_first_request
def fillDatabase():
    print("[+] Filling database...")

    users_to_add = [
        {"username": "casper", "password": "Require6-Gizzard9-Suspend0"},
        {"username": "frimousse", "password": "Barbecue2-Partner4-Sulfate5-Sharper2"},
        {"username": "tournico", "password": "Sterling8-Steadying0-Overarch8"},
        {"username": "lulu", "password": "Blob1-Essay1-Revolving8"},
        {"username": "tic", "password": "Heat4-Throwing6-Subtype2"},
        {"username": "tac", "password": "Imperial8-Detract5-Carport3"}
    ]
    
    for user_data in users_to_add:
        username = user_data["username"]
        password = user_data["password"]
        
        existing_user = User.query.filter_by(username=username).first()
        
        if existing_user is None:
            new_user = User(username=username, password_hash=hashlib.sha256(password.encode()).hexdigest())
            db.session.add(new_user)
    
    db.session.commit()

    all_users = User.query.all()
    
    casper_id = all_users[0].id
    frimousse_id = all_users[1].id
    tournico_id = all_users[2].id
    lulu_id = all_users[3].id
    tic_id = all_users[4].id
    tac_id = all_users[5].id

    # Creating tickets
    tickets = []

    title = "premier ticket"
    description = "Le système de ticket marche, yeah, le père noel va être content!"
    priority = "low"
    tickets.append(Ticket(user_id=casper_id, title=title, description=description, priority=priority))
    
    title = "S'assurer que toutes les commandes de jouets passent"
    description = "S'assurer que tous les autres lutins vont réussir à passer leurs commandes de jouets à temps pour noel"
    priority = "high"
    tickets.append(Ticket(user_id=frimousse_id, title=title, description=description, priority=priority))

    title = "Essayer le jeu 'Minecraft' pour être sûr que c'est adéquat pour le petit Simon"
    description = "Simon veut jouer à Minecraft pour noel, mais je ne suis pas sûr si c'est adéquat, je devrai donc l'essayer"
    priority = "medium"
    tickets.append(Ticket(user_id=frimousse_id, title=title, description=description, priority=priority))

    title = "Vérifier les stocks de cadeaux pour les enfants de 3 à 5 ans"
    description = "Assurer que nous avons suffisamment de cadeaux adaptés pour les enfants de 3 à 5 ans pour noel"
    priority = "high"
    tickets.append(Ticket(user_id=tournico_id, title=title, description=description, priority=priority))

    title = "Tester la fonctionnalité de paiement en ligne pour les commandes de noel"
    description = "Vérifier que le système de paiement en ligne fonctionne sans problème pour les commandes de noel"
    priority = "medium"
    tickets.append(Ticket(user_id=lulu_id, title=title, description=description, priority=priority))

    title = "Créer une liste des articles cadeaux les plus demandés par région"
    description = "Compiler une liste des articles les plus demandés par région pour optimiser la production"
    priority = "high"
    tickets.append(Ticket(user_id=tic_id, title=title, description=description, priority=priority))

    title = "Assurer la disponibilité des emballages cadeaux pour l'expédition"
    description = "Vérifier que nous avons suffisamment d'emballages cadeaux pour l'expédition des commandes de noel"
    priority = "low"
    tickets.append(Ticket(user_id=tac_id, title=title, description=description, priority=priority))

    title = "Effectuer une vérification de sécurité du système de commande en ligne"
    description = "Procéder à une vérification de sécurité pour prévenir toute faille potentielle dans le système de commande"
    priority = "high"
    tickets.append(Ticket(user_id=tac_id, title=title, description=description, priority=priority))

    title = "Organiser une séance de formation pour les nouveaux lutins"
    description = "Planifier une séance de formation pour les nouveaux arrivants afin de les préparer pour noel"
    priority = "medium"
    tickets.append(Ticket(user_id=frimousse_id, title=title, description=description, priority=priority))

    title = "Créer des annonces pour les promotions de noel sur les réseaux sociaux"
    description = "Concevoir des annonces attrayantes pour promouvoir nos offres spéciales de noel sur les réseaux sociaux"
    priority = "high"
    tickets.append(Ticket(user_id=casper_id, title=title, description=description, priority=priority))

    title = "Tester la fiabilité des serveurs pour la période de noel"
    description = "Effectuer des tests de charge pour s'assurer que nos serveurs peuvent gérer le trafic de noel"
    priority = "low"
    tickets.append(Ticket(user_id=tournico_id, title=title, description=description, priority=priority))

    title = "Optimiser le processus d'emballage pour réduire les délais de livraison"
    description = "Identifier des moyens d'optimiser l'emballage pour accélérer la livraison des commandes de noel"
    priority = "medium"
    tickets.append(Ticket(user_id=tournico_id, title=title, description=description, priority=priority))

    title = "Coordonner avec les transporteurs pour assurer les livraisons à temps"
    description = "Contacter les transporteurs pour garantir que les livraisons de noel seront effectuées dans les délais"
    priority = "high"
    tickets.append(Ticket(user_id=tic_id, title=title, description=description, priority=priority))

    title = "Mettre à jour le catalogue en ligne avec les derniers articles disponibles"
    description = "Ajouter les nouveaux articles disponibles dans le catalogue en ligne pour noel"
    priority = "low"
    tickets.append(Ticket(user_id=frimousse_id, title=title, description=description, priority=priority))

    title = "Effectuer des tests de compatibilité pour les jouets électroniques"
    description = "Vérifier la compatibilité des jouets électroniques avec différents appareils avant noel"
    priority = "high"
    tickets.append(Ticket(user_id=lulu_id, title=title, description=description, priority=priority))

    title = "Élaborer un plan de gestion du service client pendant la période de noel"
    description = "Créer un plan pour gérer efficacement les demandes du service client pendant la période chargée de noel"
    priority = "high"
    tickets.append(Ticket(user_id=lulu_id, title=title, description=description, priority=priority))

    title = "Configurer des offres groupées attractives pour les cadeaux de noel"
    description = "Créer des offres groupées pour inciter les clients à acheter plusieurs cadeaux en même temps"
    priority = "medium"
    tickets.append(Ticket(user_id=frimousse_id, title=title, description=description, priority=priority))

    title = "Vérifier la disponibilité des articles promotionnels pour noel"
    description = "Assurer que nous avons suffisamment d'articles promotionnels pour accompagner les commandes de noel"
    priority = "low"
    tickets.append(Ticket(user_id=casper_id, title=title, description=description, priority=priority))

    title = "Organiser une réunion pour discuter des préparatifs finaux pour noel"
    description = "Réunir les équipes pour finaliser les détails et s'assurer que tout est prêt pour noel"
    priority = "high"
    tickets.append(Ticket(user_id=tournico_id, title=title, description=description, priority=priority))

    title = "Mettre en place un système de suivi des expéditions pour les clients"
    description = "Créer un système de suivi des expéditions pour que les clients puissent suivre leurs commandes de noel"
    priority = "medium"
    tickets.append(Ticket(user_id=tac_id, title=title, description=description, priority=priority))

    title = "Tester la fonctionnalité de paiement mobile pour les commandes de noel"
    description = "Vérifier que le système de paiement mobile fonctionne correctement pour les commandes de noel."
    priority = "medium"
    tickets.append(Ticket(user_id=tac_id, title=title, description=description, priority=priority))

    title = "Organiser une campagne marketing par e-mail pour les offres de noel"
    description = "Préparer et envoyer une campagne marketing par e-mail pour promouvoir nos offres spéciales de noel"
    priority = "low"
    tickets.append(Ticket(user_id=tic_id, title=title, description=description, priority=priority))

    title = "S'assurer de ne pas donner le FLAG à n'importe qui!!"
    description = "S'assurer que le flag, FLAG-JAIHATEANOELETALABOUFFEDENOEL, qui contient un secret, ne soit pas divulguer à n'importe qui.."
    priority = "high"
    tickets.append(Ticket(user_id=casper_id, title=title, description=description, priority=priority))

    title = "Effectuer des tests de sécurité pour protéger les données des clients à noel"
    description = "Mener des tests de sécurité pour garantir la protection des données clients pendant la période de noel"
    priority = "high"
    tickets.append(Ticket(user_id=tac_id, title=title, description=description, priority=priority))

    for ticket in tickets:
        if not Ticket.query.filter_by(title=ticket.title).first():
            db.session.add(ticket)
    
    db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    
    app.run(host="0.0.0.0", debug=False)
