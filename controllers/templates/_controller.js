// This is a file copied by your subgenerator
define([
  './controllers'
  <% for(var i=0;i<sub.length;i++){ %>
    <% if(i <= sub.length -1){%>,<%}%>'./<%= rootController %>/<%= sub[i] %>Controller'
  <% } %>
], function (mod) {
  mod.controller('<%= rootController %>Controller', controllerFn);
  
  controllerFn.$injector = ['$scope', '$injector'];
  function controllerFn($scope, $injector){

  };
});
