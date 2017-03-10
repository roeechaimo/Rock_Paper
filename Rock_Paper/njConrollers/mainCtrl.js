app.controller('mainCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

    $scope.userScore = 0;
    $scope.computerScore = 0;
    $scope.modalShown = false;
    $scope.whoWon = null;
    $scope.randomNum = null;
    $scope.userGuess = null;
    $scope.computerGuess = null;
    $scope.selectionsArray = selectionsArray;

    function gainPoint(playerOneGuess, playerTwoGuess, playerOneScore, playerTwoScore) {
        if (playerOneGuess === playerTwoGuess) {
            return [playerOneScore, playerTwoScore];
        }
        if (playerOneGuess === 0) {
            if (playerTwoGuess === 1) {
                return [playerOneScore, playerTwoScore += 1];
            }
            if (playerTwoGuess === 2) {
                return [playerOneScore += 1, playerTwoScore];
            }
        } else if (playerOneGuess === 1) {
            if (playerTwoGuess === 0) {
                return [playerOneScore += 1, playerTwoScore];
            }
            if (playerTwoGuess === 2) {
                return [playerOneScore, playerTwoScore += 1];
            }
        } else {
            if (playerTwoGuess === 0) {
                return [playerOneScore, playerTwoScore += 1];
            }
            if (playerTwoGuess === 1) {
                return [playerOneScore += 1, playerTwoScore];
            }
        }
    }

    function youWin(you, computer) {
        $scope.userScore = you;
        $scope.computerScore = computer;
        $scope.whoWon = 'Win!';
        $scope.toggleModal();
    }

    function youLost(you, computer) {
        $scope.userScore = you;
        $scope.computerScore = computer;
        $scope.whoWon = 'Lost!';
        $scope.toggleModal();
    }

    $scope.guess = function(index) {
        $scope.randomNum = Math.floor((Math.random() * 3));
        $scope.computerGuess = $scope.selectionsArray[$scope.randomNum];
        $scope.userGuess = $scope.selectionsArray[index];
        if ($scope.userScore < 4 && $scope.computerScore < 4) {
            var scoreArray = [];
            scoreArray = gainPoint(index, $scope.randomNum, $scope.userScore, $scope.computerScore);
            $scope.userScore = scoreArray[0];
            $scope.computerScore = scoreArray[1];
            return;
        } else if ($scope.userScore === 4 && $scope.computerScore === 4) {
            scoreArray = gainPoint(index, $scope.randomNum, $scope.userScore, $scope.computerScore);
            if (scoreArray[0] === scoreArray[1]) {
            }
            if (scoreArray[0] > scoreArray[1]) {
                youWin(scoreArray[0], scoreArray[1]);
            } else {
                youLost(scoreArray[0], scoreArray[1]);
            }
        } else if ($scope.userScore === 4) {
            scoreArray = gainPoint(index, $scope.randomNum, $scope.userScore, $scope.computerScore);
            if (scoreArray[0] === $scope.userScore && scoreArray[1] === $scope.computerScore) {
            }
            if ($scope.userScore !== scoreArray[0]) {
                youWin(scoreArray[0], scoreArray[1]);
            } else {
                $scope.userScore = scoreArray[0];
                $scope.computerScore = scoreArray[1];
            }
        } else if ($scope.computerScore === 4) {
            scoreArray = gainPoint(index, $scope.randomNum, $scope.userScore, $scope.computerScore);
            if (scoreArray[0] === $scope.userScore && scoreArray[1] === $scope.computerScore) {
            }
            if ($scope.computerScore !== scoreArray[1]) {
                youLost(scoreArray[0], scoreArray[1]);
            } else {
                $scope.userScore = scoreArray[0];
                $scope.computerScore = scoreArray[1];
            }
        }
    }

    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
        $scope.finaleUserScore = $scope.userScore;
        $scope.finaleComputerScore = $scope.computerScore;
        $scope.userScore = 0;
        $scope.computerScore = 0;
    };


}]);
