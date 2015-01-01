/**
 * Created by tinus on 6/26/14.
 */

var skovhuggerApp = angular.module('skovhuggeren', ['ngRoute', 'ngAnimate']);
skovhuggerApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/view1', {
                templateUrl: 'templates/view1Template.html',
                controller: 'View1Controller'
            }).
            when('/view2', {
                templateUrl: 'templates/view2Template.html',
                controller: 'View2Controller'
            }).
            otherwise({
                redirectTo: '/view1'
            });
    }]);


skovhuggerApp.factory('Data', function () {
    return {
        teams: [],
        scoreTable: [
            {label: "15", value: 15, multiplier: 1, score: []},
            {label: "16", value: 16, multiplier: 1, score: []},
            {label: "x2", value: null, multiplier: 2, score: []},
            {label: "17", value: 17, multiplier: 1, score: []},
            {label: "x3", value: null, multiplier: 3, score: []},
            {label: "18", value: 18, multiplier: 1, score: []},
            {label: "41", value: 41, multiplier: 1, score: []},
            {label: "19", value: 19, multiplier: 1, score: []},
            {label: "20", value: 20, multiplier: 1, score: []},
            {label: "◎", value: 25, multiplier: 1, score: []}
        ],
        resetScore: function () {
            for (var i = 0; i < this.scoreTable.length; i++) {
                this.scoreTable[i].score = [];
            }
        },
        resetGame: function() {
            this.resetScore();
            this.teams=[];
        }
    };
});

skovhuggerApp.controller('mainController', function ($scope, Data, $route) {
    $scope.reset = function () {
        Data.resetGame();
        $route.reload();
    }

});

var range = function (number) {
    result = [];
    for (var i = 0; i < number; i++) {
        result.push(null);
    }
    return result;
}

