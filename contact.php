<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve values from the registration form
    $fname = $_POST['fname'];
    $lname = $_POST['lname']; 
    $email = $_POST['email'];
    $pnumber = $_POST['Pnumber'];
    $message = $_POST['message'];


// Database connection parameters
$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "dropzzy";

// Create a new MySQLi connection
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

// Check if the connection is successful
if ($conn->connect_error) {
    // If there's an error, print the error message
    echo "Connection failed: " . $conn->connect_error;
} else {
    $sql = "INSERT INTO `contact` (`Fname`, `Lname`, `Email`, `Pnumber`, `Message`) VALUES ('$fname', '$lname', '$email', '$pnumber', '$message')";
    
    if ($conn->query($sql) === TRUE) {
        // Display a success alert
        echo '<script>alert("Message is sent. Redirecting to index.html."); window.location.href = "index.html";</script>';
        } 
    else {
        echo "Connect Error";
    }
 }
}

// Close the database connection
$conn->close();
?>
