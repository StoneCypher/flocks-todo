/** @jsx React.DOM */
/* jshint node: true */

'use strict';

var React  = require('react'),
    Flocks = require('flocks.js');

var TempData = {

    lastChecked: undefined,
    todoList: [
      { item: 'get milk' },
      { item: 'homework',    priority: 5, due: new Date().now() + 3*24*60*60*1000 },
      { item: 'fix server',  priority: 9 },
      { item: 'check alarm', priority: 3 },
      { item: 'read Candide' },
      { item: 'get coffee',  priority: 8, due: new Date().now() + 4*60*60*1000 }
    ]

};

/* app shell
   ---------

   flocks
   layout
   md render
   task list
   heirarchy



   outside the control
   -------------------

   comm stack
   business logic
   

*/

module.exports = React.createClass({

    render: function() {
        return <div>Hello, world</div>;
    }

});