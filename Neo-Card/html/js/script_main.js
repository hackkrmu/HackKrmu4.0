const signIn = document.getElementById('sign-in-button')
const signUp = document.getElementById('sign-up-button')

signIn.addEventListener('click', () => {
    window.location.href = "html/login.html"
})

signUp.addEventListener('click', () => {
    window.open("https://forms.gle/uo7H9cZUVVn2ReWw9", "_blank")
})