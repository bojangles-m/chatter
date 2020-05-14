# Using Docker + MERN + WebPack to Improve Full Stack Application Dev Environment

## Overiview

This repo provides a simple way to get a development environment up and running. To do so it is used only docker composer to setup, install and run the app.

## Prerequisites:

You must have Docker Installed in your System !!!

## How to run the App?

First run docker compose builder in Client & Server subfolders to get images and to install all dependencies.

```
docker-compose -f docker-compose.client.builder.yml run --rm install
docker-compose -f docker-compose.server.builder.yml run --rm install
```

After that run main docker compose file and explore the app.

```
docker-compose up
```

### Bonus

Everything can also be run and installed with Makefile which makes the commands easier to remember and use.

To not causes problems if you are moving between local and docker dev environment we can use an “external volume” instead for node modules. To take care of that we have script in MakeFile wich can be run with:

```
make setup
```

To install dependencies for the app you can run:

```
make install
```

To run the app just use the command:

```
make dev
```

## To view the App in browser Open the link:

http://192.168.99.100:9000
