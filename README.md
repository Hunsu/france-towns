This is a [Next.js](https://nextjs.org/) app that allow searching for French towns. You can search by name or postal
code.

## Getting Started

First create twos files `.env.developement` and `.env.production` which contains environment variables to connect to the
database.

```
POSTGRES_PASSWORD=mysecretpassword
POSTGRES_DB=towns
DB_NAME=towns
DB_PASSWORD=mysecretpassword
DB_USER=postgres
DB_HOST=localhost
DB_PORT=5432
```

Then start the database service:

````bash
docker-compose build db
docker-compose start db
````

And finally start the app

```bash
yarn build-db # populate the database, may take some time the first time
yarn dev
```

The app will be available at [http:localhost:3000]()

## Production

There is a docker-compose that will allow to start the app with the required services (database). First you should create file named `.env.production` that will
contains:

```
POSTGRES_PASSWORD=mysecretpassword
POSTGRES_DB=towns
DB_NAME=towns
DB_PASSWORD=mysecretpassword
DB_USER=postgres
DB_PORT=5432
```

Note that you could change the values of those environment variables.
To start the app run

```bash
docker-compose build
docker-compose up -d
```

The app will be available at [http:localhost:3000]()


# Improvements
This is a list of things that could be improved

- Speedup the populating of the database. We could use bulk insert instead of inserting one town at time. pg-promise allow to do that
- Add responsive design
- Add unit tests