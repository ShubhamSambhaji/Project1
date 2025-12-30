<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve values from the registration form
    $username = $_POST['username'];
    $password = $_POST['password']; 
   

    // Example connection to a MySQL database
    $servername = "localhost";
    $dbusername = "root";
    $dbpassword = "";
    $dbname = "dropzzy";

    $conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

    if ($conn->connect_error) {
        echo "Connection failed: " . $conn->connect_error;
    } else {
        // Example SELECT query
        $sql = "SELECT * FROM register WHERE username = '$username'AND password = '$password'";
        $result = $conn->query($sql);
        
        if ($result !== false && $result->num_rows > 0) {
            // Login successful
            $_SESSION['login_status'] = 'success';
            echo '<script>alert("Login Successful!"); setTimeout(function(){ window.location.href = "index.html"; }, 1000);</script>';
            exit();
        } else {
            $_SESSION['login_status'] = 'error';
            echo '<script>alert("Incorrect Username or Password. Please try again."); setTimeout(function(){ window.location.href = "account.html"; }, 1000);</script>';
        }
        
        $conn->close();
        
        
        
        
    }
}
?>
