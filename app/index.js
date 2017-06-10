require('../views/comment.marko');
require('../views/error.marko');
require('../views/index.marko');
require('../views/item.marko');
require('../views/shell.marko');
require('../views/user.marko');
require('marko/components').init();

function component () {
  var element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = 'hello webpack!';

  return element;
}

document.body.appendChild(component());
