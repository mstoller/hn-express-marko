'use strict';
var request = require('request');

var item = {
	url: 'http://node-hnapi.herokuapp.com',
	getItem: function(itemType, item) { 
		const url = `${this.url}/${itemType}/${item}`;
		return new Promise((resolve, reject) => { 
			request.get({
			    url: url,
			    json: true,
			    headers: {'User-Agent': 'request'}
			  }, (err, res, data) => {
			    if (err) {
			      reject(err);
			    } else if (res.statusCode !== 200) {
			      resolve(res);
			    } else {
			      resolve(data);
			    }
			});
		})
	}
}

module.exports = item;
