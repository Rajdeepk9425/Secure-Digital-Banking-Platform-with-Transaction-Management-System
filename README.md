# Secure Digital Banking Platform with Transaction Management System

A full-stack digital banking application developed using **Java, Spring
Boot, Spring Data JPA, Spring Security, MySQL, and React.js**. The
system provides customer/account management and banking operations
including deposits, withdrawals, fund transfers, transaction management,
payments, and loan management.

## 📌 Project Overview

The **Secure Digital Banking Platform with Transaction Management
System** is designed to provide a web-based banking experience where
customers can manage their accounts and perform common banking
operations through a React frontend connected to a Spring Boot REST
backend.

The backend is built with Spring Boot and uses Spring Data JPA with
MySQL for persistence. Spring Security is used for application security.
The Maven configuration confirms Java 17, Spring Boot 3.5.16, Spring
Data JPA, Spring Security, Spring Web, and MySQL Connector/J
dependencies.

## ✨ Main Modules

### 👤 Customer Management

-   Customer registration
-   Customer login
-   Customer account information
-   Customer-related banking operations

### 🏦 Account Management

-   Account details
-   Balance management
-   Deposit
-   Withdrawal
-   Fund transfer

### 💸 Transaction Management

-   Deposit transactions
-   Withdrawal transactions
-   Fund transfer transactions
-   Transaction records/history
-   Transaction status and validation

### 💳 Payment Management

-   Payment operations
-   Payment status management
-   Payment transaction records

### 🏠 Loan Management

-   Customer loan operations
-   Loan application/details
-   Loan status management
-   Customer-loan related operations

### 🔐 Security

-   Spring Security
-   Password encoding
-   Protected application resources
-   Authentication and authorization configuration

> **Note:** The current project documentation intentionally does not
> claim JWT authentication. The backend uses the Spring Security
> implementation present in the project.

## 🛠️ Technology Stack

  Category       Technology
  -------------- -----------------------------
  Frontend       React.js, HTML, CSS
  Backend        Java, Spring Boot
  Security       Spring Security
  Persistence    Spring Data JPA / Hibernate
  Database       MySQL
  API            REST APIs
  Build Tool     Maven
  Java Version   Java 17
  API Testing    Postman
  IDE            Eclipse / VS Code

The backend Maven project uses Java 17 and Spring Boot 3.5.16 and
includes Spring Boot Data JPA, Spring Security, Spring Web, and MySQL
Connector/J. fileciteturn1file0L15-L24 fileciteturn1file0L39-L59

## 🏗️ Application Architecture

``` text
┌──────────────────────────────────────┐
│            React Frontend            │
│              Port 3737               │
│                                      │
│  Login | Account | Transactions     │
│  Payments | Loans | Customer UI     │
└──────────────────┬───────────────────┘
                   │
                   │ REST API
                   ▼
┌──────────────────────────────────────┐
│          Spring Boot Backend         │
│              Port 9797               │
│                                      │
│ Controllers → Services → DAO/Repo   │
│            Spring Security           │
└──────────────────┬───────────────────┘
                   │
                   │ JPA / Hibernate
                   ▼
┌──────────────────────────────────────┐
│              MySQL                   │
│ Customer | Account | Transaction     │
│ Payment | Loan | User Data           │
└──────────────────────────────────────┘
```

## 📂 Repository Structure

``` text
Secure-Digital-Banking-Platform-with-Transaction-Management-System/
│
├── FinCoreBank/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── fincore-front/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── README.md
```

## ⚙️ Prerequisites

Install the following software before running the project:

-   Java 17 or above
-   Maven
-   MySQL
-   Node.js and npm
-   Eclipse IDE / VS Code
-   Git
-   Postman (for API testing)

## 🚀 Backend Setup

### 1. Clone the Repository

``` bash
git clone https://github.com/Rajdeepk9425/Secure-Digital-Banking-Platform-with-Transaction-Management-System.git
cd Secure-Digital-Banking-Platform-with-Transaction-Management-System
```

### 2. Open Backend

Open the `FinCoreBank` folder in Eclipse or another Java IDE.

### 3. Configure MySQL

Create the required MySQL database and configure the database properties
in:

``` text
FinCoreBank/src/main/resources/application.properties
```

Use your local database credentials.

**Do not publish real database passwords, API keys, or other secrets in
a public repository.**

### 4. Start the Backend

From the backend directory:

``` bash
cd FinCoreBank
mvn spring-boot:run
```

Or run the Spring Boot main application class from Eclipse.

### Backend URL

``` text
http://localhost:9797
```

## 🌐 Frontend Setup

Open another terminal:

``` bash
cd fincore-front
npm install
npm start
```

### Frontend URL

``` text
http://localhost:3737
```

Make sure the backend is running on port `9797` before using frontend
features that communicate with the backend.

## 🔄 Application Flow

``` text
Customer
   │
   ▼
Login / Registration
   │
   ▼
Customer Dashboard
   │
   ├── Account Details
   │
   ├── Deposit
   │
   ├── Withdrawal
   │
   ├── Fund Transfer
   │
   ├── Transaction History
   │
   ├── Payments
   │
   └── Loan Management
```

## 🧪 API Testing

The backend REST APIs can be tested using **Postman**.

Typical API areas include:

-   Customer/Login operations
-   Account operations
-   Deposit
-   Withdrawal
-   Fund transfer
-   Transaction operations
-   Payment operations
-   Loan operations

## 🔒 Security Notes

The backend includes Spring Security as a project dependency and
security configuration. fileciteturn1file0L42-L53

For a public GitHub repository:

-   Never commit production database passwords.
-   Never commit private API keys or secrets.
-   Use environment variables or external configuration for sensitive
    values.
-   Use HTTPS when deploying the application.
-   Use a production-grade database configuration before deployment.

## 📈 Future Enhancements

Possible future improvements:

-   OTP-based verification
-   Two-factor authentication
-   Email/SMS transaction notifications
-   Real payment gateway integration
-   Online bill payments
-   Admin analytics dashboard
-   Fraud detection and transaction monitoring
-   Cloud deployment
-   Docker containerization
-   Kubernetes-based deployment
-   Advanced financial reports

## 🎓 Project Objectives

This project demonstrates practical implementation of:

-   Full-stack web application development
-   Java and Spring Boot
-   REST API development
-   React frontend development
-   MySQL database integration
-   JPA/Hibernate persistence
-   Spring Security
-   Banking transaction processing
-   Payment and loan management
-   Exception handling and validation
-   Frontend-backend integration

## 👨‍💻 Author

**Rajdeep Kala**

GitHub:\
https://github.com/Rajdeepk9425

## 📄 License

This project is developed for educational and project demonstration
purposes.
