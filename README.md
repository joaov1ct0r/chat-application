# Chat em NodeJS

<h1>EM DESENVOLVIMENTO</h1>

<h2>Requisitos</h2>

<ul>
  <li>NodeJS</li>
  <p><code>sudo apt install nodejs</code></p>
  <br>
  <li>NPM</li>
  <p><code>sudo apt install npm</code></p>
  <br>
  <li>Express</li>
  <p><code>npm install express</code></p>
  <br>
  <li>Sequelize</li>
  <p><code>npm install sequelize</code></p>
  <br>
  <li>MySQL</li>
  <p><code>npm install mysql2</code></p>
  <br>
  <li>bcrypt</li>
  <p><code>npm install bcryptjs</code></p>
  <br>
  <li>dotenv</li>
  <p><code>npm install dotenv</code></p>
  <br>
  <li>JWT</li>
  <p><code>npm install jsonwebtoken</code></p>
  <br>
  <li>@Hapi/Joi</li>
  <p><code>npm install @hapi/joi</code></p>
  <br>
  <li>cookie-parser</li>
  <p><code>npm install cookie-parser</code></p>
  <br>
  <li>Socket.IO</li>
  <p><code>npm install socket.io</code></p>
  <br>
</ul>

<h2>Sobre</h2>

<p>Aplicação de um Chat com tela de cadastro, login e chat utilizando a arquitetura MVC, com o front-end desenvolvido em HTML, CSS e JavaScript, e o back-end em NodeJS(Express), com rotas protegidas por JWT, validação de dados utilizando Hapi Joi e encriptando senhas com bcrypt e armazenando dados no Banco de dados MySQL com o ORM Sequelize.</p>

<h2>MODO DE USO</h2>

<h3>GIT</h3>
<hr>

<p>FAÇA O DOWNLOADS DO REPOSITORIO OU USE:<br><code>git@github.com:joaov1ct0r/chat-application.git</code></p>

<h3>DEPENDENCIAS</h3>
<hr>

<p>INSTALE TODAS AS DEPENDENCIAS DO PROJETO COM O COMANDO: <code>npm install</code></p>

<h3>VARIAVEIS DE AMBIENTE</h3>
<hr>

<p>ABRA O ARQUIVO .env E ALTERE AS VARIAVEIS DE AMBIENTE COM SEUS DADOS</p>

<ul>
  <li>SERVER_PORT = PORTA QUE VOCÊ QUEIRA RODAR O SERVIDOR</li>
  <li>DB_HOST = ROTA PARA SEU BANCO DE DADOS MONGODB</li>
  <li>DB_USER = SEU USUARIO DO DB</li>
  <li>DB_PASSWORD = SENHA DA SUA DB</li>
  <li>DB_DATABASE = SUA DB</li>
  <li>DB_PORT = PORTA DA DB</li>
  <li>JWT_TOKEN_SECRET = SEU JWT TOKEN SECRET</li>
</ul>

<h3>Sequelize</h3>
<hr>

<p>FAÇA A CONEXÃO COM SEU MYSQL SERVER INSERINDO DADOS NO ARQUIVO .ENV</p>

<h3>SERVER</h3>
<hr>

<p>APOS TER OS ARQUIVOS EM SUA MAQUINA INICIE O SERVIDOR WEB NO SEU TERMINAL COM O COMANDO:<br><code>npm start</code></p>

<p>APOS ISSO ABRA O NAVEGADOR NA ROTA:<br><code>localhost:3000/</code> A APLICAÇÃO ESTARA DISPONIVEL PARA USO.</p>

<h2>Picture</h2>

![chatLogin](https://user-images.githubusercontent.com/79015823/160205447-6fc4ed8a-cc34-40a3-ae3f-ed8a97da43b1.jpg)

![chatRegister](https://user-images.githubusercontent.com/79015823/160205481-d89b4a18-7c68-466f-a892-7ba7d4c77df5.jpg)

![chat](https://user-images.githubusercontent.com/79015823/160205508-be55eb00-9853-4364-a363-d2eeefd4f81d.jpg)
