### Dropbox Events Scraper

* Install

    * [Docker]([Get Docker | Docker Documentation](https://docs.docker.com/get-docker/))

* Steps
    - Build Docker Image
        - `docker build -t parser .`

    - Run Application
        - `docker run --name parser_container parser`

    - Export Out File
        - `docker cp parser_container:/github-api-parser/output.csv ./output.csv`
