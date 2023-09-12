const { cpSync } = require('fs');

cpSync('node_modules/shiki/languages', 'src/lib/shiki/languages', {
  recursive: true,
  force: true,
});
cpSync('node_modules/shiki/themes', 'src/lib/shiki/themes', {
  recursive: true,
  force: true,
});
