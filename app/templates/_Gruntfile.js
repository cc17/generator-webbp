/**
 * 自动化脚本定义
 */
module.exports = function (grunt) {
  'use strict';

   var cfg = {
    livereload:35729,
    serverPort:3001,
    serverHost:'0.0.0.0'
   };

    //load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.initConfig({
      cfg:cfg,
      pkg:grunt.file.readJSON('package.json'),
      connect: {
        options: {
          port: cfg.serverPort,
          hostname: cfg.serverHost,
          base:'.'
        },
        dev: {
          options: {
            middleware: function (connect) {
              return [
                require('connect-livereload')({port: cfg.livereload}),
                require('./grunt_server')('.tmp')
              ];
            }
          }
        },
        dist: {
          options: {
            middleware: function (connect) {
              //globalSetting.activeFolder = globalSetting.buildFolder;
              return [
                require('./grunt_server')('build')
              ];
            }
          }
        }
      },
      copy: {
        debug: {
          files: [
            {
              expand: true,
              cwd: 'app',
              src: ['**/*.{css,js,png,jpg,gif,jpeg,html,svg,eot,ttf,woff,json,htm}'],
              dest: '.tmp'
            }
          ]
        },
        dist: {
          files: [
            {
              expand: true,
              cwd: 'app',
              src: ['**/*.{css,js,png,jpg,gif,jpeg,html,svg,eot,ttf,woff,json,htm}'],
              dest: 'build'
            }
          ]
        }
      },
      html2js: {
        options: {
          htmlmin: {
            collapseWhitespace: true
          },
          useStrict: true,
          module: 'app.tpl',
          rename: function (moduleName) {
            console.log(moduleName,'moduleName');
            var newName = moduleName.replace('../', '');
            return newName;
          }
        },
        compileTpl: {
          src: [
            'app/scripts/partials/**/*.html',
            'app/scripts/views/**/*.html'
          ],
          dest: 'app/scripts/app-tpl.js'
        }
      },

      watch: {
        options: {
          livereload: true
        },
        message: {
          files: ['app/scripts/drds/nls/src/*.js'],
          tasks: ['message']
        },
        scripts: {
          files: ['app/scripts/**/*.{js,css,png,jpg,jpeg,webp,gif,map}',
            'app/style/**/*.{css,png,jpg,jpeg,webp,gif,map,woff,ttf,svg}'],
          tasks: ['copy:debug']
        },
        compass: {
          files: ['app/**/*.{scss,sass}'],
          tasks: ['compass:dev']
        },
        // jade: {
        //   files: ['app/**/*.jade'],
        //   tasks: ['jade:debug']
        // },
        html: {
          files: ['app/**/*.html'],
          tasks: ['copy:debug']
        },
        // coffee: {
        //   files: ['app/scripts/{,*/}*.coffee'],
        //   tasks: ['coffee:debug']
        // },
        html2js: {
          files: [ 'app/scripts/*/views/**/*.html',
            'app/scripts/*/partials/**/*.html'],
          tasks: ['html2js:compileTpl']
        }
      },
      compass: {                  // Task
        dist: {                   // Target
          options: {              // Target options
            sassDir: 'app/styles/',
            cssDir: 'build/',
            environment: 'production'
          }
        },
        dev: {                    // Another target
          options: {
            sassDir: 'app/',
            cssDir: '.tmp/'
          }
        }
      },
      requirejs: {
        options: {
          //optimize: 'none'
        },
        debug:{
          options: {
            optimize:'none',
            baseUrl: "app/scripts",
            mainConfigFile: "app/scripts/main.js",
            name: "bootstrap", // assumes a production build using almond
            out: ".tmp/scripts/main.min.js"
          }
        },
        dist:{
          options: {
            baseUrl: "app/scripts",
            mainConfigFile: "app/scripts/main.js",
            name: "bootstrap", // assumes a production build using almond
            out: "build/scripts/main.min.js"
          }
        }
      },
      open:{
        dev:{
          url:'http://localhost:' + cfg.serverPort
        }
      }
    });
    grunt.registerTask('default',[
      'connect:dev',
      'html2js:compileTpl',
      'copy:debug',
      'compass:dev',
      //'requirejs:debug',
      'open:dev',
      'watch'
    ]);
    grunt.registerTask('build',[
      'html2js:compileTpl',
      'compass:dev',
      'copy:dist',
      'requirejs:dist',
      'connect:dist:keepalive'
    ]);

};