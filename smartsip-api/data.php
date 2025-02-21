<?php
require '_config.php';

header('Content-Type: application/json');

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 50;
$offset = ($page - 1) * $limit; 

$sql = "SELECT * FROM drink_data ORDER BY datetime DESC LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);

$data = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}


$total_result = $conn->query("SELECT COUNT(*) as total FROM drink_data");
$total_row = $total_result->fetch_assoc();
$total_records = $total_row['total'];
$total_pages = ceil($total_records / $limit);


$response = [
    "current_page" => $page,
    "total_pages" => $total_pages,
    "total_records" => $total_records,
    "data" => $data
];

echo json_encode($response, JSON_PRETTY_PRINT);

$conn->close();
?>
