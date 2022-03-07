let submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', () => {
    userRegister();
});

function userRegister() {
    let url = 'http://localhost:3000/api/register';

    let email = document.getElementById('email').value;
}
