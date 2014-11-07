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

```bash
yo webbp
```

## 子命令

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




## License

MIT
