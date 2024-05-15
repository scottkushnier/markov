/** Command-line tool to generate Markov text. */

const fs = require("fs");
const axios = require("axios");
const { MarkovMachine } = require("./markov");

function myReadFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function makeTextFromFile(filename) {
  try {
    data = await myReadFile(filename);
  } catch (error) {
    if (error.code == "ENOENT") {
      console.log("Error: file not found: '" + filename + "'");
    } else {
      console.log("Error: unknown error trying to read '" + filename + "'");
    }
    process.exit(1);
  }
  const mym = new MarkovMachine(data);
  const text = mym.makeText(25);
  //   console.log(text);
  return text;
}

async function myReadURL(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch {
    console.log("error finding URL: ", url);
    process.exit(1);
  }
}

async function makeTextFromURL(url) {
  try {
    data = await myReadURL(url);
  } catch (error) {
    console.log("Error: ", error);
    process.exit(1);
  }
  const mym = new MarkovMachine(data);
  const text = mym.makeText(25);
  return text;
}

async function main() {
  if (process.argv[2] == "file") {
    const text = await makeTextFromFile(process.argv[3]);
    console.log("text: '" + text + "'");
  } else if (process.argv[2] == "url") {
    const text = await makeTextFromURL(process.argv[3]);
    console.log("text: '" + text + "'");
  } else {
    console.log("usage: node makeText.js [file | url] <source>");
  }
}

main();
