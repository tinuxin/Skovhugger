skovhuggerApp.controller('View2Controller', function ($scope, Data, $route) {

    $scope.teams = Data.teams;
    $scope.numberOfTeams = $scope.teams.length;
    $scope.scoreTable = Data.scoreTable;

    $scope.roundCounter = 0;
    $scope.activeTeamCounter = 0;

    $scope.hits=null;
    $scope.value = function() {return $scope.getScoreTargetRow().value;}
    $scope.multiValue = Array(3);
    $scope.gameover = false;

    $scope.addScore = function () {
        if ($scope.checkValid()) {
            $scope.getScoreTargetRow().score[$scope.activeTeamCounter] = $scope.calculateNewTotalScore();
            $scope.activeTeamCounter++;

            if ($scope.numberOfTeams === $scope.activeTeamCounter) {
                $scope.roundCounter++;
                if ($scope.roundCounter >= $scope.scoreTable.length) {
                    $scope.gameover = true;
                } else {
                    $scope.activeTeamCounter = 0;
                }
            }
        }

        $scope.hits = null;
        $scope.multiValue = Array(3);
    }

    $scope.calculateNewTotalScore = function () {
        var score = 0, previousScore = $scope.roundCounter === 0 ? 0 : $scope.getPreviousScoreTargetRow().score[$scope.activeTeamCounter];

        if (!$scope.hits) {
            return Math.floor(previousScore / 2);
        }

        if ($scope.value() === null) {
            for (var i = 0; i < $scope.hits; i++) {
                score = score + $scope.multiValue[i] * $scope.getScoreTargetRow().multiplier;
            }
        } else {
            score = $scope.value() * $scope.hits;
        }

        return previousScore + score;
    }

    $scope.getScoreTargetRow = function() {
        return $scope.getScoreRow($scope.roundCounter);
    }

    $scope.getPreviousScoreTargetRow = function() {
        return $scope.getScoreRow($scope.roundCounter-1);
    }

    $scope.getScoreRow = function(round) {
        return $scope.scoreTable[round];
    }

    $scope.checkValid = function () {
        if ($scope.hits == null) {
            return false;
        }
        if ($scope.value() === null) {
            for (var i = 0; i < $scope.hits; i++) {
                if (!$scope.multiValue[i]) {
                    return false;
                }
            }
        }
        return true;
    }

    $scope.cancelScore = function() {
        if ($scope.activeTeamCounter === 0) {
            $scope.activeTeamCounter = $scope.numberOfTeams-1;
            $scope.roundCounter--;
        } else {
            $scope.activeTeamCounter--;
        }
        $scope.getScoreTargetRow().score.splice($scope.activeTeamCounter, 1);
    }

    $scope.newGame = function () {
        Data.resetScore();

        $scope.roundCounter = 0;
        $scope.activeTeamCounter = 0;

        $scope.gameover = false;
        Data.teams.reverse();
    }
});