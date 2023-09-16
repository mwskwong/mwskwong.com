const { cpSync } = require('fs');

cpSync('node_modules/shiki/languages', 'shiki/languages', {
  recursive: true,
  force: true,
});
cpSync('node_modules/shiki/themes', 'shiki/themes', {
  recursive: true,
  force: true,
});
