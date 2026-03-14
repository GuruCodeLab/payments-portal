
Payments Portal API

Run Steps:

1) Extract ZIP
2) Open terminal

cd payments-api

3) Install packages
dotnet restore

4) Create DB
dotnet ef migrations add InitialCreate
dotnet ef database update

5) Run API
dotnet run

Swagger
http://localhost:5000/swagger
