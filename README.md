### WB Backend Test

Solution to interview test.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js (Preferably the latest stable version)
- npm (Comes with Node.js)
- MySQL Database
- Redis

### Setting up MySQL Database

Before you can run the application, you need to set up a MySQL database:

1. **Install MySQL Server**: Ensure that MySQL Server is installed on your local machine or use a cloud-based instance.
2. **Create a Database**: Create a new database for the project using the MySQL command line or a GUI tool like MySQL Workbench.

   ```sql
   CREATE DATABASE your_database_name
   ```

### Setting up Redis

Setting up Redis for session management and caching:

1. **Install Redis**: Download and install Redis from the official site or use a package manager.
   - For Windows: Download the latest Redis .msi installer from the Redis website.
   - For macOS/Linux: Typically, you can install Redis using Homebrew or apt-get:

```bash
brew install redis  # macOS sudo apt-get install redis-server # Ubuntu Linux
```

2. **Run Redis Server**: Start the Redis server using the default configuration:

```bash
   redis-server
```

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1.  **Clone the Repository**

```bash
    git clone https://github.com/oluwasemilorebadejo/wb-backend-test.git
    cd wb-backend-test

```

2. **Install Dependencies**

   Navigate to your project directory and run:

```bash
   npm install
```

3. **Environment Configuration**

   Rename the `.env.example` file to `.env` and update it with your database credentials, application key, and any other environment specific settings.

```plaintext
PORT=3333
HOST=localhost
NODE_ENV=development
APP_KEY=MqNXODauI3taIOJC5sf76ioyrLCH06Vi
DB_HOST=[YourDatabaseHost]
DB_PORT=3306
DB_USER=[YourDatabaseUser]
DB_PASSWORD=[YourDatabasePassword]
DB_DATABASE=[YourDatabaseName]
SESSION_DRIVER=cookie
REDIS_HOST=[YourRedisHost]
REDIS_PORT=6379
REDIS_PASSWORD=
```

4. **Database Migrations**

   Run the following command to execute database migrations:

```bash
node ace migration:run
```

This will set up your database tables according to the migration files located in your project.

### Starting the Server

To start the server, run:

```bash
npm run start
```

Or, for development with hot-reloading:

```bash
npm run dev
```

This will start the server on `localhost:3333` (or whatever PORT you've defined in `.env`).

## Built With

- AdonisJS - The web framework used
- MySQL - Database
- Redis - Session Management/Caching
