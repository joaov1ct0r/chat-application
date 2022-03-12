let submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', () => {
    userRegister();
});

function userRegister() {
    let url = 'http://localhost:3000/api/register';

    let email = document.getElementById('email').value;

    let nome = document.getElementById('nome').value;

    let nascimento = document.getElementById('data').value;

    let senha = document.getElementById('password').value;

    let options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ email, nome, nascimento, senha })
    };

    fetch(url, options).then(response => {
        if (response.status === 200) {
            alert('Cadastro realizado com sucesso!');
        } else {
            alert('Falha no cadastro, tente novamente!');
        }
    });
}
