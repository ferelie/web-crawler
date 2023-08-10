//the normalize function takes in any url given and strips it from any extra spaces, capitalizations, '/', etc. for later comparisons
//First it strips it from hostname (HTTP ro HTTPS)
//Then it strips the '/' at the end of a path (since it's unnecessary)
function normalizeURL(urlString) {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length>0 && hostPath.slice(-1) ==='/') {
        return hostPath.slice(0,-1)
    }
    else return hostPath
}


module.exports = {
  normalizeURL,
};

