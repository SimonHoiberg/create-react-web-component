const fs = require('fs');

const version = process.argv[2];

if (!version) {
  console.log('Provide a version number');
  return;
}

const rootPackage = require('../package.json');
const jsPackage = require('../templates/js/package.json');
const tsPackage = require('../templates/ts/package.json');

rootPackage.version = version;
jsPackage.dependencies['create-react-web-component'] = version;
tsPackage.dependencies['create-react-web-component'] = version;

fs.writeFileSync('package.json', JSON.stringify(rootPackage, null, 2), 'utf-8');
fs.writeFileSync('templates/js/package.json', JSON.stringify(jsPackage, null, 2), 'utf-8');
fs.writeFileSync('templates/ts/package.json', JSON.stringify(tsPackage, null, 2), 'utf-8');
