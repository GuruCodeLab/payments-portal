
# 💳 Payments Portal

A modern, full-stack payment management application built with **ASP.NET Core** backend and **Angular** frontend. Manage payments with a professional UI, real-time data sync, and responsive design.

## 📋 Features

-  **Create Payments** - Add new payment transactions with amount and currency
-  **View Payments** - Display all payments in a responsive grid with sorting and pagination
-  **Edit Payments** - Update existing payment details (amount, currency)
-  **Delete Payments** - Remove payments with confirmation dialog
-  **Multi-Currency Support** - USD, EUR, INR, GBP currencies
-  **Real-Time Validation** - Form validation with error messaging
-  **Professional UI** - Modern light theme with Kendo UI components
-  **REST API** - Full REST API with Swagger documentation
-  **CORS Support** - Cross-origin requests enabled for SPA integration
-  **Database Persistence** - SQL Server with Entity Framework Core

## 🛠️ Tech Stack

### Backend
- **.NET 10.0** / **.NET 8.0** - C# ASP.NET Core Web API
- **Entity Framework Core** - ORM for database operations
- **SQL Server** - Relational database
- **Swagger/OpenAPI** - API documentation

### Frontend
- **Angular 21** - Modern TypeScript framework
- **Kendo UI** - Enterprise UI components
- **TailwindCSS** - Utility-first CSS framework
- **RxJS** - Reactive programming library

## 📦 Prerequisites

Before you begin, ensure you have installed:

- **.NET SDK 10.0** or **.NET 8.0** ([Download](https://dotnet.microsoft.com/download))
- **Node.js 18+** & **npm 10+** ([Download](https://nodejs.org/))
- **SQL Server** 2019+ or **SQL Server Express** ([Download](https://www.microsoft.com/en-us/sql-server/sql-server-downloads))
- **Visual Studio Code** or **Visual Studio 2022** (Optional but recommended)

## 🚀 Setup & Installation

### Step 1: Extract & Navigate

```bash
# Navigate to project folder
cd c:\Projects\payments-api-complete
```

### Step 2: Backend Setup (ASP.NET Core API)

```bash
# Navigate to API project
cd payments-api

# Restore NuGet packages
dotnet restore

# Configure database connection (edit appsettings.json if needed)
# Default: "Server=.;Database=PaymentsDb;Trusted_Connection=true;"

# Create and update database
dotnet ef database update

# Run the API server (localhost:5000)
dotnet run
```

**Verify API is running:**
- Open browser: `http://localhost:5000/swagger`
- You should see the Swagger UI with available endpoints

### Step 3: Frontend Setup (Angular SPA)

```bash
# Navigate to UI project
cd ../payments-ui

# Install npm dependencies
npm install

# Start development server (localhost:4200)
ng serve

# Or build for production
ng build --configuration production
```

**Verify UI is running:**
- Open browser: `http://localhost:4200`
- You should see the PaymentsPortal interface

## 🎯 Running the Application

### Option 1: Development Mode

**Terminal 1 - Backend API:**
```bash
cd payments-api
dotnet run
# API runs on: http://localhost:5000
```

**Terminal 2 - Frontend UI:**
```bash
cd payments-ui
ng serve
# UI runs on: http://localhost:4200
```

### Option 2: Production Build

**Build and deploy the frontend:**
```bash
cd payments-ui
ng build --configuration production
# Output: dist/payments-ui/browser/
```

**Package and run the backend:**
```bash
cd payments-api
dotnet publish -c Release
# Run the published app or deploy to server
```

## 📡 API Endpoints

All endpoints are available at `http://localhost:5000/api/payments`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/payments` | Get all payments |
| `POST` | `/api/payments` | Create new payment |
| `PUT` | `/api/payments/{id}` | Update payment |
| `DELETE` | `/api/payments/{id}` | Delete payment |

### Request/Response Examples

**Create Payment (POST)**
```json
{
  "amount": 54.99,
  "currency": "USD",
  "clientRequestId": "97f63471-b88d-4b13-8cc1-45a0b8b5dc71"
}
```

**Response (201 Created)**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "reference": "PAY-001",
  "amount": 54.99,
  "currency": "USD",
  "clientRequestId": "97f63471-b88d-4b13-8cc1-45a0b8b5dc71",
  "createdAt": "2026-03-14T16:10:34.123Z"
}
```

**View Swagger Docs**
- Open: `http://localhost:5000/swagger`

## 📁 Project Structure

```
payments-api-complete/
├── payments-api/                 # .NET Core Backend
│   ├── Controllers/
│   │   └── PaymentsController.cs
│   ├── Data/
│   │   └── AppDbContext.cs
│   ├── Models/
│   │   ├── Payment.cs
│   │   ├── CreatePaymentRequest.cs
│   │   └── UpdatePaymentRequest.cs
│   ├── Services/
│   │   └── PaymentService.cs
│   ├── Migrations/
│   ├── appsettings.json
│   ├── PaymentsApi.csproj
│   └── Program.cs
│
├── payments-ui/                  # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── payment-form/
│   │   │   │   └── payments-list/
│   │   │   ├── models/
│   │   │   │   └── payment.model.ts
│   │   │   ├── services/
│   │   │   │   └── payment.service.ts
│   │   │   ├── app.config.ts
│   │   │   ├── app.routes.ts
│   │   │   └── app.ts
│   │   ├── styles.css
│   │   └── main.ts
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
└── README.md                     # This file
```

## 🗄️ Database Setup

The application uses **SQL Server** with Entity Framework Core migrations.

### Connection String (appsettings.json)

```json
{
  "ConnectionStrings": {
    "Default": "Server=.;Database=PaymentsDb;Trusted_Connection=true;"
  }
}
```

### Database Operations

```bash
cd payments-api

# Create a new migration
dotnet ef migrations add MigrationName

# Apply migrations to database
dotnet ef database update

# Drop the database
dotnet ef database drop

# View migration history
dotnet ef migrations list
```

## 🔧 Configuration

### API Configuration (appsettings.json)

```json
{
  "ConnectionStrings": {
    "Default": "Server=.;Database=PaymentsDb;Trusted_Connection=true;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  }
}
```

### CORS Configuration (Program.cs)

CORS is enabled for:
- `http://localhost:4200` (Frontend SPA)
- `http://localhost:3000` (Alternative frontend)

To add more origins, edit the CORS policy in `Program.cs`.

## 🐛 Troubleshooting

### Issue: API Port Already in Use
```bash
# Kill process on port 5000 (Windows PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
```

### Issue: Database Connection Error
- Verify SQL Server is running
- Check connection string in `appsettings.json`
- Ensure database name is correct

### Issue: CORS Error on Frontend
- Ensure API is running on `http://localhost:5000`
- Check browser console for specific error
- Verify CORS policy in `Program.cs` includes your origin

### Issue: Port 4200 Already in Use
```bash
# Use alternative port
ng serve --port 4300
```

## 📝 Notes

- Review rates are generated automatically based on the payment reference
- Payments are stored with creation timestamp
- All amounts are stored with 2 decimal precision
- Currency codes follow ISO 4217 standard

## 📞 Support

For issues or questions:
1. Check the Swagger documentation: `http://localhost:5000/swagger`
2. Review browser console for frontend errors
3. Check .NET logs for backend errors
4. Verify database connectivity

## 📄 License

This project is provided as-is for educational and development purposes.

---

**Last Updated:** March 14, 2026
**Version:** 1.0.0
