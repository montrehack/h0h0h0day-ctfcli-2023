<?php
session_start();
// Check if the user is logged in
if (isset($_SESSION['username'])) {
    include 'navbar.html';
    // Connect to SQLite database (if the file doesn't exist, SQLite will create it)
    $db = new SQLite3('my_database.sqlite');

    // Check for errors in connection
    if (!$db) {
        die("Connection failed: " . $db->lastErrorMsg());
    }

    $username = $_SESSION['username'];
    
    // Prepare and execute SQL statement to retrieve last login user agent for the logged-in user
    $stmt = $db->prepare("SELECT last_login_user_agent FROM users WHERE username = :username");
    $stmt->bindValue(':username', $username);
    $result = $stmt->execute();
    $row = $result->fetchArray(SQLITE3_ASSOC);
    if ($row && isset($row['last_login_user_agent']) && !empty($row['last_login_user_agent'])) {
        // Display the last login user agent without sanitization (for demonstration purposes)
        echo "<font weight='bold' size='4'>Be aware, maybe someone is trying to break into your account.<br>Displaying the Last Login Attempt.<br><br>";
        $last_login_agent = $row['last_login_user_agent'];
        $truncated_agent = strlen($last_login_agent) > 40 ? substr($last_login_agent, 0, 40) . '...........' : $last_login_agent;
        echo "Is This You ? : </font>".$truncated_agent;
        echo "<span id='fullDetails' style='color: blue; text-decoration: underline; cursor: pointer;'>See full details</span>";
        echo "<span id='fullText' style='color: Red; display: none;'> Fool, that's all I got 40 chars is more than enough</span>";
    } else {
        echo "You account is Secure, No Failed login attempts :)";
    }

    $stmt->close();
    $db->close();
} else {
    header("Location: login.php");
    exit();
}
?>
<script>
    // JavaScript code
    document.getElementById('fullDetails').addEventListener('click', function() {
        document.getElementById('fullText').style.display = 'inline';
        document.getElementById('fullDetails').style.display = 'None';
    });
</script>
