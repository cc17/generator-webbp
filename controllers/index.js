'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var WebbpGenerator = yeoman.generators.NamedBase.extend({
  initializing: function () {
    this.log('You called the webbp subgenerator with the argument ' + this.name + '.');
  },

  writing: function () {
    this.sub = [];
    var temp = this.name.split('.');
    var rootController = this.rootController = temp[0];
    var sub = temp.length > 0 && temp.slice(1);


    
    if(sub && sub.length){
      this.sub = sub;
      sub.forEach(function(item){
        this.subControllerName = item;
        this.template('_subController.js','app/scripts/controllers/' + rootController + '/' + item + 'Controller.js');
      }.bind(this));
    }
    this.template('_controller.js','app/scripts/controllers/' + rootController + 'Controller.js');
  }
});

module.exports = WebbpGenerator;
