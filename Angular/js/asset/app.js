var myApp = angular.module('starter', ['ngRoute', 'ngToast', 'ngMap'])

myApp.config(function ($routeProvider) {

    var promiseGetServer = ['Canchas', function(Canchas){
        return Canchas.getDataFromServer();
    }];

    $routeProvider
        .when('/', {
        templateUrl: 'templates/datos.html',
        controller: 'geoCtrl',
        resolve: [promiseGetServer]
    })
        .otherwise({
        redirectTo: '/'
    });
})


myApp.factory('Canchas', function($http){

    var Canchas = {};
    Canchas.list = [];


    Canchas.getDataFromServer = function getDataFromServer(){

        var lat = -34.614901;
        var lng = -58.421647;
        var dist = 1;


        if(!_.isEmpty(Canchas.list)) return;

        return $http.get('http://localhost:6318/api/canchas/getCahchas/'+ lat +'/'+ lng +'/'+dist).then(requestSuccessful, requestUnsuccessful);

        function requestSuccessful(response){
            if(_.isEmpty(response.data)) throw new Error();

            Canchas.list = response.data;
        }

        function requestUnsuccessful(){
            throw new Error();
        }
    };
    return Canchas;
});


myApp.controller('geoCtrl', function($scope, Canchas, ngToast, NgMap){

    var reglasFiltro = {};

    $scope.detalle = Canchas.list;

    $scope.reglasFiltro = function(){

        //PISOS
        reglasFiltro['pisoCemento'] = $scope.pisoC === true;
        reglasFiltro['pisoParquet'] = $scope.pisoP === true;
        reglasFiltro['pisoBaldosa'] = $scope.pisoB === true;
        reglasFiltro['pisoTierra'] = $scope.pisoT === true;
        reglasFiltro['pisoCespedS'] = $scope.pisoCS === true;
        reglasFiltro['pisoCespedN'] = $scope.pisoCN === true;

        if($scope.pisoC==false || $scope.pisoC==undefined){delete reglasFiltro.pisoCemento;}
        if($scope.pisoP==false || $scope.pisoP==undefined){delete reglasFiltro.pisoParquet;}
        if($scope.pisoB==false || $scope.pisoB==undefined){delete reglasFiltro.pisoBaldosa;}
        if($scope.pisoT==false || $scope.pisoT==undefined){delete reglasFiltro.pisoTierra;}
        if($scope.pisoCS==false || $scope.pisoCS==undefined){delete reglasFiltro.pisoCespedS;}
        if($scope.pisoCN==false || $scope.pisoCN==undefined){delete reglasFiltro.pisoCespedN;}

        //JUGADORES
        reglasFiltro['jugadores5'] = $scope.j5 === true;
        reglasFiltro['jugadores6'] = $scope.j6 === true;
        reglasFiltro['jugadores7'] = $scope.j7 === true;
        reglasFiltro['jugadores8'] = $scope.j8 === true;
        reglasFiltro['jugadores9'] = $scope.j9 === true;
        reglasFiltro['jugadores11'] = $scope.j11 === true;

        if($scope.j5==false || $scope.j5==undefined){delete reglasFiltro.jugadores5;}
        if($scope.j6==false || $scope.j6==undefined){delete reglasFiltro.jugadores6;}
        if($scope.j7==false || $scope.j7==undefined){delete reglasFiltro.jugadores7;}
        if($scope.j8==false || $scope.j8==undefined){delete reglasFiltro.jugadores8;}
        if($scope.j9==false || $scope.j9==undefined){delete reglasFiltro.jugadores9;}
        if($scope.j11==false || $scope.j11==undefined){delete reglasFiltro.jugadores11;}

        //CANCAHAS
        reglasFiltro['canchaAbierta'] = $scope.canchaA === true;
        reglasFiltro['canchaAbiertaLuz'] = $scope.canchaAL === true;
        reglasFiltro['canchaTechada'] = $scope.canchaT === true;

        if($scope.canchaA==false || $scope.canchaA==undefined){delete reglasFiltro.canchaAbierta;}
        if($scope.canchaAL==false || $scope.canchaAL==undefined){delete reglasFiltro.canchaAbiertaLuz;}
        if($scope.canchaT==false || $scope.canchaT==undefined){delete reglasFiltro.canchaTechada;}

        var detalles = _.filter(Canchas.list, reglasFiltro);

        if(_.isEmpty(detalles)){
            ngToast.create({
                className: 'warning',
                content: '<b>No se han encontrado items</b>'});
        }
        //[{"latitude":56.94742425328988,"longitude":-105.16961585240858,"title":"m0","id":0}
        console.clear();
        _.forEach(detalles, function(value) {
            console.log(value.latitude+","+value.longitude);
        });

        $scope.detalle = detalles;

        NgMap.getMap().then(function(map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });

    }
});