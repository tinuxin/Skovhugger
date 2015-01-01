skovhuggerApp.controller('View2Controller', function ($scope, Data, $route) {

    $scope.teams = Data.teams;
    $scope.numberOfTeams = $scope.teams.length;
    $scope.scoreTable = Data.scoreTable;

    $scope.roundCounter = 0;
    $scope.activeTeamCounter = 0;
    $scope.scorePreviousTargetRow = $scope.scoreTable[0];
    $scope.scoreActiveTargetRow = $scope.scoreTable[0];

    $scope.hits=null;
    $scope.value = $scope.scoreActiveTargetRow.value;
    $scope.multiplier = $scope.scoreActiveTargetRow.multiplier;
    $scope.multiValue = Array(3);
    $scope.gameover = false;

    $scope.addScore = function () {
        $scope.scoreActiveTargetRow.score[$scope.activeTeamCounter] = $scope.calculateNewTotalScore();
        $scope.activeTeamCounter++;

        if ($scope.numberOfTeams === $scope.activeTeamCounter) {
            $scope.roundCounter++;
            if ($scope.roundCounter >= $scope.scoreTable.length) {
                $scope.gameover=true;
            } else {
            $scope.scorePreviousTargetRow = $scope.scoreActiveTargetRow;
            $scope.scoreActiveTargetRow = $scope.scoreTable[$scope.roundCounter];

            $scope.value = $scope.scoreActiveTargetRow.value;
            $scope.multiplier = $scope.scoreActiveTargetRow.multiplier;

            $scope.activeTeamCounter = 0;
            }
        }

        $scope.hits = null;
        $scope.multiValue = Array(3);
    }

    $scope.calculateNewTotalScore = function () {
        var score = 0, previousScore = $scope.roundCounter === 0 ? 0 : $scope.scorePreviousTargetRow.score[$scope.activeTeamCounter];

        if (!$scope.hits) {
            return Math.floor(previousScore / 2);
        }

        if ($scope.value === null) {
            for (var i = 0; i < $scope.hits; i++) {
                score = score + $scope.multiValue[i] * $scope.multiplier;
            }
        } else {
            score = $scope.value * $scope.hits;
        }

        return previousScore + score;
    }


    $scope.checkValid = function () {
        if ($scope.hits == null) {
            return false;
        }
        if ($scope.value === null) {
            for (var i = 0; i < $scope.hits; i++) {
                if (!$scope.multiValue[i]) {
                    return false;
                }
            }
        }
        return true;
    }

    $scope.newGame = function () {
        Data.resetScore();

        $scope.roundCounter = 0;
        $scope.activeTeamCounter = 0;
        $scope.scorePreviousTargetRow = $scope.scoreTable[0];
        $scope.scoreActiveTargetRow = $scope.scoreTable[0];

        $scope.value = $scope.scoreActiveTargetRow.value;
        $scope.multiplier = $scope.scoreActiveTargetRow.multiplier;
        $scope.gameover = false;
    }

    $scope.newScore;
    $scope.showModal = function (targetRow, teamIndex) {
        $scope.newScore = null;
        $('#editValueModal').on('hide.bs.modal',function (e) {
            targetRow.score[teamIndex] = $scope.newScore;
        }).modal('show');
    }

    $scope.hideModal = function () {
        $('#editValueModal').modal('hide').off('hide.bs.modal');
    }
});