<?php
session_start();

if (!isset($_SESSION['cart']) || empty($_SESSION['cart'])) {
    header('Location: cart.html');
    exit;
}

$totalAmount = 0;
foreach ($_SESSION['cart'] as $item) {
    $totalAmount += $item['price'] * $item['quantity'];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Payment</title>
</head>
<body>
    <header>
        <nav>
            <div class="logo">
                <img src="images/logo.png" alt="Logo">
                <span>Organic Farm</span>
            </div>
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="cart.html">Cart</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <section id="payment">
        <h2>Payment</h2>
        <p>Total Amount: Rs. <?php echo $totalAmount; ?></p>

        <form action="process_payment.php" method="POST">
            <label for="name">Full Name:</label>
            <input type="text" id="name" name="name" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="address">Shipping Address:</label>
            <textarea id="address" name="address" required></textarea>

            <button type="submit">Proceed to Payment</button>
        </form>
    </section>

    <footer>
        <p>&copy; 2024 Organic Farm. All rights reserved.</p>
    </footer>
</body>
</html>
