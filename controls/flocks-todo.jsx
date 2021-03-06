/** @jsx React.DOM */
/* jshint node: true */

'use strict';

var React  = require('react'),
    Flocks = require('flocks.js');

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

var todoList = React.createClass({

    render: function() {
        return <div>{this.props.children}<hr/>{JSON.stringify(this.props.data)}</div>;
    }

});

module.exports = React.createClass({

    render: function() {
        return <todoList data={TempData}>Hello, world</todoList>;
    }

});

