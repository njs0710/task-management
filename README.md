# Task-Management Application

A simple Task-Management Web Application built using Spring Boot, Angular, PostgreSQL, and Maven.

![Task-Management Application](https://github.com/njs0710/task-management/blob/main/image.png?raw=true)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Task-Management Application is a web-based tool designed to help you manage tasks efficiently. It allows you to create, modify, and delete tasks, and stores them in a PostgreSQL database. The backend is built using Spring Boot, and the frontend is implemented with Angular.

## Features

- Create new tasks with a name, priority, and status.
- Edit task details such as name and completion status.
- Delete tasks when they're no longer needed.
- View tasks in a user-friendly interface.

## Getting Started

### Prerequisites

To run the application, you'll need the following software installed on your system:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/njs0710/task-management.git

2. Navigate to the project directory.
   
    ```bash
   cd task-management

4. Build the Spring Boot backend and Angular frontend in Docker and Run the Container

   ```bash
    docker compose up

## Usage

Angular Frontend: \task-management\frontend\app

Spring Boot Backend (Maven): \task-management\backend 

Access the web application in your browser at `http://localhost:4200`.

## Technologies Used

- Spring Boot
- Angular
- PostgreSQL
- Maven
- Docker

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to open a pull request.

## License

This project is licensed under the MIT License.


