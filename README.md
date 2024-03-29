# Catalog App

## Prerequisites
- [npm@6.9.0](https://www.npmjs.com/)

## Set up environments

Clone the project:
```sh
git clone https://github.com/JustNam/CatalogApp
```

Install necessary packages:
```sh
cd /CatalogApp
npm install
```

Edit configuration files for different environments:
- Production: `src/configurations/prod.js`
- Development: `src/configurations/dev.js`
- Local: `src/configurations/local.js`

Choose the environment to execute in file `.env`: 
```
REACT_APP_ENV='dev'
```
- Production: `prod`
- Development: `dev`
- Local: `local`
## Available Scripts

In the project directory, you can run:

```sh
npm run start
```

Runs the app in the chosen mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Run tests on the whole project:

```sh
npm test -- --watchAll=false --coverage
```
