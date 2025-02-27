<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $address = $_POST['address'];

    // In a real application, you would integrate with a payment gateway (e.g., Stripe or PayPal)
    echo "Thank you, $name! Your order will be shipped to $address.";
    unset($_SESSION['cart']); // Clear the cart
}
?>
