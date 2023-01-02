### Dropbox Events Scraper

* Install

    * [Docker]([Get Docker | Docker Documentation](https://docs.docker.com/get-docker/))

* Steps
    - Replace with your GitHub Access token
        - Create a GitHub Token following this link: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
        - Replace `GH_TOKEN` on line #54 in `index.js` with the token generated from above step. The Authorization header would then look something like `Bearer a1b89xzf`
    - Build Docker Image
        - `docker build -t parser .`

    - Run Application
        - `docker run --name parser_container parser`

    - Export Out File
        - `docker cp parser_container:/github-api-parser/output.csv ./output.csv`
