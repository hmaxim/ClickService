var app = angular.module('clientApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('authorizeCtrl', function ($scope, $http) {
    $scope.authorize = function () {
        var config = {
            method: 'POST',
            url: 'https://hair-salon-personal.herokuapp.com/login/login',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                email: $scope.login,
                password: $scope.password
            }),
            dataType: 'json'
        };
        $http(config).then(function success(response) {
            localStorage.setItem("userToken", response.data.token);
            console.log(response);
            location.href = "client_account.html"
        }, function error(response) {
            console.log(response);
        });
    }
});

app.controller('registerCtrl', function ($scope, $http) {
    $scope.currencyVal;

    var confirmedPassword;
    if ($scope.clientPassword === $scope.clientConfirmPassword) {
        confirmedPassword = $scope.clientConfirmPassword;
        $scope.passwordMsg = true;
    }else{
        $scope.passwordMsg = true;
    }
    var clientInfo = {
        clientName: $scope.clientName,
        clientPhoneNumber: $scope.clientPhoneNumber,
        clientEmail: $scope.clientEmail,
        clientPassword: confirmedPassword
    };
    var config = {
        method: 'POST',
        url: 'https://hair-salon-personal.herokuapp.com/register/client',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(clientInfo),
        dataType: 'json'
    };

    $scope.registrate = function () {
        $http(config).then(function success(response) {
            localStorage.setItem("userToken", response.data.token);
            console.log(response);
            location.href = "client_account.html"
        }, function error(response) {
            // alert(response);
        });
    }
});

app.directive('phoneInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }

    };
});

app.filter('tel', function () {
    return function (tel) {
        console.log(tel);
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if(number){
            if(number.length>3){
                number = number.slice(0, 3) + number.slice(3,7);
            }
            else{
                number = number;
            }

            return (city + "-" + number).trim();
        }
        else{
            return city;
        }

    };
});



app.controller('modalCtrl', function ($scope, $http) {
    var config = {
        method: 'GET',
        url: 'https://hair-salon-personal.herokuapp.com/guest/list',
        contentType: "application/json; charset=utf-8"
    };
    $http(config).then(function success(response) {
        $scope.myData = response;
    }, function error(response) {
        // $scope.status=response.status+" : "+response.statusText;
    });
});


