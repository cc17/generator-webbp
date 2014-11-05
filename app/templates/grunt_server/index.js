var express = require('express');
var app = express();
var path = require('path');
var cwd = process.cwd();
var router = express.Router();
var logger = require('morgan');
var fs = require('fs');

//TODO:mock data
function mock(req,res,next){
  fs.readFile(path.join(process.cwd() + '/tests') + req.url.split('?')[0], function(err,data){
    if(err != null){
      res.send(err.toString())
    }else{
      res.send(data.toString())
    }
  });
};

function appServer(currentFolder){
  app.use('/',express.static(path.join(cwd,currentFolder)));
  app.use('/vendor',express.static(path.join(cwd,currentFolder + '/vendor')));
  app.use('/scripts',express.static(path.join(cwd,currentFolder + '/scripts')));
  app.use('/styles',express.static(path.join(cwd,currentFolder + '/styles')));

  app.use(logger());

  //以上为静态资源目录，除了以上路径，其他都默认为mock数据
  app.get('**/*.json',express.static(path.join(cwd,'/tests')));
  //处理post
  app.all('**/*.json',mock);

  return app;
};
module.exports = appServer;