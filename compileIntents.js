const fs = require ("fs");
const path = require ("path");
const chatito = require ("chatito");

const output_dir = ".build"
if (!fs.existsSync(output_dir)) fs.mkdirSync(output_dir);


let chatitoIntents = fs.readdirSync("./intents").filter( filename => {
  const fileExtension = filename.split(".")[1]
  if (fileExtension == "chatito" ) { return true ; }
});

chatitoIntents.forEach(filename => {
  const chatitoGrammar = fs.readFileSync("./intents/" + filename, "utf8");
  const dataset = chatito.datasetFromString(chatitoGrammar, "watson");

  fs.writeFileSync(output_dir + "/" + filename.split(".")[0] + ".json", JSON.stringify(dataset));
})
