# Secure Digital Banking Platform with Transaction Management System

A secure full-stack digital banking application developed using **Spring
Boot** and **React**. The platform provides core banking operations such
as customer registration, authentication, account management, deposits,
withdrawals, fund transfers, transaction history, payments, and loan
management through a user-friendly web interface.

## 📌 Project Overview

The **Secure Digital Banking Platform with Transaction Management
System** is designed to provide customers with a convenient and secure
way to manage their banking activities digitally.

The application follows a client-server architecture:

-   **Frontend:** React.js
-   **Backend:** Spring Boot REST APIs
-   **Database:** MySQL
-   **Security:** Spring Security and JWT
-   **Build Tool:** Maven
-   **API Testing:** Postman

## ✨ Key Features

### 👤 Customer Management

-   Customer registration
-   Customer login and authentication
-   Secure password encryption
-   JWT-based authentication
-   Customer profile management

### 🏦 Account Management

-   Account creation and management
-   Account details
-   Account balance
-   Deposit money
-   Withdraw money
-   Fund transfer between accounts
-   Balance validation

### 💳 Transaction Management

-   Deposit transactions
-   Withdrawal transactions
-   Fund transfer transactions
-   Transaction status tracking
-   Transaction history
-   Validation for invalid or insufficient-balance transactions

### 💰 Payment Management

-   Payment processing
-   Payment status management
-   Transaction records for payments

### 🏠 Loan Management

-   Loan application
-   Loan details
-   Loan status
-   Loan-related transaction management

### 🔐 Security

-   Spring Security
-   JWT authentication
-   BCrypt password encryption
-   Protected REST endpoints
-   Role-based access where applicable
-   Global exception handling

## 🛠️ Technologies Used

  Layer               Technologies
  ------------------- --------------------------------
  Frontend            React.js, HTML, CSS, Bootstrap
  Backend             Java, Spring Boot
  Security            Spring Security, JWT
  Database            MySQL
  ORM / Persistence   Spring Data JPA / Hibernate
  API                 REST APIs
  Build Tool          Maven
  Testing             Postman
  IDE                 Eclipse / VS Code

## 🏗️ Project Architecture

``` text
┌───────────────────────────────┐
│        React Frontend         │
│     User Interface / UI       │
└───────────────┬───────────────┘
                │ REST API
                ▼
┌───────────────────────────────┐
│       Spring Boot Backend     │
│ Controllers → Services → DAO  │
│ Security / JWT / Validation   │
└───────────────┬───────────────┘
                │ JPA / Hibernate
                ▼
┌───────────────────────────────┐
│          MySQL Database       │
│ Users / Accounts /            │
│ Transactions / Loans / Payments│
└───────────────────────────────┘
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

Install the following before running the project:

-   Java 17 or above
-   Maven
-   MySQL
-   Node.js and npm
-   Eclipse IDE / VS Code
-   Git

## 🚀 How to Run the Backend

### 1. Clone the repository

``` bash
git clone https://github.com/Rajdeepk9425/Secure-Digital-Banking-Platform-with-Transaction-Management-System.git
cd Secure-Digital-Banking-Platform-with-Transaction-Management-System
```

### 2. Open the backend

Open the `FinCoreBank` folder in Eclipse or another Java IDE.

### 3. Configure MySQL

Create a MySQL database and update the database configuration in:

``` text
FinCoreBank/src/main/resources/application.properties
```

Configure:

``` properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
```

Do not commit real database passwords or JWT secrets to GitHub.

### 4. Run the Spring Boot application

Using Maven:

``` bash
cd FinCoreBank
mvn spring-boot:run
```

Or run the main Spring Boot application class directly from Eclipse.

## 🌐 How to Run the Frontend

Open a new terminal:

``` bash
cd fincore-front
npm install
npm start
```

The React application will normally start at:

``` text
http://localhost:3000
```

Make sure the backend is running and the frontend API configuration
points to the correct backend URL.

## 🔄 Main Application Flow

``` text
Customer
   │
   ▼
Registration / Login
   │
   ▼
JWT Authentication
   │
   ▼
Dashboard
   │
   ├── Account Details
   ├── Deposit
   ├── Withdrawal
   ├── Fund Transfer
   ├── Transaction History
   ├── Payments
   └── Loan Management
```

## 🧪 API Testing

REST APIs can be tested using **Postman**.

Typical operations include:

-   User registration
-   User login
-   Account details
-   Deposit
-   Withdrawal
-   Fund transfer
-   Transaction history
-   Payment operations
-   Loan operations

Authentication-protected APIs require the JWT token obtained after
successful login.

## 🔒 Security Considerations

-   Passwords are stored using BCrypt hashing.
-   JWT is used for authenticated API access.
-   Sensitive endpoints are protected through Spring Security.
-   Input validation and exception handling are implemented.
-   Database credentials and secret keys should be maintained outside
    the public repository in production environments.

## 📈 Future Enhancements

Possible future improvements include:

-   Online bill payment integration
-   Real payment gateway integration
-   Email/SMS transaction notifications
-   Two-factor authentication
-   OTP-based verification
-   Admin analytics dashboard
-   Advanced fraud detection
-   Cloud deployment
-   Docker and Kubernetes deployment
-   Microservices-based scaling
-   Detailed financial reports

## 🎓 Project Purpose

This project was developed as a full-stack banking application to
demonstrate practical implementation of:

-   Java and Spring Boot
-   REST API development
-   React frontend development
-   Database management with MySQL
-   Authentication and authorization
-   Transaction processing
-   Exception handling
-   Full-stack application integration

## 👨‍💻 Author

**Rajdeep Kala**

GitHub: [Rajdeepk9425](https://github.com/Rajdeepk9425)

## 📄 License

This project is developed for educational and project demonstration
purposes.
