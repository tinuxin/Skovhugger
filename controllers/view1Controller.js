skovhuggerApp.controller('View1Controller', function($scope, Data, $route) {

    $scope.nytHoldNavn="";
    $scope.teams=Data.teams;

    $scope.addTeam = function() {
        $scope.teams.push($scope.nytHoldNavn);
        $scope.nytHoldNavn="";
    }

    $scope.removeTeam = function(index) {
        $scope.teams.splice(index, 1);
    }
});