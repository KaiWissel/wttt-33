# WTTT-33
Worktime tracking tool for the ABW 33

## Live-Demo

https://wttt-33.netlify.app/

## TODO
[] Add middleware for global request validation error

## 🧞 Commands

All commands are run from the root of the project, from a terminal:
- `npm install`             Installs dependencies                                                     
- `npm run dev`             Starts local dev server at `localhost:8033`                                
- `npm run build`           Build your production site to `./dist/`                                    
- `npm run preview`         Preview your build locally, before deploying                               
- `npm run astro ...`       Run CLI commands like `astro add`, `astro check`                           
- `npm run astro --help`    Get help using the Astro CLI                                               
- `npx prisma generate`     Generates the correct data source client code                              
- `npx prisma migrate dev`  Reads the data sources and data model definition to create a new migration 

## Build and setup WTTT-33 server

- `docker compose build`    Builds the application image                                               
- `docker compose up -d`    Starts the whole application environment    
- `node prisma/seed.mjs`    Seeds the local database with test data                                   