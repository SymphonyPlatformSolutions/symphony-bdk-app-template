# Template for Bot

This repository contains a basic project to build a bot solution that can be used on Symphony's platform.

---

## Spring-boot application

This project was built on spring-boot. To run this project you need to install all dependencies and then run the
spring-boot
```
mvn install
mvn spring-boot:run
```

To use this Bot application you need to fill some properties on `src/main/resources/application.yaml`
Probably you need to change the name of application and path, it can be done changing the parameters on
```
server: servlet: display-name: 'name here'
server: servlet: context-path: '/path-here'
```

You must inform the certificate to authenticate this bot on Symphony's API.
```
authentication: keystore-file: ${certs.dir}/<your certificate here>.p12
keystore-password: <p12 password>
```
P.S: the certificate must be in the `src/main/resources/cert` folder to be recognized.

All the URLs are pointed to the develop POD, if you want to use a different host, you must change all the URLs on the
application properties file.

This application has a rest service working on localhost:8080/bot/tasks, it's a very simple service just to test the
health of application in this initial step.

The documentation of the REST API endpoints is provided by Swagger and can be seen on localhost:8080/bot/swagger-ui.html