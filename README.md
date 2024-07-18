# Project_Support_App_Frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

# Support App - My first CRUD

A startup has asked us for a web platform so that their employees can request technical support from their IT department in case of need.

## Project Context

Develop a basic MVP so that employees can make their queries and these are recorded in a MySQL database. The software will be an object oriented application.

### Minimum requirements:
Page 1: Welcome view with your login.
Page 2: List of requests
Page 3: Form to request support
Page 4: Editing a request

#### Login:
Users will be preloaded in the database with their username and password (no need to encrypt the password in the database).

#### Content of the request:
Name of the applicant
Date of request
Subject of the request
Description of the request

#### List of applications:
Must be listed in order of creation

#### New appointment:
All form fields are required
Button to reset the fields
Button to cancel creation and return to list view
Button to validate the request

#### Editing a request already registered:
All fields in the form are mandatory
The fields must contain the current information
Button to cancel the edition
Button to send the changes made

The application must be fully responsive.

## Technologies: 
Frontend: Vue, SCSS - Optional: CSS Framework.
Backend: JAVA.
Databases: MySQL

## Repository with the backend:
```sh
https://github.com/PabloA1A/Proyect_Suport_App_Backend
```
### AUTHOR:
```sh
Pablo Abad
```