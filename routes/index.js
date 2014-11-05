'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var util = require('util');


var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log(__dirname);

  this.hookFor('webbp:controllers' );
  this.hookFor('webbp:views' );
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.createViewFiles = function createViewFiles() {
    
    this.subStates = [];
    var temp = this.name.split('.');
    var rootState = this.rootState = temp[0];
    var sub = temp.length > 0 && temp.slice(1);
    //有二级states
    if(sub && sub.length){
      this.subStates = sub;
    }
    //生成state
    this.template('_state.js','app/scripts/states/' + rootState + '.js');
};


