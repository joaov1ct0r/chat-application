let submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', async () => {
  let email = document.getElementById('email').value;

  let senha = document.getElementById('senha').value;

  let url = 'http://localhost:3000/api/user/login';

  let options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({ email, senha })
  };

  const request = await fetch(url, options);

  const response = await request.json();

  if (response.status === 200) {
    alert(response.message);

    window.location.href = "http://localhost:3000/chat";
  } else alert('Falha na autenticação');
});
