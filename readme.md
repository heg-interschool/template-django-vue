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
see [allauth.headless](https://docs.allauth.org/en/dev/headless/api.html).

### Includes

* Django
* Django REST framework
* Django CORS Headers
* Django Whitenoise
* login via django-allauth headless
* Vue 3 Vite
* Vue Router
* Gunicorn


### Template Structure


| Location             |  Content                                   |
|----------------------|--------------------------------------------|
| `/backend`           | Django Project & Backend Config            |
| `/backend/api`       | Django App (`/api`)                        |
| `/src`               | Vue App .                                  |
| `/src/main.js`       | JS Application Entry Point                 |
| `/index.html` | [Html Application Entry Point](https://cli.vuejs.org/guide/html-and-static-assets.html) (`/`)         |
| `/public/static`     | Static Assets                              |
| `/dist/`             | Bundled Assets Output (generated at `npm run build`) |

## Prerequisites

Before getting started you should have the following installed and running:

- [X] Node - [instructions](https://nodejs.org/en/)
- [X] Vue 3 - [instructions](https://vuejs.org/)
- [X] Vite - [instructions](https://vitejs.dev/)
- [X] Python 3 - [instructions](https://wiki.python.org/moin/BeginnersGuide)

## Setup Template

```
$ git clone https://github.com/heg-interschool/template-django-vue.git
$ cd template-django-vue
```

Setup frontend
```
$ npm install
```
Setup backend
```
$ python -m venv venv
# On windows
$ .\venv\Scripts\Activate.ps1
# On linux
$ source venv/bin/activate
# Both
$ pip install -r requirements.txt
$ python manage.py migrate
$ python manage.py createsuperuser --email admin@example.com --username admin
```

## Running Development Servers

Frontend

```
$ npm run dev
```
From another tab in the same directory:

Backend

```
$ python manage.py runserver
```


The Vue application will be served from [`localhost:5173`](http://localhost:5173/) and the Django API
and static files will be served from [`localhost:8000`](http://localhost:8000/).

The dual dev server setup allows you to take advantage of
vite's development server with hot module replacement.

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

## urls
http://localhost:5173/#/ for vue frontend
http://localhost:8000/api/ for django rest framework api
http://localhost:8000/api/admin/ for django admin



## Deploy

For production you need to change **baseURL** in `src/services/api.js` 

### Production deployment
env variables to configure
```
DATABASE_URL
DJANGO_DEBUG
DJANGO_SECRET_KEY
DJANGO_ALLOWED_HOSTS
DJANGO_SETTINGS_MODULE=backend.settings.prod
```

## Static Assets

See [`vite.config.js`](/vite.config.js) for notes on static assets strategy.

This template implements the approach suggested by Whitenoise Django.
For more details see [WhiteNoise Documentation](http://whitenoise.evans.io/en/stable/django.html)

It uses Django Whitenoise to serve all static files and Vue bundled files at `/static/`.
