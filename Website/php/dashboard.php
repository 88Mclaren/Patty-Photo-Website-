<?php
session_start();
if (!isset($_SESSION["authenticated"])) {
    header("Location: index.html");
    exit();
}
?>
<!DOCTYPE html>
<html>
<body>
<h1>Welcome to the Dashboard</h1>
<a href="logout.php">Logout</a>
</body>
</html>