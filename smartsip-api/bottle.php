<?php
require '_config.php';

if (isset($_GET['value']) && isset($_GET['isintake'])) {
    $amount = intval($_GET['value']);
    $isintake = intval($_GET['isintake']);

    $conn->begin_transaction();

    try {
        $stmt = $conn->prepare("INSERT INTO drink_data (amount, isintake, datetime) VALUES (?, ?, NOW())");
        $stmt->bind_param("ii", $amount, $isintake);
        $stmt->execute();
        $stmt->close();

        $stmt = $conn->prepare("UPDATE main_data SET value = ? WHERE name = 'current_level'");
        $stmt->bind_param("i", $amount);
        $stmt->execute();
        $stmt->close();

        $conn->commit();
        echo "Success: Value stored and current_level updated";
    } catch (Exception $e) {
        $conn->rollback();
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Error: Missing parameters";
}

$conn->close();
?>
