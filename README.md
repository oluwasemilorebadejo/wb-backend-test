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

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1.  **Clone the Repository**

        ```bash

    git clone [your-repository-url]
    cd [repository-name]

````

2. **Install Dependencies**

   Navigate to your project directory and run:

    ```bash
   npm install
````

3. **Environment Configuration**

   Rename the `.env.example` file to `.env` and update it with your database credentials, application key, and any other environment specific settings.

```plaintext
PORT=3333
HOST=localhost
NODE_ENV=development
APP_KEY=[YourAppKey]
DB_HOST=[YourDatabaseHost]
DB_PORT=3306 DB_USER=[YourDatabaseUser]
DB_PASSWORD=[YourDatabasePassword]
DB_DATABASE=[YourDatabaseName]
SESSION_DRIVER=cookie
REDIS_HOST=[YourRedisHost]
REDIS_PORT=6379 REDIS_PASSWORD=
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

## Deployment

Add additional notes about how to deploy this on a live system.

## Built With

- AdonisJS - The web framework used
- MySQL - Database
- Redis - Session Management/Caching

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **Oluwasemilore** - _Initial work_ - [YourUsername](https://github.com/oluwasemilorebadejo)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://chat.openai.com/c/LICENSE.md) file for details.
