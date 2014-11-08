# generator-webbp [![Build Status](https://secure.travis-ci.org/cc17/generator-webbp.png?branch=master)](https://travis-ci.org/cc17/generator-webbp)

> [Yeoman](http://yeoman.io) generator


## Getting Started

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-webbp from npm, run:

```bash
npm install -g generator-webbp
```

Finally, initiate the generator:

##生成器部分介绍：

### 基本命令
```bash
yo webbp
```

### 子命令

* 单步生成controller

```js
yo webbp:controllers detail.about.contact
```
亮点：可以嵌套，此命令会生成如下文件
```bash
|controllers
   |detail
      |about.js
      |contact.js
    detail.js
```
另外detail.js中会自动加载about.js及contact.js

* 单步生成views

```js
yo webbp:views detail.about.contact
```
亮点：可以嵌套，此命令会生成如下文件
```bash
|views
   |detail
      |about.html
      |contact.html
    detail.html
```
* 单步生成routes

```js
yo webbp:routess detail.about.contact
```
亮点：可以嵌套，此命令会生成如下文件
```bash
|states
  |detail.js
```
其内容是：
```js
define(['./states', '../cons/simpleCons'],
    function (stateModule, simpleCons) {
      stateModule.config(
          ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
              $stateProvider.state("detail", {
                abstract: true,
                resolve: {
                  instanceBasicPromise: [ '$stateParams', function( $stateParams){

                  }]
                },
                url: "/detail",
                controller: 'detailController',
                templateUrl: simpleCons.VIEW_PATH + 'detail.html'
              })
              
                .state("detail.about", {
                  url: "/about",
                  views: {
                    detail: {
                      templateUrl: simpleCons.VIEW_PATH + 'detail/about.html',
                      controller: 'detail.aboutController'
                    }
                  }
                })  
              
            }
          ]);
    })
```
亮点：通过运行此命令，会自动生成 routes(用的是ui-router，目录是states目录)，view，controller。有没有觉得很爽的感觉。


## mock数据部分

根据yo命令生成项目之后，npm install安装node模块，之后grunt 。 即可自动在浏览器打开项目页面（因为模板中默认是用sass，compass编译css，如果出现错误，请自行检车是否能正确编译scss）

1.mock数据放在tests目录下，可以自行建立目录及 json文件。
2.在项目 app/scripts/services 中可以用 http服务调用 tests目录下的json文件， 可支持get及post请求


## css编译部分

css采用的是 scss，compass编译。可支持嵌套及变量写法，还可以支持多浏览器的前缀自动编译，具体参看compass文档。


## License

MIT