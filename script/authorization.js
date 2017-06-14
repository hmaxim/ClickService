var app = angular.module('clientApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .filter('numberFixedLen', function () {
        return function (n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) {
                return n;
            }
            num = ''+num;
            while (num.length < len) {
                num = '0'+num;
            }
            return num;
        };
    });

app.controller('accordionCtrl', function ($scope) {
    $scope.oneAtATime = false;
});

app.controller('navbarCtrl', function ($scope) {

    if (localStorage.getItem('userToken')) {
        $scope.navbar = true;
    } else {
        $scope.navbar = false;
    }

    $scope.logout = function () {
        localStorage.removeItem('userToken');
        location.href = "index.html";
    };
});

app.controller('logoutCtrl', function ($scope) {
    $scope.logout = function () {
        localStorage.clear();
        location.href = "index.html";
    };
});



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
            console.log(response);
            if (response.data.user === false) {
                localStorage.setItem("userToken", response.data.token);
                location.href = "client_account.html"
            } else {
                localStorage.setItem("masterToken", response.data.token);
                location.href = "private_master.html"
            }

        }, function error(response) {
            console.log(response);
        });
    }
});

app.controller('registerCtrl', function ($scope, $http) {
    $scope.currencyVal;

    $scope.registrate = function () {
        var confirmedPassword;
        if ($scope.clientPassword === $scope.clientConfirmPassword) {
            confirmedPassword = $scope.clientConfirmPassword;
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
        console.log(clientInfo);
        $http(config).then(function success(response) {
            localStorage.setItem("userToken", response.data.token);
            console.log(response);
            location.href = "client_account.html"
        }, function error(response) {
            console.log(response);
        });
    }
});

app.directive('phoneInput', function ($filter, $browser) {
    return {
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModelCtrl) {
            var listener = function () {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function (viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0, 10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function () {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function (event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function () {
                $browser.defer(listener);
            });
        }

    };
});

app.filter('tel', function () {
    return function (tel) {
        if (!tel) {
            return '';
        }

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

        if (number) {
            if (number.length > 3) {
                number = number.slice(0, 3) + number.slice(3, 7);
            }
            else {
                number = number;
            }

            return (city + "-" + number).trim();
        }
        else {
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
        // console.log($scope.mastersArray);
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
                console.log(312);
                var addressesLatLng = {lat: info.latitude, lng: info.longitude};
                var marker = new google.maps.Marker({
                    position: addressesLatLng,
                    icon: "images/master_marker.png",
                    id: info.email,
                    map: $scope.map
                });
                var services = [];
                angular.forEach(info.serivce, function (serviceObj) {
                    services.push(serviceObj.name);
                });
                var infoWindow = new google.maps.InfoWindow({
                    content: '<div class="inf">' + '<h4>' + info.name + '&nbsp' + info.lastName + '</h4>'+ info.masterType + '<br>' + '<span class="info-window-map">Phone: </span>' + info.phoneNumber +
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

            $scope.addMarkers = function () {
                angular.forEach($scope.mastersArray, function (obj) {
                    createMarker(obj);
                });
            };

            $scope.addMarkers();


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
                value: 'russian'
            }, {
                checked: false,
                value: 'hebrew'
            }, {
                checked: false,
                value: 'english'
            }];


            $scope.mastersServices = [{
                checked: false,
                value: null
            }, {
                checked: false,
                value: 'Haircut'
            }, {
                checked: false,
                value: 'Manicure'
            }, {
                checked: false,
                value: 'hello'
            }];

            $scope.masters = [];
            // console.log($scope.masters);
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
    }, function error(response) {
        $scope.status = response.status + " : " + response.statusText;
    });
});

app.controller('getRecordsCtrl', function ($scope, $http, $location) {
    var token = localStorage.getItem("userToken");
    $scope.edit = true;
    var config = {
        url: 'https://hair-salon-personal.herokuapp.com/client/records',
        method: 'GET',
        headers: {
            contentType: 'application/json; charset=utf-8',
            Authorization: token
        }
    };
    $http(config).then(function success(response) {
        $scope.getRecords = response.data;
        if($scope.getRecords.length !== 0){
            $scope.hideOrders = true;
        }else{
            $scope.hideOrders = false;
        }
    }, function error(response) {
        $scope.status = response.status + " : " + response.statusText;
    });
});

app.controller('clientInfoCtrl', function ($scope, $http) {
    $scope.token = localStorage.getItem("userToken");
    $scope.edit = true;

    var configGet = {
        method: 'GET',
        url: 'https://hair-salon-personal.herokuapp.com/client/favorites_masters',
        headers: {
            contentType: 'application/json; charset=utf-8',
            Authorization:  $scope.token
        }
    };
    $http(configGet).then(function success(response) {
        $scope.favoriteMasters = response.data;
        if($scope.favoriteMasters.length !== 0){
            $scope.hideFavorites = true;
        }else{
            $scope.hideFavorites = false;
        }
        console.log($scope.favoriteMasters);
    }, function error(response) {
        // $scope.status=response.status+" : "+response.statusText;
    });

    $scope.showFavoriteMaster = function (favorite) {
        localStorage.setItem('markerInfo',JSON.stringify(favorite));
        location.href = 'master_info_appointment.html';
    };

    var config = {
        url: 'https://hair-salon-personal.herokuapp.com/client/info',
        method: 'GET',
        headers: {
            contentType: 'application/json; charset=utf-8',
            Authorization:  $scope.token
        }
    };
    $http(config).then(function success(response) {
        $scope.myData = response.data;
       // console.log($scope.myData);
    }, function error(response) {
        $scope.status = response.status + " : " + response.statusText;
    });


////////////////////////
    $scope.updateClient = function () {
        var updateClient = {
            clientName: $scope.myData.clientName,
            clientLastName: $scope.myData.clientLastName,
            clientPhoneNumber: $scope.myData.clientPhoneNumber
        };

        var configUpdate = {
            url: 'https://hair-salon-personal.herokuapp.com/client/update',
            method: 'PUT',
            headers: {
                contentType: 'application/json; charset=utf-8',
                Authorization:  $scope.token
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

app.controller('masterInfoCtrl', function ($scope, $http) {
    $scope.markerInfo = JSON.parse(localStorage.markerInfo);
    $scope.id = $scope.markerInfo.email;
    $scope.freeTimesArray = [];
    $scope.arr = [];

    //console.log($scope.markerInfo);
   // console.log($scope.arr);

    var today = new Date();
    var tomorrow = new Date();
    $scope.arr2 = [];
    $scope.arr2.push(Date.now(today));

    for (var i = 0; i < 7; i++) {
        $scope.arr2.push(tomorrow.setDate(tomorrow.getDate() + 1));
    }

    //console.log($scope.arr2);

    $scope.pickedDay = today.getDate();
    $scope.pickedMonth = today.getMonth();
    $scope.pickedYear = today.getFullYear();


    $scope.check = function (n) {
        $scope.pickedServices = [];
        $scope.duration = 0;
        // console.log(n);
        // console.log($scope.markerInfo.serivce[n]);
        // $('input:checked')[n].val();


        // console.log( $scope.pickedServices);

        for (var i = 0; i < $scope.arr.length; i++) {
            if ($scope.arr[i]) {
                $scope.duration += $scope.markerInfo.serivce[i].duration;
                //$scope.serv = $scope.markerInfo.serivce[i].name;
                $scope.pickedServices.push($scope.markerInfo.serivce[i]);
            }
        }
        // console.log($scope.duration);
        //
        //console.log($scope.arr[n]);
        // console.log($scope.arr);
        console.log($scope.pickedServices);
        $scope.create();
    };


    $scope.pickedDate = new Date($scope.arr2[0]);

    console.log($scope.pickedDate);
    $scope.checkRadio = function (n) {
        $scope.pickedDate = $scope.arr2[n];
        $scope.newPickedDate = new Date($scope.pickedDate);
        $scope.pickedDay = $scope.newPickedDate.getDate();
        $scope.pickedMonth = $scope.newPickedDate.getMonth() + 1;
        $scope.pickedYear = $scope.newPickedDate.getFullYear();
        $scope.create();
    };

    $scope.create = function () {
        $scope.getfreeTime = {
            duration: $scope.duration,
            email: $scope.id,
            myCalendar: {
                yearLight: $scope.pickedYear,
                monthLight: $scope.pickedMonth,
                dayLight: $scope.pickedDay
            }
        };
        console.log($scope.getfreeTime);
       // console.log(typeof $scope.getfreeTime.myCalendar.yearLight);
       // console.log($scope.getfreeTime);
        var config = {
            method: 'POST',
            url: 'https://hair-salon-personal.herokuapp.com/client/free_time',
            data: $scope.getfreeTime,
            dataType: 'json',
            headers: {
                Authorization: localStorage.getItem('userToken'),
                contentType: 'application/json; charset=utf-8'
            }
        };
        $http(config).then(function success(response) {
            $scope.freeTimesArray = [];
            angular.forEach(response.data, function (obj) {
                if (obj.minuteLight == 0) {
                    obj.minuteLight = (obj.minuteLight + "0").slice(-2);
                }
                $scope.freeTimesArray.push(obj);
            });
            console.log(response);
            //  console.log($scope.freeTimesArray);
        }, function error(response) {
            console.log(response);
        });
    };


    $scope.checkTime = function (n) {
        $scope.pickedTime = $scope.freeTimesArray[n];
        console.log($scope.pickedTime.hourLight);
    };

    $scope.addAppointment = function () {
        $scope.userToken = localStorage.getItem('userToken');
        $scope.pickedTimeInt = {
            hourLight: parseInt($scope.pickedTime.hourLight),
            minuteLight: parseInt($scope.pickedTime.minuteLight)
        };

        $scope.record = {
            calendar: {
                yearLight: $scope.pickedYear,
                monthLight: $scope.pickedMonth,
                dayLight: $scope.pickedDay
            },
            starTime: $scope.pickedTimeInt,
            services: $scope.pickedServices,
            client: 'max@max.ru',
            master: $scope.id,
            info: null
        };
        console.log($scope.record);
        var sendRecord = {
            url: 'https://hair-salon-personal.herokuapp.com/client/add_record',
            method: 'PUT',
            headers: {
                contentType: 'application/json; charset=utf-8',
                Authorization:  $scope.userToken
            },
            data: $scope.record,
            dataType: 'json'
        };
        $http(sendRecord).then(function success(response) {
            console.log(response);
           // location.href = "client_account.html"
        }, function error(response) {
            $scope.status = response.status + " : " + response.statusText;
        });
    };
});

app.controller('favoriteMasterCtrl', function ($scope, $http) {
    $scope.userToken = localStorage.getItem('userToken');
    $scope.markerInfo = JSON.parse(localStorage.markerInfo);
    $scope.masterEmail = $scope.markerInfo.email;
    $scope.favoriteFlag = localStorage.getItem('favoriteFlag');
    $scope.showHide = false;

    var configGet = {
        method: 'GET',
        url: 'https://hair-salon-personal.herokuapp.com/client/favorites_masters',
        headers: {
            contentType: 'application/json; charset=utf-8',
            Authorization: $scope.userToken
        }
    };
    $http(configGet).then(function success(response) {
        $scope.favoriteMasters = response.data;
        console.log($scope.favoriteMasters);
    }, function error(response) {
        // $scope.status=response.status+" : "+response.statusText;
    });

    $scope.isAs = function () {
        angular.forEach($scope.favoriteMasters,function (obj) {
            if(obj.email === $scope.markerInfo.email){
                $scope.showHide = true;
            }
        });
        if($scope.showHide === true){
            return false;
        }else{
            return true;
        }
    };

    $scope.addFavoriteMaster = function () {
        var config = {
            url: 'https://hair-salon-personal.herokuapp.com/client/add_favorites_masters',
            method: 'PUT',
            headers: {
                contentType: 'application/json; charset=utf-8',
                Authorization:  $scope.userToken
            },
            data:  $scope.masterEmail,
            dataType: 'json'
        };
        $http(config).then(function success(response) {
            console.log(response);
        }, function error(response) {
            $scope.status = response.status + " : " + response.statusText;
        });
        $scope.notAdded = true;
        $scope.added = true;
    };

    $scope.delFavoriteMaster = function () {
        var config = {
            url: 'https://hair-salon-personal.herokuapp.com/client/remove_favorites_masters ',
            method: 'POST',
            headers: {
                contentType: 'application/json; charset=utf-8',
                Authorization:  $scope.userToken
            },
            data: $scope.masterEmail,
            dataType: 'json'
        };
        $http(config).then(function success(response) {
            console.log(response);
        }, function error(response) {
            $scope.status = response.status + " : " + response.statusText;
        });
        $scope.added = false;
        $scope.notAdded = false;

    };
});


