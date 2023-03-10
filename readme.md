# Django Vue Template ✌️ 🐍

![Vue Logo](/src/assets/logo-vue.png "Vue Logo")
![Django Logo](/src/assets/logo-django.png "Django Logo")

This template is a minimal example for an application using Vue and Django.

Vue and Django are clearly separated in this project. Vue, npm and Webpack handles all frontend logic and bundling assessments. Django and Django REST framework to manage Data Models, Web API and serve static files.

While it's possible to add endpoints to serve django-rendered html responses, the intention is to use Django primarily for the backend, and have view rendering and routing and handled by Vue + Vue Router as a Single Page Application (SPA).

Out of the box, Django will serve the application entry point (`index.html` + bundled assets) at `/` ,
data at `/api/`, and static files at `/static/`. Django admin panel is also available at `/api/admin/` and can be extended as needed.

The application templates from Vue CLI `create` and Django `createproject` are kept as close as possible to their
original state, except where a different configuration is needed for better integration of the two frameworks.

### Authentication
Sample register, login, logout function are implemented in the client.
More endpoints options are available in the backend,
see [dj-rest-auth](https://dj-rest-auth.readthedocs.io/en/latest/api_endpoints.html).

### Demo

[Live Demo](https://django-vue-template-demo.herokuapp.com/)

### Includes

* Django
* Django REST framework
* Django CORS Headers
* Django Whitenoise
* login via JWT using dj-rest-auth
* Vue 3 Vite
* Vue Router
* Gunicorn
* Configuration for Heroku Deployment


### Template Structure


| Location             |  Content                                   |
|----------------------|--------------------------------------------|
| `/backend`           | Django Project & Backend Config            |
| `/backend/api`       | Django App (`/api`)                        |
| `/src`               | Vue App .                                  |
| `/src/main.js`       | JS Application Entry Point                 |
| `/public/index.html` | [Html Application Entry Point](https://cli.vuejs.org/guide/html-and-static-assets.html) (`/`)         |
| `/public/static`     | Static Assets                              |
| `/dist/`             | Bundled Assets Output (generated at `yarn build`) |

## Prerequisites

Before getting started you should have the following installed and running:

- [X] Node - [instructions](https://nodejs.org/en/)
- [X] Vue 3 - [instructions](https://vuejs.org/)
- [X] Vite - [instructions](https://vitejs.dev/)
- [X] Python 3 - [instructions](https://wiki.python.org/moin/BeginnersGuide)
- [X] Pipenv - [instructions](https://pipenv.readthedocs.io/en/latest/install/#installing-pipenv)

## Setup Template

```
$ git clone https://github.com/gtalarico/django-vue-template
$ cd django-vue-template
```

Setup
```
$ npm install
$ pipenv install --dev && pipenv shell
$ python manage.py migrate
$ python manage.py createsuperuser --email admin@example.com --username admin
```

## Running Development Servers

```
$ python manage.py runserver
```

From another tab in the same directory:

```
$ npm run dev
```

The Vue application will be served from [`localhost:5173`](http://localhost:5173/) and the Django API
and static files will be served from [`localhost:8000`](http://localhost:8000/).

The dual dev server setup allows you to take advantage of
webpack's development server with hot module replacement.

This requires cors to be configured correctly in Django.

```
CORS_ALLOWED_ORIGINS = [
    "https://example.com",
    "https://sub.example.com",
    "http://localhost:8080",
    "http://127.0.0.1:9000",
]
```

If you would rather run a single dev server, you can run Django's
development server only on `:8000`, and you have to build the Vue app first
and the page will not reload on changes.

```
$ npm run build
$ python manage.py runserver
```

## Deploy

For produciton you need to change api.js baseURL

### Heroku Server

with heroku cli

```
$ heroku apps:create django-vue-template-demo
$ heroku git:remote --app django-vue-template-demo
$ heroku buildpacks:add --index 1 heroku/nodejs
$ heroku buildpacks:add --index 2 heroku/python
$ heroku addons:create heroku-postgresql:hobby-dev
$ heroku config:set ALLOWED_HOSTS=<YOUR_UNIQUE_URL> on heroku
$ heroku config:set DJANGO_SETTINGS_MODULE=backend.settings.prod
$ heroku config:set DJANGO_SECRET_KEY='...(your django SECRET_KEY value)...'

$ git push heroku
```

env variables
```
DATABASE_URL
DJANGO_DEBUG
DJANGO_SECRET_KEY
DJANGO_ALLOWED_HOSTS
DJANGO_SETTINGS_MODULE=backend.settings.prod
```

Other heroku commands

```
heroku ps:scale web=1
heroku logs --tail
heroku run bash
```

Heroku's nodejs buildpack will handle install for all the dependencies from the [`package.json`](/package.json) file.
It will then trigger the `postinstall` command which calls `yarn build`.
This will create the bundled `dist` folder which will be served by whitenoise.

The python buildpack will detect the [`Pipfile`](/Pipfile) and install all the python dependencies.

The [`Procfile`](/Procfile) will run Django migrations and then launch Django'S app using gunicorn, as recommended by heroku.


## Static Assets

See [`vite.config.js`](/vite.config.js) for notes on static assets strategy.

This template implements the approach suggested by Whitenoise Django.
For more details see [WhiteNoise Documentation](http://whitenoise.evans.io/en/stable/django.html)

It uses Django Whitenoise to serve all static files and Vue bundled files at `/static/`.
