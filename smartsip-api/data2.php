<?php
require '_config.php';

header('Content-Type: application/json');

if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

$limit = 50; 
$sql = "SELECT * FROM drink_data ORDER BY datetime DESC LIMIT ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $limit);
$stmt->execute();
$result = $stmt->get_result();

$data = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        foreach ($row as $key => $value) {
            if (is_numeric($value)) {
                $row[$key] = (strpos($value, '.') !== false) ? (float) $value : (int) $value;
            }
        }
        $data[] = $row;
    }
}

echo json_encode($data, JSON_PRETTY_PRINT);

$stmt->close();
$conn->close();
?>
