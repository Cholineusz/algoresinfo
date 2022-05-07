require("dotenv").config();
require("./src/configs/database");
const Application = require("./src/models/application");
const fs = require("fs");

async function main() {
  if (process.argv.length > 2) {
    const data = fs.readFileSync(process.argv[2]);
    const jsonData = JSON.parse(data);

    for (const [key, value] of Object.entries(jsonData)) {
      let create = async function () {
        return await Application.create({
          _id: key,
          name: value[0],
          description: value[1],
        });
      };

      try {
        await create();
      } catch (error) {
        console.log(error);
      }
    }
  }
}

main().then(() => process.exit(0));
