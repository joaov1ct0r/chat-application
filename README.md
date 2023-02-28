# node-chat-socket-mvc

<h1>EM DESENVOLVIMENTO</h1>

<h2>Sobre</h2>

<p>Sistema feito em arquitetura MVC com telas de registro e login de usuarios e chat para conversas entre usuarios registrados</p>
<p>feito em JavaScript utilizando o runtime NodeJS com o framework Express e TypeScript, protegendo rotas com JWT, autenticando dados de entrada com a biblioteca Joi, criando models, migrations e armazenando dados no banco de dados MySQL utilizando o ORM TypeORM.</p>
<p>Redis Server criado em container docker e biblioteca IORedis utilizada para armazenar mensagens do chat.</p>
<p>Testes unitários e de integração feitos com framework de testes Jest e SuperTest.</p>
<p>Ambientes de produção e desenvolvimento criados em containers Docker utilizando Dockerfile para multi stage building e Docker Compose para orquestração de containers.</p>

<h2>Requisitos</h2>

<ul>
  <li>NodeJS</li>
  <br>
  <li>NPM</li>
  <br>
  <li>Docker</li>
  <br>
  <li>Docker-Compose</li>
</ul>

<h2>MODO DE USO</h2>

<h3>GIT</h3>
<hr>

<p>FAÇA O DOWNLOADS DOS ARQUIVOS OU USE SSH:<br><code>git pull git@github.com:joaov1ct0r/node-chat-socket-mvc.git</code></p>

<h3>VARIAVEIS DE AMBIENTE</h3>
<hr>

<p>ABRA O ARQUIVO .env E ALTERE AS VARIAVEIS DE AMBIENTE COM SEUS DADOS</p>

<ul>
  <li>SERVER_HOST = HOST DO SEU SERVER</li>
  <li>SERVER_PORT = PORTA QUE VOCÊ QUEIRA RODAR O SERVIDOR</li>
  <li>REDIS_HOST = HOST DO SEU REDIS SERVER</li>
  <li>REDIS_PORT = PORTA DO SEU REDIS SERVER</li>
  <li>DB_HOST = ROTA PARA SEU BANCO DE DADOS MONGODB</li>
  <li>DB_USER = SEU USUARIO DO DB</li>
  <li>DB_PASSWORD = SENHA DA SUA DB</li>
  <li>DB_DATABASE = SUA DB</li>
  <li>DB_DATABASE_TEST = SUA DB DE TESTE</li>
  <li>DB_PORT = PORTA DA DB</li>
  <li>DB_DIALECT = DIALETO USADO NO DB</li>
  <li>NODE_ENV = VARIAVEL DE AMBIENTE DO SEU NODE</li>
  <li>FILE_NAME_ENV = ROTA PARA SEU ARQUIVO app.ts</li>
  <li>JWT_TOKEN_SECRET = SEU JWT TOKEN SECRET</li>
</ul>

<h3>SERVER</h3>
<hr>

<p>APOS TER OS ARQUIVOS EM SUA MAQUINA ESCOLHA O MODO EM QUE QUER RODAR O PROJETO:
  <br>PRODUÇÃO: <code>sudo docker compose up --build -d</code>

<br>DESENVOLVIMENTO: <code>sudo docker compose -f docker-compose.dev.yaml up --build -d</code>

</p>

<h3>APOS INICIAR O PROJETO EM SEU MODO PREFERIDO VA PARA A ROTA:<br><code>http://localhost:3000/api/docs</code>
PARA VER AS ROTAS DISPONIVEIS PARA FAZER AS REQUISIÇÕES</h3>

<h2>Picture</h2>

![chatLogin](https://user-images.githubusercontent.com/79015823/160205447-6fc4ed8a-cc34-40a3-ae3f-ed8a97da43b1.jpg)

![chatRegister](https://user-images.githubusercontent.com/79015823/160205481-d89b4a18-7c68-466f-a892-7ba7d4c77df5.jpg)

![chat](https://user-images.githubusercontent.com/79015823/160205508-be55eb00-9853-4364-a363-d2eeefd4f81d.jpg)
