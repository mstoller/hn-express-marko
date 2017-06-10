'use strict';
var request = require('request');
// http://node-hnapi.herokuapp.com/news?page=1
var list = {
	url: 'http://node-hnapi.herokuapp.com',
	getList: function(listType, page = 1) { 
		const url = `${this.url}/${listType}?page=${page}`;
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

module.exports = list;