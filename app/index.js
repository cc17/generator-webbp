'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var WebbpGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');


    this.on('end', function () {
      if(this.installDeps == true) {
        this.installDependencies();
      }

      console.log('install dep ready...')
    });

  },
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the breathtaking Webbp generator!'
    ));

    var prompts = [
      {
        name:'project_name',
        message:"enter the name of your project",
        default:'webapp'
      },
      {
        type: 'confirm',
        name:'installDeps',
        message:"Would you like to install the node.js dependencies, it maybe a little slow to do that?",
        default:false
      }
    ];

    this.prompt(prompts,function(answers){
      this.project_name = answers.project_name;
      done();
    }.bind(this) );

  },
  createAppDirector:function(){
    var dir = [
      'app',
      'app/scripts',
      'app/scripts/cons',
      'app/scripts/controllers',
      'app/scripts/directives',
      'app/scripts/filters',
      'app/scripts/partials',
      'app/scripts/services',
      'app/scripts/states',
      'app/scripts/utils',
      'app/scripts/views',
      'app/vendor',
      'app/styles',
      'app/styles/images'
    ];
    dir.forEach(function(item){
      this.mkdir(this.project_name + '/' + item);
    }.bind(this));
  },
  copyServerAndConfig:function(){
    var dir = [
      'grunt_server',
      'app',
      'tests'
    ];
    dir.forEach(function(item){
      this.directory(item,this.project_name + '/' + item);
    }.bind(this));
  },
  copyFile:function(){
    this.copy('jshintrc',this.project_name + '/' + '.jshintrc');
    this.copy('gitignore',this.project_name + '/' + '.gitignore');
    this.copy('bowerrc',this.project_name + '/' + '.bowerrc');
    this.template('_bower.json',this.project_name + '/bower.json')
    this.template('./app/scripts/_build.js',this.project_name + '/app/scripts/' + this.project_name + 'ForBuild.js');
  },
  gruntfile:function(){
    this.copy('gruntSetting.json',this.project_name + '/gruntSetting.json');
    this.template('_Gruntfile.js',this.project_name + '/Gruntfile.js');
  },
  packageJSON:function(){
    this.template('_package.json',this.project_name + '/package.json');
  }
});

module.exports = WebbpGenerator;
