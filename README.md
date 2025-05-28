# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

## Json para testes: 
```[
  {
    "entity": "Cliente",
    "objects": [
      {
        "id": 1,
        "nome": "Ana Silva",
        "email": "ana.silva@email.com",
        "telefone": "51999998888",
        "cpf": "123.456.789-01",
        "vendas": []
      },
      {
        "id": 2,
        "nome": "Pedro Oliveira",
        "email": "pedro.oliveira@email.com",
        "telefone": "51988887777",
        "cpf": "987.654.321-02",
        "vendas": []
      },
      {
        "id": 3,
        "nome": "Mariana Souza",
        "email": "mariana.souza@email.com",
        "telefone": "51977776666",
        "cpf": "111.222.333-03",
        "vendas": []
      }
    ]
  },
  {
    "entity": "Usuario",
    "objects": [
      {
        "id": 101,
        "nome": "Carlos Pereira",
        "email": "carlos.pereira@email.com",
        "senha": "senha123",
        "cargo": "Gerente",
        "vendasEfetuadas": []
      },
      {
        "id": 102,
        "nome": "Fernanda Lima",
        "email": "fernanda.lima@email.com",
        "senha": "senha456",
        "cargo": "Vendedor",
        "vendasEfetuadas": []
      },
      {
        "id": 103,
        "nome": "Ricardo Gomes",
        "email": "ricardo.gomes@email.com",
        "senha": "senha789",
        "cargo": "Vendedor",
        "vendasEfetuadas": []
      }
    ]
  },
  {
    "entity": "Veiculo",
    "objects": [
      {
        "id": 201,
        "marca": "Fiat",
        "modelo": "Uno",
        "anoFabricacao": 2020,
        "anoModelo": 2021,
        "cor": "Branco",
        "placa": "ABC1234",
        "quilometragem": 15000,
        "preco": 45000.00,
        "descricao": "Ótimo estado",
        "vendido": false,
        "vendas": []
      },
      {
        "id": 202,
        "marca": "Volkswagen",
        "modelo": "Gol",
        "anoFabricacao": 2022,
        "anoModelo": 2022,
        "cor": "Prata",
        "placa": "DEF5678",
        "quilometragem": 5000,
        "preco": 60000.00,
        "descricao": "Novo",
        "vendido": false,
        "vendas": []
      },
      {
        "id": 203,
        "marca": "Chevrolet",
        "modelo": "Onix",
        "anoFabricacao": 2021,
        "anoModelo": 2021,
        "cor": "Vermelho",
        "placa": "GHI9012",
        "quilometragem": 20000,
        "preco": 55000.00,
        "descricao": "Completo",
        "vendido": true,
        "vendas": []
      }
    ]
  },
  {
    "entity": "Venda",
    "objects": [
      {
        "id": "VEN001",
        "dataHora": "2025-05-28T19:20:00.000Z",
        "cliente": { "id": 1 },
        "veiculo": { "id": 203 },
        "vendedor": { "id": 102 },
        "valorVenda": 55000.00,
        "observacoes": "Venda à vista"
      },
      {
        "id": "VEN002",
        "dataHora": "2025-05-27T10:30:00.000Z",
        "cliente": { "id": 2 },
        "veiculo": { "id": 201 },
        "vendedor": { "id": 103 },
        "valorVenda": 46000.00,
        "observacoes": "Financiamento bancário"
      },
      {
        "id": "VEN003",
        "dataHora": "2025-05-26T15:45:00.000Z",
        "cliente": { "id": 3 },
        "veiculo": { "id": 202 },
        "vendedor": { "id": 102 },
        "valorVenda": 62000.00,
        "observacoes": null
      }
    ]
  }
]```
