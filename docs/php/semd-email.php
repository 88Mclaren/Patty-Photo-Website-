<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit("Please submit the contact form.");
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$message = trim($_POST["message"] ?? "");

// Validate name and email
if (
    $name === "" ||
    strlen($name) > 100 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    strlen($email) > 254 ||
    $message === ""
) {
    http_response_code(400);
    exit("Please enter a valid name, email, and message.");
}

// Count words on the server
$words = preg_split(
    '/\s+/u',
    $message,
    -1,
    PREG_SPLIT_NO_EMPTY
);

if ($words === false || count($words) > 50) {
    http_response_code(400);
    exit("Your message must be 50 words or fewer.");
}

// Email settings — replace these placeholders
$to = "your-email@example.com";
$subject = "New Message - Patty Arana Photo";

// Remove line breaks from the name for safer email formatting
$safeName = str_replace(
    ["\r", "\n"],
    "",
    $name
);

$body = "New message from Patty Arana Photo\n\n";
$body .= "Name: " . $safeName . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Word count: " . count($words) . "\n\n";
$body .= "Message:\n" . $message . "\n";

// Use a sender address belonging to your domain
$headers = "From: website@yourdomain.com\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo "Thank you! Your message was sent successfully.";
} else {
    http_response_code(500);
    echo "Unable to send your message. Please try again later.";
}
?>