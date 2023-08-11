/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const fs = require("fs");

const packages = ["base", "joy", "material"];
for(const package of packages) {
  const packageJsonPath = `node_modules/@mui/${package}/package.json`;
  const packageJsonStr = fs.readFileSync(packageJsonPath);
  const packageJson = JSON.parse(packageJsonStr);
  packageJson.main = "./index.js";
  
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2),
  );
  
}
