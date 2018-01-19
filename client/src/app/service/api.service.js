var request = require('superagent');
var apiserverUrl = 'http://api.movies.wittybox.xyz';

var apiService = {
  get: function(url) {
    return new Promise((resolve, reject) => {
      request
        .get(apiserverUrl + url, function(err, response, body) {
          if (err) {
            reject(err);
          } else {
            resolve(response.body);
          }
        })
    })
  },
  post: function(url, data) {
    return new Promise((resolve, reject) => {
      request
        .post(apiserverUrl + url, data, function(err, response, body) {
          if (err) {
            reject(err);
          } else {
            resolve(response.body);
          }
        })
    })
  }
}
export default apiService
