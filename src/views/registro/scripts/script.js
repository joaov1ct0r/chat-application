const submitButton = document.getElementById('submitButton')

submitButton.addEventListener('click', async () => {
  const url = 'http://localhost:3000/api/user/register'

  const email = document.getElementById('email').value

  const name = document.getElementById('nome').value

  const nascimento = document.getElementById('data').value

  const senha = document.getElementById('password').value

  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({ email, name, nascimento, senha })
  }

  const request = await fetch(url, options)

  const response = await request.json()

  if (response.status === 201) {
    alert(response.message)
  } else alert('Falha no cadastro!')
})
