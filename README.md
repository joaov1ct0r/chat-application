# node-chat-socket-mvc

<h1>EM DESENVOLVIMENTO</h1>

<h2>Requisitos</h2>

<ul>
  <li>NodeJS</li>
  <br>
  <li>NPM</li>
  <br>
  <li>Express</li>
  <br>
  <li>Sequelize</li>
  <br>
  <li>MySQL</li>
  <br>
  <li>bcrypt</li>
  <br>
  <li>dotenv</li>
  <br>
  <li>JWT</li>
  <br>
  <li>@Hapi/Joi</li>
  <br>
  <li>cookie-parser</li>
  <br>
  <li>Socket.IO</li>
  <br>
</ul>

<h2>Sobre</h2>

<p>Sistema feito em arquitetura MVC de registro e login de usuarios com chat para conversas entre usuarios registrados, feito em NodeJS com TypeScript utilizando Express e armazenando dados no banco de dados MySQL utilizando o ORM Sequelize.</p>

<h2>MODO DE USO</h2>

<h3>GIT</h3>
<hr>

<p>FAÇA O DOWNLOADS DOS ARQUIVOS OU USE SSH:<br><code>git pull git@github.com:joaov1ct0r/node-chat-socket-mvc.git</code></p>

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

<p>APOS INSERIR OS DADOS NO ARQUIVO .env DIGITE EM SEU TERMINAL: 
  <br><code>npx sequelize-cli db:create</code>
  <br><code>npx sequelize-cli db:migrate</code>
</p>

<h3>SERVER</h3>
<hr>

<p>APOS TER OS ARQUIVOS EM SUA MAQUINA ESCOLHA O MODO EM QUE QUER RODAR O PROJETO:
  <br>PRODUÇÃO: <code>npm run build</code>
  <code>npm run start</code>

<br>DESENVOLVIMENTO: <code>npm run dev</code>

</p>

<p>APOS INICIAR O PROJETO EM SEU MODO PREFERIDO VA PARA A ROTA:<br><code>http://localhost:3000/api/docs</code>
PARA VER AS ROTAS DISPONIVEIS PARA FAZER AS REQUISIÇÕES</p>

<h2>Picture</h2>

![chatLogin](https://user-images.githubusercontent.com/79015823/160205447-6fc4ed8a-cc34-40a3-ae3f-ed8a97da43b1.jpg)

![chatRegister](https://user-images.githubusercontent.com/79015823/160205481-d89b4a18-7c68-466f-a892-7ba7d4c77df5.jpg)

![chat](https://user-images.githubusercontent.com/79015823/160205508-be55eb00-9853-4364-a363-d2eeefd4f81d.jpg)
