let submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', () => {
    userLogin();
});

function userLogin() {
    let email = document.getElementById('email').value;

    let senha = document.getElementById('senha').value;

    let url = 'http://localhost:3000/api/login';
}
