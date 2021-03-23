# Conversor de moedas

### Sobre

O objetivo deste projeto é realizar cálculos de conversões de moedas, baseados no preço e quantidade de um produto. Deste modo é possível, por exemplo, verificar preços baseados em Dólar (USD) e Euro (EUR)

### Tecnologias

- Node.js
- Sequelize (ORM)

### Instalação do projeto

Acesse a pasta do projeto e rode o comando para instalar as dependências npm:

    npm install

Criar arquivo .env e configurar as variáveis de ambiente, semelhantes ao arquivo ".env-example". O conteúdo da chave "JWT_KEY" deve ser uma String, que faz parte do processo de criação de um token

Execute as "migrations" disponíveis, por meio do comando abaixo. O banco de dados configurado em ".env" deve estar previamente criado:

    npx sequelize-cli db:migrate

Execute os "seeders" disponíveis, por meio do comando:

    npx sequelize-cli db:seed:all

E, por fim, rode o projeto:

    npm start

### Comandos importantes

Para utilização do sequelize em linha de comando (CLI), utilizar:

    npx sequelize-cli <comando>

Por exemplo:

    npx sequelize-cli --help

### Execução de testes por meio do Jest

Criar arquivo .env.test e configurar as variáveis de ambiente, semelhantes ao arquivo ".env.test-example". Este arquivo será utilizado para geração de testes, baseados em TDD. O conteúdo da chave "JWT_KEY" deve ser uma String, que faz parte do processo de criação de um token

Execute os testes disponíveis, por meio do comando:

    npm run test

Para executar testes em um arquivo específico, executar o comando:

    npm run test -- filename.test.js
    Exemplo: npm run test -- currency.test.js

Para visualização de reports, acessar o caminho abaixo

    __tests__/coverage/Icov-report/index.html

### Documentação por meio do Swagger

Para visualizar os endpoints criados, acessar o caminho

    /api-docs
    Exemplo: http://localhost:3000/api-docs/

### Observações

Os endpoints criados podem ser importados por meio do arquivo "endpoints.json" em um Software como o Postman (ou semelhante).
