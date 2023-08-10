const { JSDOM } = require("jsdom");

//the normalize function takes in any url given and strips it from any extra spaces, capitalizations, '/', etc. for later comparisons
//First it strips it from hostname (HTTP ro HTTPS)
//Then it strips the '/' at the end of a path (since it's unnecessary)
function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  } else return hostPath;
}

//This function returns the links of all anchor tags inside an HTML page in an array or URLs
function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];

  //The JSDOM package takes the HTML page as a string and converts it into an actual DOM for us to process
  const dom = new JSDOM(htmlBody);
  const allElements = dom.window.document.querySelectorAll("a");
  for (const element of allElements) {
    if (element.href.slice(0, 1) === "/") {
      //relative
      try {
        const urlObj = new URL(`${baseURL}${element.href}`);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      //absolute
      try {
        const urlObj = new URL(element.href);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  return urls;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
