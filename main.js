const {crawlPage} = require('./crawl.js');

async function main() {
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("too many arguments");
    process.exit(1);
  }
  const baseURL = process.argv[2];

  console.log(`start crawiling of ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {})
  for (const page of Object.entries(pages)) {  // Object.entries allows us to iterate over objects
    console.log(page);
  }
}

main();
