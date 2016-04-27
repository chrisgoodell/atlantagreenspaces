'use strict';

/* Controllers */


var greenspaceControllers = angular.module('greenspaceControllers', []);

greenspaceControllers.controller('GreenspaceListCtrl', ['$scope', '$http','$state',

  function ($scope, $http,$state) {
    $http.get('greenspaces/greenspaces.json').success(function(data) {

      $scope.greenspaces = data;

      var greenspaces = $scope.greenspaces;
      
      var temp = [];
      for(var i in greenspaces){
        var tags = greenspaces[i].tags;
        for(var k in tags){
          if(temp.indexOf(tags[k])==-1){
            temp.push(tags[k]);
          }
        }
      }
      $scope.tagslist = temp;

      function success(position) {

        var coords = position.coords;

        function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
          var R = 6371; // Radius of the earth in km
          var dLat = deg2rad(lat2-lat1);  // deg2rad below
          var dLon = deg2rad(lon2-lon1); 
          var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c * 0.621371; // Distance in miles
          return d;
        }

        function deg2rad(deg) {
          return deg * (Math.PI/180)
        }

        for(var i in data){
          var distance = getDistanceFromLatLonInKm(coords.latitude,coords.longitude,data[i].lat,data[i].long);
          data[i].distance = (Math.round(distance * 100) / 100);
        }
        
        $scope.greenspaces = data;
        $scope.$apply();

      }
      function error(){
        $scope.greenspaces = data;

        var greenspaces = $scope.greenspaces;
        var temp = [];
        for(var i in greenspaces){
          var tags = greenspaces[i].tags;
          for(var k in tags){
            if(temp.indexOf(tags[k])==-1){
              temp.push(tags[k]);
            }
          }
        }
        $scope.tagslist = temp;
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, {maximumAge:60000});
      } else {
        error('not supported');
      }

    });

  $scope.mySearch = {"q":""};

    $scope.tag = function(message) {
      if ($scope.tags) {
        return $scope.tags.replace(/\s*,\s*/g, ',').split(',').every(function(tag) {
          return message.tags.some(function(objTag){
            return objTag.indexOf(tag) !== -1;
          });
        });
      }
      else {
        return true;
      }
    };

    function addTag(tag){
      if($scope.tags == undefined || $scope.tags == ""){
        $scope.tags = tag;
      } else {
        $scope.tags += (","+tag);
      }
    }
    function removeTag(tag){
      var temp = $scope.tags.split(',');
      temp.splice(temp.indexOf(tag), 1);
      $scope.tags = temp.join(',');
    }

    $scope.setTag = function(tag,event) {
      
      if($(event.target).hasClass('active')) {
        //$(event.target).removeClass('active');
        $('.tags a[data-tag="'+tag+'"]').removeClass('active');
        $('.mobile-tags a[data-tag="'+tag+'"]').removeClass('active');
        removeTag(tag);
      } else {
        //$(event.target).addClass('active');
        $('.tags a[data-tag="'+tag+'"]').addClass('active');
        $('.mobile-tags a[data-tag="'+tag+'"]').addClass('active');
        addTag(tag);
      }
    };

    $scope.$on('$routeChangeSuccess', function(scope, next, current){
       
    });


    $scope.clickLogo = function(event){
      
      if($state.current.name == "home" && $(window).width() < 992){
        //if($(event.target).hasClass(""))
        $('header .atlanta').addClass("hide");
        $('header .greenspaces').addClass("hide");
        $('.logo').animate({
          left:"10"
        },100,function(){
          var w = $('header form').width();
          $('header input').show();
          $('header input').animate({
            opacity:"1",
            width: w - 35,
          },200, function(){
            $('header input').css("width","");
            $('header form input').addClass("full");
          });
        });
      } else {
        $state.go("home");
      }
      
    }

    enquire.register('screen and (min-width: 992px)', {
      match: function() {
        if( $('header form input').hasClass("full") ){
          var w = ($('.nav-wrap').width()/2) - 20;
          $('header input').animate({
            opacity:"0",
            width: 1,
          },100,function(){
            $('header form input').removeClass("full");
            $('header input').hide();
            $('.logo').animate({
              left:w
            },100,function(){
              $('header .atlanta').removeClass("hide");
              $('header .greenspaces').removeClass("hide");
              $('.logo').css("left","");
              $('.logo').addClass("center");
            });
          });
        }
      }

    });

    $scope.toggleMobileTag = function(event){
      var $this = $(event.target);
      if($this.parent().hasClass("closed")){
        
        $('.mobile-tags-wrapper').removeClass("closed");
        $('.mobile-tags-wrapper').addClass("open");
      } else {
        $('.mobile-tags-wrapper').addClass("closed");
        $('.mobile-tags-wrapper').removeClass("open");
      }
    }

    $scope.orderProp = "name";

    $scope.changeOrder = function(event){
      var $this = $(event.target);
      var index = $this.index();

      //$this.removeClass("active");
      $('.order-trigger li.active').each(function(i, element){
        $this = $(element);
        $this.removeClass("active");
        if(index == 2){
         var next =  $this.parent().find('li:first-child');
        } else {
          var next = $this.next();
        }
        next.addClass("active");

        $scope.orderProp=next.data("order");
      });     
    }


  }]);

greenspaceControllers.controller('HeaderCtrl', ['$scope', '$state',
  function($scope,$state){
    $scope.clickLogo = function(event){
      
      if($state.current.name == "home" && $(window).width() < 992){
        //if($(event.target).hasClass(""))
        $('header .atlanta').addClass("hide");
        $('header .greenspaces').addClass("hide");
        $('.logo').animate({
          left:"10"
        },100,function(){
          var w = $('header form').width();
          $('header input').show();
          $('header input').animate({
            opacity:"1",
            width: w - 35,
          },200, function(){
            $('header input').css("width","");
            $('header form input').addClass("full");
          });
        });
      } else {
        $state.go("home");
      }
      
    }

    enquire.register('screen and (min-width: 992px)', {
      match: function() {
        if( $('header form input').hasClass("full") ){
          var w = ($('.nav-wrap').width()/2) - 20;
          $('header input').animate({
            opacity:"0",
            width: 1,
          },100,function(){
            $('header form input').removeClass("full");
            $('header input').hide();
            $('.logo').animate({
              left:w
            },100,function(){
              $('header .atlanta').removeClass("hide");
              $('header .greenspaces').removeClass("hide");
              $('.logo').css("left","");
              $('.logo').addClass("center");
            });
          });
        }
      }

    });

  }]);

greenspaceControllers.controller('GreenspaceDetailCtrl', ['$scope', '$stateParams', '$http',
  function($scope, $stateParams, $http) {
    
    $http.get('greenspaces/' + $stateParams.id + '.json').success(function(data) {
      $scope.greenspace = data;
    });

    
  }]);



