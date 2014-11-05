'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');


var WebbpGenerator = yeoman.generators.NamedBase.extend({
  initializing: function () {

    this.log('You called the aliyun-console subgenerator with the argument ' + this.name + '.');
  },

  writing: function () {
  
    
    this.sub = [];
    var temp = this.name.split('.');
    var rootViewName = this.rootViewName = temp[0];
    var sub = temp.length > 0 && temp.slice(1);
    
    if(sub && sub.length){
      this.sub = sub;
      sub.forEach(function(item){
        this.subViewName = item;
        this.template('_subView.js','app/scripts/views/' + rootViewName + '/' + item + '.html');
      }.bind(this));
    }
    this.template('_view.js','app/scripts/views/' + rootViewName + '.html');
  }
});

module.exports = WebbpGenerator;
