<?php
$servername = "localhost";
$username = "smartsip_data";
$password = "smartsip_data";
$database = "smartsip_data";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>