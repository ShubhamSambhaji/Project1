<?php
$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "dropzzy";

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    echo "Connection failed: " . $conn->connect_error;
} else {
// Function to add a product to the database
function addProductToDatabase($title, $price, $quantity) {
    global $conn;

    // Escape user inputs to prevent SQL injection (optional)
    $title = mysqli_real_escape_string($conn, $title);
    $price = mysqli_real_escape_string($conn, $price);
    $quantity = mysqli_real_escape_string($conn, $quantity);

    // SQL query to insert the product into the database
    $sql = "INSERT INTO products (title, price, quantity) VALUES ('$title', '$price', '$quantity')";

    if ($conn->query($sql) === TRUE) {
        echo "Product added to the database successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Example usage
if (isset($_POST['addToCart'])) {
    
        $productTitle = $_POST['productTitle'];
        $productPrice = $_POST['productPrice'];
        $productQuantity = $_POST['productQuantity'];
    
        // Process the data and add to the database or perform other actions
        // ...
      addProductToDatabase($productTitle, $productPrice, $productQuantity);
        // Send a response back to the JavaScript code if needed
        echo "Data received successfully";
    
    }

// Close the database connection
$conn->close();
?>