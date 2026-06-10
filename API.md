# RoboQuote Pro - API Documentation

Welcome to the RoboQuote Pro Backend API documentation. This document describes all available endpoints, their required parameters, authentication policies, and response formats.

## Table of Contents
- [Authentication](#authentication)
- [Base URL](#base-url)
- [Global Response Format](#global-response-format)
- [Endpoints](#endpoints)
  - [Authentication Endpoint Group](#authentication-endpoint-group)
  - [Products Endpoint Group](#products-endpoint-group)
  - [Quotations Endpoint Group](#quotations-endpoint-group)
  - [Company & Settings Endpoint Group](#company--settings-endpoint-group)

---

## Authentication

All protected endpoints require a JWT bearer token passed in the `Authorization` header.
```http
Authorization: Bearer <your-jwt-token>
```

---

## Base URL

- **Local Development**: `http://localhost:5000`
- **Frontend Entry**: `http://localhost:5173`

---

## Global Response Format

### Success Response
Successful requests return standard JSON payload representing the requested resources.

### Error Response
Standard error payloads follow a unified schema handled by the global error middleware:
```json
{
  "message": "Error description or array of validation messages"
}
```

---

## Endpoints

### Authentication Endpoint Group

#### Register User
*   **URL**: `/api/auth/register`
*   **Method**: `POST`
*   **Auth Required**: No
*   **Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "securepassword123"
    }
    ```
*   **Success Response (201 Created)**:
    ```json
    {
      "success": true,
      "token": "jwt-token-string",
      "user": {
        "id": "user-uuid",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
    ```

#### Login User
*   **URL**: `/api/auth/login`
*   **Method**: `POST`
*   **Auth Required**: No
*   **Body**:
    ```json
    {
      "identifier": "john@example.com", 
      "password": "securepassword123"
    }
    ```
    *(Note: `identifier` can be either the user's name or email)*
*   **Success Response (200 OK)**: Same as Register response.

#### Get Current User Profile
*   **URL**: `/api/auth/profile`
*   **Method**: `GET`
*   **Auth Required**: Yes

---

### Products Endpoint Group

#### Get All Active Products
*   **URL**: `/api/products`
*   **Method**: `GET`
*   **Auth Required**: Yes

#### Create Product
*   **URL**: `/api/products`
*   **Method**: `POST`
*   **Auth Required**: Yes
*   **Content-Type**: `multipart/form-data`
*   **Body Fields**:
    - `name` (String, required)
    - `price` (Number, required)
    - `description` (String)
    - `productImage` (File, optional)

#### Get Product By ID
*   **URL**: `/api/products/:id`
*   **Method**: `GET`
*   **Auth Required**: Yes

#### Update Product
*   **URL**: `/api/products/:id`
*   **Method**: `PUT`
*   **Auth Required**: Yes
*   **Content-Type**: `multipart/form-data`

#### Delete Product (Soft Delete)
*   **URL**: `/api/products/:id`
*   **Method**: `DELETE`
*   **Auth Required**: Yes

---

### Quotations Endpoint Group

#### Create Quotation
*   **URL**: `/api/quotations/create`
*   **Method**: `POST`
*   **Auth Required**: Yes
*   **Body**:
    ```json
    {
      "clientName": "Client Corp",
      "clientEmail": "client@example.com",
      "product": {
        "productId": "product-id",
        "qty": 2
      }
    }
    ```

#### Get All Quotations
*   **URL**: `/api/quotations`
*   **Method**: `GET`
*   **Auth Required**: Yes

#### Generate Quotation PDF
*   **URL**: `/api/quotations/:id/generate-pdf`
*   **Method**: `POST`
*   **Auth Required**: Yes
*   **Success Response (200 OK)**:
    ```json
    {
      "message": "PDF generated successfully",
      "pdfUrl": "/uploads/quotation-pdfs/RM-QTN-2026-001.pdf"
    }
    ```

#### Download Quotation PDF File
*   **URL**: `/api/quotations/:id/download`
*   **Method**: `GET`
*   **Auth Required**: Yes

#### Lookup Postal Pincode (India)
*   **URL**: `/api/quotations/pincode/:pincode`
*   **Method**: `GET`
*   **Auth Required**: Yes

---

### Company & Settings Endpoint Group

#### Get Company Profile
*   **URL**: `/api/company`
*   **Method**: `GET`
*   **Auth Required**: Yes

#### Update Company Profile
*   **URL**: `/api/company`
*   **Method**: `PUT`
*   **Auth Required**: Yes
*   **Content-Type**: `multipart/form-data`
*   **Body Fields**: `logo` (File, optional), `companyName` (String), `address` (String), etc.

#### Get/Update Bank Details
*   **URL**: `/api/bank-details`
*   **Method**: `GET` / `PUT`
*   **Auth Required**: Yes

#### Get/Update Terms & Conditions
*   **URL**: `/api/terms`
*   **Method**: `GET` / `PUT`
*   **Auth Required**: Yes

#### Team Members Management
*   **URL**: `/api/team` (GET, POST), `/api/team/:id` (PUT, DELETE)
*   **Method**: `GET` / `POST` / `PUT` / `DELETE`
*   **Auth Required**: Yes
