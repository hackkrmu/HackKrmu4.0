// Send chat message
document.getElementById('chatInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const message = this.value;
        if (message.trim() !== '') {
            const chatWindow = document.getElementById('chatWindow');
            const newMessage = document.createElement('div');
            newMessage.className = 'message';
            newMessage.innerText = `You: ${message}`;
            chatWindow.appendChild(newMessage);
            this.value = '';
            // TODO: Add AJAX call to send the message to the backend and other users
        }
    }
});
