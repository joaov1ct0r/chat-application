const submitButton = document.getElementById('submitButton')

submitButton.addEventListener('click', async () => {
  const email = document.getElementById('email').value

  const senha = document.getElementById('senha').value

  const url = 'http://localhost:3000/api/user/login'

  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({ email, senha })
  }

  const request = await fetch(url, options)

  const response = await request.json()

  if (response.status === 200) {
    alert(response.message)

    window.location.href = 'http://localhost:3000/chat'
  } else alert('Falha na autenticação')
})
