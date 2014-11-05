define([
  'angular',
  'app'
],function(angular){
  angular.element(document).ready(function(){
    angular.bootstrap(document, ['<%= project_name%>App']);
  });
});