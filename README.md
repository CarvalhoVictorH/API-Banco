API do Cubos Bank
Bem-vindo à documentação da API do Cubos Bank, uma aplicação de gerenciamento de contas bancárias, feita inteiramente por mim, como desafio de conhecimento de node para o curso Cubos Academy. Esta API permite realizar diversas operações bancárias, como criação de contas, depósitos, saques, transferências e consultas de saldo e extrato.

Endpoints:

1. Criação de Conta
   Cria uma nova conta bancária.

URL: /contas
Método: POST
Corpo da Requisição:

{
"nome": "Nome do Cliente",
"cpf": "12345678900",
"data_nascimento": "01/01/1990",
"telefone": "11999999999",
"email": "cliente@example.com",
"senha": "123456"
}

Resposta de Sucesso:
Status: 201 Created
Corpo:

{
"numero": "1",
"saldo": 0,
"usuario": {
"nome": "Nome do Cliente",
"cpf": "12345678900",
"data_nascimento": "01/01/1990",
"telefone": "11999999999",
"email": "cliente@example.com",
"senha": "123456"
}
}

2. Depósito
   Realiza um depósito em uma conta bancária.

URL: /transacoes/depositar
Método: POST
Corpo da Requisição:

{
"numeroConta": "1",
"valor": 10000
}

Resposta de Sucesso:
Status: 201 Created
{
"mensagem": "Depósito realizado com sucesso!"
}

3. Saque
   Realiza um saque em uma conta bancária.

URL: /transacoes/sacar
Método: POST
Corpo da Requisição:

{
"numeroConta": "1",
"valor": 500
}

Resposta de Sucesso:
Status: 201 Created

Corpo:
{
"mensagem": "Saque realizado com sucesso!"
}

4. Transferência
   Realiza uma transferência entre contas bancárias.

URL: /transacoes/transferir
Método: POST
Corpo da Requisição:

{
"numeroContaOrigem": "1",
"numeroContaDestino": "2",
"valor": 2000,
"senha": "123456"
}

Resposta de Sucesso:
Status: 201 Created
Corpo:

{
"mensagem": "Transferência realizada com sucesso!"
}

5. Extrato
   Obtém o extrato das transações de uma conta bancária.

URL: /contas/extrato
Método: GET
Parâmetros de Query:
numero_conta: Número da conta
senha: Senha da conta

Resposta de Sucesso:
Status: 200 OK

Corpo:

{
"depositos": [
{
"data": "2023-08-08 12:00:08",
"numero_conta": "1",
"valor": 10000
}
// ...
],
"saques": [
{
"data": "2023-08-08 12:30:15",
"numero_conta": "1",
"valor": 500
}
// ...
],
"transferenciasEnviadas": [
{
"data": "2023-08-08 13:00:20",
"numero_conta_origem": "1",
"numero_conta_destino": "2",
"valor": 2000
}
// ...
],
"transferenciasRecebidas": [
{
"data": "2023-08-08 14:00:25",
"numero_conta_origem": "2",
"numero_conta_destino": "1",
"valor": 1000
}
// ...
]
}

Configuração:
.Clone o repositório.
.Instale as dependências usando npm install.
.Inicie o servidor usando node index.js.

Contribuição:
Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões de melhorias, por favor, abra uma issue ou envie um pull request.
