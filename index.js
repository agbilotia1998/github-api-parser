const axios = require("axios")
const csvtojson = require("csvtojson")
const fs = require("fs");
const json2csv = require("json2csv")

let inputFilePath = "./input.csv"
let outputFilePath = "./output.csv"

let parseInput = async(filePath) => {
     const data = await csvtojson().fromFile(filePath);

     return(data);
};

let getEmailDetailsFromName = (name, data) => {
     let email = "";
     let emailFound = false;

     for(const eventDetail of data) {
          if("payload" in eventDetail && "commits" in eventDetail.payload) {
               for (const commit of eventDetail.payload.commits) {
                    if (name === commit.author.name) {
                         email = commit.author.email
                         emailFound = true;
                         break;
                    }
               }
          }

          if(emailFound) break
     }

     return(email)
}

let persistDataInCSV = (data, outputFilePath) => {
     const fields = ['api address', 'name', 'email'];
     const opts = {fields};

     const parser = new json2csv.Parser(opts);
     const csvData = parser.parse(data);

     fs.appendFileSync(outputFilePath, csvData);
}

let main = async() => {
     fs.exists(outputFilePath, function(exists) {
          if(exists) {
               fs.unlinkSync(outputFilePath)
          }
     });

     const jsonData = await parseInput(inputFilePath)

     console.log("Fetching Data from GitHub API")
     for(let entry of jsonData) {
          let apiData = await axios.get(entry["api address"], {
               headers: {
                    Authorization: `Bearer GH_TOKEN`,
                    "Content-Type": "application/json"
               }
          })

          const email = getEmailDetailsFromName(entry["name"], apiData.data);

          entry.email = email
     }

     persistDataInCSV(jsonData, outputFilePath)
}

main().then(() => {
     console.log("Persisted output data containing additional metadata")
})