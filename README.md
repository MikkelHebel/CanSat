# CanSat

This is a school project where we tried to build a small satellite, the code in this project is a connection between the connection from our satellite and our webserver. Our webserver is used to display data we have stored in a database.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/MikkelHebel/CanSat.git # or clone your own fork
$ cd CanSat.git
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku main
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