app.controller('mapCtrl', function ($scope, $http) {

    var config = {
        method: 'GET',
        url: 'https://hair-salon-personal.herokuapp.com/guest/list',
        contentType: "application/json; charset=utf-8"
    };
    $http(config).then(function success(response) {
        $scope.mastersArray = response.data.masters;
        console.log($scope.mastersArray);
    }, function error(response) {
        $scope.status = response.status + " : " + response.statusText;
    });

    navigator.geolocation.watchPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var latlng = new google.maps.LatLng(latitude, longitude);
        var settings = {
            zoom: 15,
            center: latlng,
            disableDefaultUI: true,
            navigationControl: true,
            zoomControl: true,
            streetViewControl: true,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("map_canvas"),
            settings);

        var marker_current_position = new google.maps.Marker({
            position: latlng,
            map: $scope.map,
            title: 'YOU ARE HERE'
        });

        var addressSearch = document.getElementById("addressSearch");
        $scope.map.controls[google.maps.ControlPosition.TOP_CENTER].push(addressSearch);

        var autocomplete = new google.maps.places.Autocomplete(addressSearch);
        autocomplete.bindTo('bounds', $scope.map);

        var searchMarker = new google.maps.Marker({
            map: $scope.map,
            anchorPoint: new google.maps.Point(0, -29)
        });

        autocomplete.addListener('place_changed', function () {
            searchMarker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                $scope.map.fitBounds(place.geometry.viewport);
            } else {
                $scope.map.setCenter(place.geometry.location);
                $scope.map.setZoom(17);  // Why 17? Because it looks good.
            }

            searchMarker.setIcon(/** @type {google.maps.Icon} */({
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));

            searchMarker.setPosition(place.geometry.location);
            searchMarker.setVisible(true);

            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }
        });

        $scope.markers = [];
        function createMarker(info) {
            var addressesLatLng = {lat: info.latitude, lng: info.longitude};
            var marker = new google.maps.Marker({
                position: addressesLatLng,
                icon: "images/master_marker.png",
                id: info.email,
                map: $scope.map
            });
            var services = [];
            angular.forEach(info.serivce, function (serviceObj) {
                services.push(serviceObj.service);
            });
            var infoWindow = new google.maps.InfoWindow({
                content: '<div class="inf">' + info.masterType + '<h4>' + info.name + '&nbsp' + info.lastName + '</h4>' + '<span class="info-window-map">Phone: </span>' + info.phoneNumber +
                '<br>' + '<span>Address: </span>' + info.addresses + '<br>' + '<span>Services: </span>' + services + '<br>' +
                '<button id="map_btn" class="btn"><a href="master_info_appointment.html">MORE INFORMATION</a></button>' + '</div>'
            });
            marker.addListener('click', function () {
                infoWindow.open($scope.map, marker);
                if (marker.id === info.email) {
                    localStorage.markerInfo = JSON.stringify(info);
                }
            });
            $scope.map.addListener('click', function () {
                infoWindow.close();
            });
            $scope.markers.push(marker);
        }

        angular.forEach($scope.mastersArray, function (obj) {
            createMarker(obj);
        });

        function hideMarkers() {
            angular.forEach($scope.markers, function (obj) {
                obj.setMap(null);
            });
        }

        function deleteMarkers() {
            angular.forEach($scope.markers, function (obj) {
                obj.setMap(null);
                $scope.markers = [];
            });
        }

        $scope.mastersLanguages = [{
            checked: false,
            value: 'РУССКИЙ'
        }, {
            checked: false,
            value: 'ИВРИТ'
        }, {
            checked: false,
            value: 'АНГЛИЙСКИЙ'
        }, {
            checked: false,
            value: 'АРАБСКИЙ'
        }];

        $scope.mastersServices = [{
            checked: false,
            value: null
        }, {
            checked: false,
            value: 'УКЛАДКА'
        }, {
            checked: false,
            value: 'МАНИКЮР'
        }, {
            checked: false,
            value: 'hello'
        }];

        $scope.masters = [];
        console.log($scope.masters)
        $scope.masters2 = [];

        $scope.submitLanguages = function () {
            deleteMarkers();
            //search
            angular.forEach($scope.mastersLanguages, function (mastersLanguage) {
                if (mastersLanguage.checked === true) {
                    angular.forEach($scope.mastersArray, function (obj) {
                        angular.forEach(obj.lang, function (lang) {
                            if (mastersLanguage.value === lang) {
                                $scope.masters.push(obj);
                                createMarker(obj);
                            }
                        });
                    });
                }
            });
        };

        $scope.submitServices = function () {
            deleteMarkers();
            angular.forEach($scope.mastersServices, function (mastersService) {
                if (mastersService.checked === true) {
                    if ($scope.masters.length !== 0) {
                        angular.forEach($scope.masters, function (obj) {
                            angular.forEach(obj.serivce, function (service) {
                                if (mastersService.value === service.service) {
                                    $scope.masters2.push(obj);
                                    createMarker(obj);
                                }
                            });
                        });
                    }
                    if ($scope.masters.length === 0) {
                        angular.forEach($scope.mastersArray, function (obj) {
                            angular.forEach(obj.serivce, function (service) {
                                if (mastersService.value === service.service) {
                                    $scope.masters2.push(obj);
                                    createMarker(obj);
                                }
                            });
                        });
                    }
                }
            });
        };

        $scope.submitMasterTypes = function () {
            deleteMarkers();
            if ($scope.masters2.length !== 0 || $scope.masters.length !== 0) {
                angular.forEach($scope.masters2, function (obj) {
                    if ($scope.masterType === obj.masterType) {
                        createMarker(obj);
                    }
                });
            }
            if ($scope.masters2.length === 0 || $scope.masters.length === 0) {
                angular.forEach($scope.mastersArray, function (obj) {
                    if ($scope.masterType === obj.masterType) {
                        createMarker(obj);
                    }
                    if ($scope.masterType === 'all') {
                        createMarker(obj);
                    }
                });
            }
        }
    });
});


app.controller('clientInfoCtrl', function ($scope, $http, $location) {
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


app.controller('accordionCtrl', function ($scope) {
    $scope.oneAtATime = false;
});

app.controller('masterInfoCtrl', function ($scope) {
    $scope.markerInfo = JSON.parse(localStorage.markerInfo);
    console.log($scope.markerInfo);
});

app.controller('navbarCtrl', function ($scope) {

    if (localStorage.getItem('userToken')) {
        $scope.navbar = true;
    } else {
        $scope.navbar = false;
    }

    $scope.logout = function () {
        localStorage.clear();
        location.href = "index.html";
    };
});
