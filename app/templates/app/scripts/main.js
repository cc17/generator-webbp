(function(){
    require.config({
        baseUrl:"scripts/",
        skipDataMain: true,
        paths: {
            'angular': '../vendor/angular/angular',
            // 'highcharts' : '../vendor/highcharts/highcharts',
            "ui.router":'../vendor/angular-ui-router/release/angular-ui-router.min',
            'bindonce':  '../vendor/angular-bindonce/bindonce',
            "ui.bootstrap":"../vendor/bootstrap/dist/js/bootstrap.min",
            "jQuery":'../vendor/jquery/jquery.min',
            'app-tpl': './app-tpl',
            'highcharts':'../vendor/highcharts/highcharts'
        },
        shim: {
            'jQuery': { exports: 'jQuery'},
            'angular': {
                exports:'angular',
                deps: ['jQuery']
            },
            'app-tpl': { deps: ['angular']},
            'app-tpl': { deps: ['angular']},
            'bindonce': { deps: ['angular']},
            'highcharts': {deps: ['jQuery']},
            'ui.router': {deps: ['angular']}
        }
    });
})();
