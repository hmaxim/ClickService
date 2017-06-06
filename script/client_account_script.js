var clientApp = angular.module('clientApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

clientApp.controller('clientInfoCtrl', function ($scope, $http, $location) {
    var token = localStorage.getItem("userToken");
    $scope.edit = true;
    var config = {
        url: 'https://hair-salon-personal.herokuapp.com/client/info',
        method: 'GET',
        headers: {
            contentType: 'application/json; charset=utf-8',
            Authorization: token
        }
    };
    $http(config).then(function success(response) {
        $scope.myData = response;
        console.log(response);
    }, function error(response) {
        $scope.status = response.status + " : " + response.statusText;
    });

    $scope.logout = function () {
        localStorage.clear();
        location.href = "index.html";
    };
////////////////////////
    $scope.updateClient = function () {
        var updateClient = {
            clientName: $scope.myData.data.clientName,
            clientLastName: $scope.myData.data.clientLastName,
            clientPhoneNumber: $scope.myData.data.clientPhoneNumber
        };

        var configUpdate = {
            url: 'https://hair-salon-personal.herokuapp.com/client/update',
            method: 'PUT',
            headers: {
                contentType: 'application/json; charset=utf-8',
                Authorization: token
            },
            data: JSON.stringify(updateClient),
            dataType: 'json'
        };
        $http(configUpdate).then(function success(response) {
            alert(response);
        }, function error(response) {
            $scope.status = response.status + " : " + response.statusText;
        });
        $scope.edit = true;
    };
    $scope.editClientInfo = function () {
        $scope.edit = false;
    }
});



clientApp.controller('AccordionDemoCtrl', function ($scope) {
    $scope.oneAtATime = false;
});

clientApp.controller('masterInfoCtrl', function ($scope) {
    var arrayMasters;
    $scope.markerInfo;
    $scope.markerInfo = JSON.parse(localStorage.markerInfo);
    console.log($scope.markerInfo);
});


