<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Validate input
    if (!empty($name) && !empty($email) && !empty($message)) {
        // Send email (replace with actual email details)
        $to = "info@organicfarm.com"; // Replace with your email
        $subject = "Contact Form Submission from " . $name;
        $message_body = "Name: " . $name . "\nEmail: " . $email . "\nMessage: " . $message;
        $headers = "From: " . $email;

        // Use PHP's mail() function
        if (mail($to, $subject, $message_body, $headers)) {
            echo "Thank you for your message. We will get back to you soon!";
        } else {
            echo "There was an error submitting the form. Please try again.";
        }
    } else {
        echo "All fields are required.";
    }
}
?>
