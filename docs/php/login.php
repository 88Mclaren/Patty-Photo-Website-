<?php
session_start();

// Example hardcoded credentials (replace with database later)
$validUser = "admin";
$validPass = "12345";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    if ($username === $validUser && $password === $validPass) {
        $_SESSION["authenticated"] = true;
        header("Location: dashboard.php");
        exit();
    } else {
        echo "Invalid login. <a href='index.html'>Try again</a>";
    }
}
?>