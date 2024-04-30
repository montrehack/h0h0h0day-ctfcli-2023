<?php
// Connect to SQLite database (if the file doesn't exist, SQLite will create it)
$db = new SQLite3('my_database.sqlite');

// Check for errors in connection
if (!$db) {
    die("Connection failed: " . $db->lastErrorMsg());
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Hash the password before storing it in the database
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Create users table if not exists
    $createTableQuery = "CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        last_login_user_agent TEXT
    )";
    $db->exec($createTableQuery);

    // Prepare and execute SQL statement to insert user data into the database
    $stmt = $db->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
    $stmt->bindValue(':username', $username);
    $stmt->bindValue(':password', $hashed_password);

    if ($stmt->execute()) {
        // Registration successful
        echo "Registration successful! <a href='login.php'>Click here to login</a>";
    } else {
        // Registration failed
        echo "Error: " . $db->lastErrorMsg();
    }

    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Registration Page</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<?php include 'navbar.html'; ?>
    <center><h2>Register</h2></center>
    <div class="container">
    <form method="post" action="<?php echo $_SERVER["PHP_SELF"]; ?>">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>
        
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>
        
        <input type="submit" value="Register">
    </form>
</div>
</body>
</html>

<?php
$db->close(); // Close the database connection
?>
