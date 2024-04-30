<?php
// SQLite database file path
$databaseFile = 'my_database.sqlite';

try {
    // Create or open the SQLite database file
    $db = new SQLite3($databaseFile);

    // Check if the database file was created/opened successfully
    if (!$db) {
        die("Error: Unable to create/open the database file.");
    }

    // SQL command to create the users table
    $createQuery = "CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        last_login_user_agent TEXT
    )";

    // Execute the create table command
    $db->exec($createQuery);

    // Insert admin account if it doesn't exist
    $adminUsername = 'admin';
    $adminPassword = 'adm11ns3cy0urP4Ssw00rd';
    $hashedAdminPassword = password_hash($adminPassword, PASSWORD_DEFAULT);

    $checkAdminQuery = "SELECT * FROM users WHERE username = :username";
    $stmt = $db->prepare($checkAdminQuery);
    $stmt->bindValue(':username', $adminUsername);
    $result = $stmt->execute();
    $row = $result->fetchArray(SQLITE3_ASSOC);

    if (!$row) {
        $insertAdminQuery = "INSERT INTO users (username, password, last_login_user_agent) VALUES 
            (:username, :password, '')";
        $stmt = $db->prepare($insertAdminQuery);
        $stmt->bindValue(':username', $adminUsername);
        $stmt->bindValue(':password', $hashedAdminPassword);
        $stmt->execute();
    }

    // Close the database connection
    $db->close();

    echo "SQLite database setup completed successfully.";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
