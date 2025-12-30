<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve values from the registration form
    $username = $_POST['username'];
    $password = $_POST['password']; 
    $email = $_POST['email'];

    //  connection to a MySQL database
    $servername = "localhost";
    $dbusername = "root";
    $dbpassword = "";
    $dbname = "dropzzy";

    $conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

    if ($conn->connect_error) {
        echo "Connection failed: " . $conn->connect_error;
    } else {
        // TODO: Implement input validation

        // Example INSERT query
        $sql = "INSERT INTO `register` (`UserName`, `Password`, `Email`) VALUES ('$username', '$password', '$email')";

        if ($conn->query($sql) === TRUE) {
            // Registration successful
            $_SESSION['registration_status'] = 'success';
            echo '<script>alert("Registration successful!"); setTimeout(function(){ window.location.href = "index.html"; }, 1000);</script>';
            exit();
        } else {
            // Registration failed
            $_SESSION['registration_status'] = 'error';
            $_SESSION['registration_message'] = "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
        header('Location: index.html'); // Redirect to index.html
        exit();
    }
}
?>
