# Starter_Template_Fastapi_Angular_Docker_Compose

This project is a template for a full-stack application using Python (FastAPI) for the backend and Angular for the frontend. It is containerized using Docker and Docker Compose for easy deployment and management.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)


## Running the Application
Use Docker Compose to build and run the containers:

`docker compose up --build
`

or if you are using an older version of Docker Compose:

`docker-compose up --build
`


The Angular frontend will be accessible at: http://localhost:4200

You can access the FastAPI backend at: http://localhost:8000