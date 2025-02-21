
let billItems = [];

// Function to set the image URL to the item element
function setItemImageUrl(itemElement, imageUrl, photographerName = null, photographerUrl = null) {
    itemElement.dataset.imageUrl = imageUrl;
    const imgElement = itemElement.querySelector('.item-ai-image');
    if (imgElement) {
        imgElement.src = imageUrl;
    }

    // Handle Attribution (if Unsplash or another API requires it)
    const attributionElement = itemElement.querySelector('.attribution');
    if (attributionElement && photographerName && photographerUrl) {
        attributionElement.innerHTML = `Photo by <a href="${photographerUrl}" target="_blank">${photographerName}</a> on <a href="https://unsplash.com" target="_blank">Unsplash</a>`;
        attributionElement.style.display = 'block'; // Show the attribution
    } else if (attributionElement) {
        attributionElement.style.display = 'none'; // Hide the attribution if no info
    }
}

function addToBill(itemName, itemPrice) {
    const existingItem = billItems.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * itemPrice;
    } else {
        const newItem = {
            name: itemName,
            quantity: 1,
            price: itemPrice,
            totalPrice: itemPrice
        };
        billItems.push(newItem);
    }

    updateBill();
}

function decreaseQuantity(itemName) {
    const existingItem = billItems.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity--;

        if (existingItem.quantity <= 0) {
            // Remove the item if quantity reaches zero
            billItems = billItems.filter(item => item.name !== itemName);
        } else {
            existingItem.totalPrice = existingItem.quantity * existingItem.price;
        }

        updateBill();
    }
}

async function fetchItemImage(itemElement, itemName) {
    const unsplashApiKey = "9UI8cjbEFSSR80yogy5M6xeJMLljqSBdrV2NQMQkNdY"; // Replace with your Unsplash API key!
    const apiUrl = `https://api.unsplash.com/photos/random?query=${itemName}&client_id=${unsplashApiKey}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.error(`Unsplash API error: ${response.status} - ${response.statusText}`);
            setItemImageUrl(itemElement, "placeholder.png"); // Fallback on error
            return; // Exit the function
        }

        const data = await response.json();

        if (data && data.urls && data.urls.regular) {
            const imageUrl = data.urls.regular;  // Or 'small', 'thumb', etc.
            const photographerName = data.user.name;
            const photographerUrl = data.user.links.html;

            setItemImageUrl(itemElement, imageUrl, photographerName, photographerUrl);
        } else {
            console.warn("No image URL found in Unsplash response.");
            setItemImageUrl(itemElement, "placeholder.png");
        }

    } catch (error) {
        console.error("Error fetching image from Unsplash:", error);
        setItemImageUrl(itemElement, "placeholder.png");
    }
}

function updateBill() {
    const billItemsContainer = document.getElementById('bill-items');
    const totalAmountSpan = document.getElementById('total-amount');
    let total = 0;

    billItemsContainer.innerHTML = ''; // Clear existing bill items

    billItems.forEach(item => {
        const billItemDiv = document.createElement('div');
        billItemDiv.classList.add('bill-item');

        billItemDiv.innerHTML = `
            <span>${item.name} (${item.quantity})</span>
            <span>₹${item.price.toFixed(2)} x ${item.quantity} = ₹${item.totalPrice.toFixed(2)}</span>
            <button class="minus-button decrease-item" data-name="${item.name}">-</button>
        `;
        billItemsContainer.appendChild(billItemDiv);
        total += item.totalPrice;
    });

    totalAmountSpan.textContent = total.toFixed(2);

    // Add event listeners to the decrease buttons *after* they are added to the DOM
    const decreaseButtons = document.querySelectorAll('.decrease-item');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.dataset.name;
            decreaseQuantity(itemName);
        });
    });
}

function resetBill() {
    billItems = [];
    updateBill();
}

// Event Listeners for Add to Bill Buttons
const addToBillButtons = document.querySelectorAll('.add-to-bill');
addToBillButtons.forEach(button => {
    button.addEventListener('click', function() {
        const itemName = this.dataset.name;
        const itemPrice = parseFloat(this.dataset.price);
        addToBill(itemName, itemPrice);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const itemElements = document.querySelectorAll('.item');
    itemElements.forEach(itemElement => {
        const itemName = itemElement.querySelector('h4').textContent.replace('Snack - ', '').trim(); // Extract item name
        fetchItemImage(itemElement, itemName); // Fetch and set image
    });
});