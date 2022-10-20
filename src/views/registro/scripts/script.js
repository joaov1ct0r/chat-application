let submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', async () => {
  let url = 'http://localhost:3000/api/user/register';

  let email = document.getElementById('email').value;

  let name = document.getElementById('nome').value;

  let nascimento = document.getElementById('data').value;

  let senha = document.getElementById('password').value;

  let options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({ email, name, nascimento, senha })
  };

  const response = await fetch(url, options);

  if (response.status === 201) {
    alert('Cadastro realizado com sucesso!');

    window.location.href = response.url;
  } else alert('Falha no cadastro!');
});
