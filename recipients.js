const fs = require('fs');
const csv = require('csvtojson');
const json2csv = require('json2csv');
const sha256 = require('sha256');
const aes256 = require('aes256');
const payload = require('./payload');

let recipients = {};
if (!process.env.CSV) {
  process.exit(1);
}

console.log('Parsing ' + process.env.CSV + '...');
csv()
  .fromFile(process.env.CSV)
  .then(data => {
    for (let i in data) {
      if (!data[i].name || (data[i].name && data[i].name.length < 1)) {
        continue;
      }
      let hash = sha256(data[i].name).toUpperCase();
      if (recipients[hash]) {
        hash = sha256(
          hash
            .split('')
            .reverse()
            .join(''),
        );
      }
      let key = process.env.REACT_APP_SECRET_KEY + hash.substr(0, 16);
      let cipher = aes256.createCipher(key);
      recipients[hash.substr(0, 6)] = {}
      recipients[hash.substr(0, 6)].recipient = cipher.encrypt(data[i].name);
      recipients[hash.substr(0, 6)].payload = cipher.encrypt(JSON.stringify(payload));

      data[i].url = (process.env.BASE_URL ? process.env.BASE_URL : '') + '/?recipient=' + hash.substr(0, 16);
    }
    result = {
      recipients: recipients,
    };
    fs.writeFile(
      __dirname + '/src/recipients.json',
      JSON.stringify(result),
      err => {
        if (err) {
          console.log(err);
          return;
        }
        var csv;
        const fields = ['id', 'name', 'url'];
        const opts = {fields};
        try {
          const parser = new json2csv.Parser(opts);
          csv = parser.parse(data);
        } catch (err) {
          console.error(err);
          return;
        }
        fs.writeFile(__dirname + '/output.csv', csv, err => {
          if (err) {
            console.log(err);
            return;
          }
          console.log('Done.');
        });
      },
    );
  });
