# API Lanchonete 4 amigos

## Integrantes do grupo 22 
- Edson Pereira de Andrade
- Evelly Cristina Cramolish Palombo Santos 
- Gabriel Fernandes Lazari 
- Marcelo Rodrigues

## Tecnologias
Essa api foi desenvolvivida usando as seguintes tecnologias:
 - Nestjs;
 - TypeORM;
 - Banco de dados Postgres
 - Migrations
 - Docker


## Executar o projeto
Para executar o projeto é necessário rodar apenas o comando abaixo:

```
docker-compose up
```

## Swagger

Todos os endpoint estão documentos utilizando o Swagger, o endereço disponível após subir a aplicação é:

```
  http://localhost:3000/api-docs
```  

# Aplicação

## Gerenciamento de categoria
Todo o gerenciamento de categorias de produtos estão disponíveis nos endpoints [/category](http://localhost:3000/api-docs#/Categoria)


## Gerenciamentos de clientes
O gerenciamento de cliente estão disponíveis nos endpoints [/customer](http://localhost:3000/api-docs#/Cliente)

## Gerenciamentos de Produtos
O gerenciamento de produtos estão disponíveis nos endpoints [/prodcut](http://localhost:3000/api-docs#/Produto)

## Gerenciamentos de Pedido
O gerenciamento de pedido estão disponíveis nos endpoints [/order](http://localhost:3000/api-docs#/Pedidos).

Para alteração de status de um pedido existe o endpoint [/orders/{id}/change_status/{status}](http://localhost:3000/api-docs#/Pedidos/OrderController_changeStatus), para saber o status correto existe o endpoint [/orders/status](http://localhost:3000/api-docs#/Pedidos/OrderController_getListStatus)