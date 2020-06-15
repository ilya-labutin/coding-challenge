# coding-challenge

Problem description is here: https://github.com/morkro/coding-challenge

### How to run

Execute `docker-compose` command:
```bash
docker-compose up --build -d
```

Open your browser and navigate to http://localhost:8181

### Restart with fresh database

By default the database is re-provisioned with every app container restart (convenient for development)

```bash
docker-compose restart app
```