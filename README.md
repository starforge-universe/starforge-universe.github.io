# Angular Webapp Template

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Run this project locally

To create container image, use the following command.

```shell
docker build -t starforge-universe-webapp .
```

To start the container, use the following command.

```shell
docker run -d -p 8000:80 --name starforge-universe-webapp starforge-universe-webapp
```

Alternatively you can use docker-compose as well.

```shell
docker-compose up -d
```

When you are done with local development inspection, you can stop the container.

```shell
docker-compose down
```
