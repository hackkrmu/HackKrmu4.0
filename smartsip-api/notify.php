<?php
require '_config.php';

header('Content-Type: application/json');

$data = [];
$currentTime = date('H:i:s');

$sql = "SELECT value FROM main_data WHERE name = 'reminder_time'";
if ($result = $conn->query($sql)) {
    if ($row = $result->fetch_assoc()) {
        $reminderTime = $row['value'];
        
        $reminderTimestamp = strtotime($reminderTime);
        $currentTimestamp = strtotime($currentTime);

        if (($currentTimestamp - $reminderTimestamp) >= 1750) { 
            $data['beep'] = true;
        } else {
            $data['beep'] = false;
        }
    }
    $result->free();
} else {
    echo json_encode(['error' => 'Database query failed']);
    exit;
}

echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

$conn->close();
?>
