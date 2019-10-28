<h1 align="center">
<img alt="Meetapp" src="./imgs/meetapp.svg" style="font-size: 128px;" />
<br>
Bootcamp GoStack Meetapp Project
</h1>

---
**:warning:WARNING:warning:**<br>
***Unfortunately it was not tested in ios**, please consider running it using android.*

---

# Backend

## :computer: Run it!

```bash
# enter the folder
cd server

# Install the dependencies
yarn install

# Set up the docker container for the postgres service
docker run --name postgers -e POSTGRES_PASSWORD=<database_password> -p 5432:5432 -d postgres

# Set up the docker container for the redis service
sudo docker run --name redis -p 6379:6379 -d -t redis:alpine

# Copy the .env.example that is in the root of the project, rename it to .env and fill the variables according to your enviroment

# Run migrations to your database
yarn sequelize db:migrate

# Run the backend server
yarn dev
yarn queue

```
# Web

## :computer: Run it

```bash
# enter the folder
cd web

# Install the dependencies
yarn install

# Start the project
yarn start

```
# Mobile

## :iphone: Run it!

```bash
# enter the folder
cd mobile

# Install the dependencies
yarn install

# Start the metro bundler
yarn start

# Install the app
react-native run-android

# Start the app
react-native start or react-native start --reset-cache

```


Made with much :purple_heart: and :muscle: by Jhow Paes :blush: <a href="https://www.linkedin.com/in/jhowpaes/">Talk to me!</a>
