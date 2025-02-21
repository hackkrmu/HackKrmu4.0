document.getElementById('textForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const text = document.getElementById('text').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    for (let char of text) {
        if (char.match(/[a-z]/)) {
            const img = document.createElement('img');
            img.src = `/static/images/${char}.png`;
            resultDiv.appendChild(img);
        }
    }
});
