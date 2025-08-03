# Implementing-Containers-with-Docker
his project containerizes serverless functions into a RESTful API using Node.js, Express, and Azure Cosmos DB. It includes endpoints to create and read documents, deployed via Azure Container Instances to demonstrate skills in API design, containerization, and cloud integration.
# Azure Containerized API with Cosmos DB Integration

## Overview

This project converts previously developed serverless Azure Functions into a **containerized REST API** using **Node.js**, **Express**, **Azure Cosmos DB (MongoDB API)**, and **Azure Container Instances (ACI)**. It demonstrates how to deploy API endpoints inside a container to manage data storage and retrieval from Cosmos DB.

This containerized API replicates and expands on the functionality developed, where serverless functions were used to create and read documents in Cosmos DB.

## Features

- 🧱 **Express.js API**: Built using Node.js and Express to serve HTTP routes.
- 🗃️ **Cosmos DB for MongoDB API**: Used as the primary NoSQL database.
- 📦 **Docker Container**: Application is containerized and deployed to Azure Container Instances.
- ☁️ **Azure Redis Cache** (optional for performance optimizations, re-used).
- 🔌 **API Routes**:
  - `POST /create-document`: Adds a document to Cosmos DB.
  - `GET /read-document`: Fetches a document from Cosmos DB.

## Technologies Used

- Node.js + Express
- Azure Cosmos DB (MongoDB API)
- Docker & Azure Container Instances
- Azure Redis Cache
- MongoDB Node.js Driver
- Azure CLI

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/azure-containerized-cosmosdb-api.git
   cd azure-containerized-cosmosdb-api
