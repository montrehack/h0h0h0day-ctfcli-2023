<?php
// Connect to SQLite database (if the file doesn't exist, SQLite will create it)
$db = new SQLite3('my_database.sqlite');

// Check for errors in connection
if (!$db) {
    die("Connection failed: " . $db->lastErrorMsg());
}

session_start();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $userAgent = $_SERVER['HTTP_USER_AGENT']; // Get the user agent
 
    // Prepare and execute SQL statement to retrieve user data from the database
    $stmt = $db->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->bindValue(':username', $username);

    $result = $stmt->execute();
    $row = $result->fetchArray(SQLITE3_ASSOC);

    if ($row) {
        // Verify password
        if (password_verify($password, $row['password'])) {
            // Password is correct, set session variables and redirect to dashboard
            $_SESSION['username'] = $username;
            header("Location: dashboard.php");
            exit();
        } else {
            // Incorrect password
            // Log the failed login attempt by updating last_login_user_agent
            $updateStmt = $db->prepare("UPDATE users SET last_login_user_agent = :user_agent WHERE username = :username");
            $updateStmt->bindValue(':user_agent', $userAgent);
            $updateStmt->bindValue(':username', $username);
            $updateStmt->execute();
 
            echo "Incorrect password!";
        }
    } else {
        // User does not exist
        echo "User not found!";
    }

    $stmt->close();
}
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login Page</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<?php include 'navbar.html'; ?> <!-- Include the navigation bar -->
    <center><h2>Login</h2></center>
    <div class="container">
    <form method="post" action="<?php echo $_SERVER["PHP_SELF"]; ?>">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>
        
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>
        
        <input type="submit" value="Login">
    </form>
</div>
</body>
</html>

<?php
$db->close(); // Close the database connection
?>
