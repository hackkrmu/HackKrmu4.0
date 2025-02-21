let status = {
    door: false,
    fan: false,
    light: false
};

function toggleDevice(device) {
    status[device] = !status[device];
    alert(device + " is now " + (status[device] ? "ON" : "OFF"));
}

function handleRecharge() {
    let amount = document.getElementById('rechargeAmount').value;
    if (amount > 0) {
        alert("Metro Card Recharged with ₹" + amount);
        document.getElementById('rechargeAmount').value = "";
    } else {
        alert("Enter a valid amount!");
    }
}
