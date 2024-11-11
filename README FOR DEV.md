# API Lanchonete 5 amigos

## Integrantes do grupo 22 
- Edson Pereira de Andrade
- Evelly Cristina Cramolish Palombo Santos 
- Gabriel Fernandes Lazari 
- Marcelo Rodrigues
- Irlan Gomes

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

# Exclusivo apenas para desenvolvedores
Para desenvolvedore executar o comando:

```
docker-compose -f docker-compose-dev.yml up
```

## Nova migração:
Para criar uma migração execute o comando, trocando o valor <nome da migration> pelo nome da migração a ser criada

```
npm run migration:generate --name=<nome da migration>
```

## Rodando uma migração
Para rodar uma migração já existente execute o comando:
```
npm run migration:run
```

## Revertendo uma migração
para reverter a última migração criada, execute o comando:
```
npm run migration:revert
```


## Rodando com kubernetes
```
minikube stop
minikube delete
minikube start

kubectl create secret generic db-credentials --from-literal=username=root --from-literal=password=root &&
kubectl apply -f pvc-database.yml &&
kubectl apply -f deployment-database.yml &&
kubectl apply -f service-database.yml &&
kubectl apply -f deployment-app.yml &&
kubectl apply -f service-app.yml &&
kubectl apply -f hpa.yml &&
kubectl apply -f ingress-app.yml

kubectl port-forward service/backend-app-service 3000:3000
```
```

ngrok http http://192.168.1.196:3000

user
context.authorizer.user