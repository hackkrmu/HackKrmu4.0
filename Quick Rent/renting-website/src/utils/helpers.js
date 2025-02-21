function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    return password.length >= 6; // Example: minimum length of 6 characters
}

function showAlert(message) {
    alert(message);
}

function calculateDeliveryCharges(distance) {
    const baseCharge = 5; // Base delivery charge
    const perMileCharge = 2; // Charge per mile
    return baseCharge + (perMileCharge * distance);
}

function formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
}

function isEmpty(value) {
    return !value || value.trim().length === 0;
}