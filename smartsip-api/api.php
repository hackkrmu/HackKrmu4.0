<?php
require '_config.php';

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query("SELECT name, value FROM main_data");

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[$row['name']] = is_numeric($row['value']) ? (int)$row['value'] : $row['value'];
}

$lastIntakeResult = $conn->query("SELECT datetime FROM drink_data WHERE isintake = 1 ORDER BY datetime DESC LIMIT 1");

if ($lastIntakeRow = $lastIntakeResult->fetch_assoc()) {
    $data['LastIntakeAt'] = $lastIntakeRow['datetime'];
}

$lastRefilledResult = $conn->query("SELECT datetime FROM drink_data WHERE isintake = 0 ORDER BY datetime DESC LIMIT 1");

if ($lastRefilledResult = $lastRefilledResult->fetch_assoc()) {
    $data['LastRefilledAt'] = $lastRefilledResult['datetime'];
}

$todayDate = date('Y-m-d');
$waterRefilledResult = $conn->query("SELECT SUM(amount) AS total_refilled FROM drink_data WHERE isintake = 0 AND DATE(datetime) = '$todayDate'");

if ($waterRefilledRow = $waterRefilledResult->fetch_assoc()) {
    $data['water refilled'] = (int)$waterRefilledRow['total_refilled'];
}

header('Content-Type: application/json');
echo json_encode($data, JSON_PRETTY_PRINT);

$conn->close();
?>
