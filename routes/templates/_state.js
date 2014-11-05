// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons'],
    function (stateModule, simpleCons) {
      stateModule.config(
          ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
              $stateProvider.state("<%= rootState %>", {
                abstract: true,
                resolve: {
                  instanceBasicPromise: [ '$stateParams', function( $stateParams){

                  }]
                },
                url: "/<%= rootState %>",
                controller: '<%= rootState %>Controller',
                templateUrl: simpleCons.VIEW_PATH + '<%= rootState %>.html'
              })
              <%for(var i=0;i<subStates.length;i++){ %>
                .state("<%= rootState %>.<%= subStates[i] %>", {
                  url: "/<%= subStates[i] %>",
                  views: {
                    <%= rootState %>: {
                      templateUrl: simpleCons.VIEW_PATH + '<%= rootState %>/<%= subStates[i] %>.html',
                      controller: '<%= rootState %>.<%= subStates[i] %>Controller'
                    }
                  }
                })  
              <% } %>
            }
          ]);
    })
