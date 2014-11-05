/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons','../controllers/homeController'],
  function (stateModule, cons) {
    stateModule.config(
        ['$stateProvider', '$urlRouterProvider',
          function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                .otherwise('/');

            $stateProvider
                .state("home", {
                  url: "/",
                  controller: 'homeController',
                  templateUrl: cons.VIEW_PATH + 'home.html'
                })
                .state("view1", {
                  url: "/view1",
                  controller: 'view1Controller',
                  templateUrl: cons.VIEW_PATH + 'view1.html'
                });
          }])
  })