const fs = require("fs");
const axios = require("axios");

async function main() {
  if (process.argv.length > 2) {
    const asaData = fs.readFileSync(process.argv[2]);
    const asaJsonData = JSON.parse(asaData);
    
    const appData = fs.readFileSync(process.argv[3]);
    const appJsonData = JSON.parse(appData);

    const found = {};
    const notFound = {};

    for (const [appKey, appValue] of Object.entries(appJsonData)) {
      const appName = appValue[0].toLowerCase();

      if (found[appName] || notFound[appName]) {
        continue;
      }

      const filename = `server/assets/apps/${appName}.png`;

      for (const [asaKey, asaValue] of Object.entries(asaJsonData)) {
        if (appName == asaValue.name.toLowerCase()) {
          try {
            const options = {
              method: "get",
              url: `https://asa-list.tinyman.org/assets/${asaKey}/icon.png`,
              responseType: "arraybuffer",
            };
            await axios(options).then((res) =>
              fs.writeFileSync(filename, res.data)
            );
            found[appName] = appValue;
            break;
          } catch (error) {
            console.log("ERROR", error);
            continue;
          }
        }
      }

      if (!found[appName] && !fs.existsSync(filename)) {
        notFound[appName] = appKey;
        console.log("Not found: ", appName);
      }
    }
  }
}

main().then(() => process.exit(0));
