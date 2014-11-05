define(['./controllers'],function(mod){
  mod
    .controller('homeController',homeControl)
    .controller('view1Controller',view1Control);

  function homeControl($scope,$http){
    $scope.message = 'Hello';
    $http.get('home/home.json').then(function(res){
      console.log(res);
    });

    $http({
      url:'home/postData.json',
      method:'post',
      params:{
        key:'test'
      }
    }).then(function(res){
      console.log(res);
    });

  };
  homeControl.$inject = ['$scope','$http'];

  function view1Control($scope){
    $scope.message = 'view1';
  };
  view1Control.$inject = ['$scope'];

});