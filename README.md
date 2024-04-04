# Heliverse Assignment

It is an Full stack application made using ReactJS with Vite and Tailwindcss for UI, also its backend is made in NodeJS, ExpressJS. It uses Mongoose for connecting with MongoDB Cluster.

# Installation

Let's first setup our server
The current directory in the terminal should be /heliverse-assignment, then change into the server directory by

```bash
cd server
```

Install server dependencies

```bash
npm install
```

setup your .env file in the server directory
for example the file should look like this

```bash
MONGO_DB_URL = '<MongoDB URL>'
PORT='<port number>'
```

after that start your server by executing this command in the server directory

```bash
npm dev
```

Let's setup our client i.e. our WebApp
change into the client directory by

```bash
cd client
```

Install client dependencies

```bash
npm install
```

setup your .env file in the client directory and in this you just have to change the port in which your server is running

```bash
VITE_API='http://localhost:<port>/api'
```

after all this setup is done then we are ready to start our webapp

```bash
npm run dev
```

The webapp will start to run on your local system on this url - http://localhost:5173/