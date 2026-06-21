
const gameController = (() => {

    const gameBoard = (() => {
        let spaces = new Array(8).fill(null);
        return { spaces };
    })();

    const createPlayer = (name, mark) => {
        const playerName = name;
        const playerMark = mark;
        return { playerName, playerMark };
    }

    const playerOne = createPlayer("John", "X");
    const playerTwo = createPlayer("Jarod", "O");
    let activePlayer = playerOne;
    let turnCount = 1;

    function setActivePlayer() {
        return activePlayer = (activePlayer === playerOne) ? playerTwo : playerOne;
    }

    function incrementTurn() {
        turnCount += 1;
    }

    function getTurnCount() {
        return turnCount;
    }

    function isOccupied(index) {
        if (gameBoard.spaces[index] !== null) {
            return true;
        } else return false;
    }

    function populateSpace(index) {
        if (isOccupied(index) === false) {
            gameBoard.spaces[index] = activePlayer.playerMark;
            checkWinCondition();
            incrementTurn();
            setActivePlayer();
        } else console.log("Already Occupied")
    }

    function getSpaces(index) {
        return gameBoard.spaces(index);
    }

    function getAllSpaces() {
        console.table(gameBoard.spaces)
    }

    function checkWinCondition() {
        if (getTurnCount() === 9) {
            console.log("Tie")
        } else {
            const answerKey = [
                [0, 4, 8],
                [2, 4, 6],
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
            ];
            let winner = null;
            let wonBoolean = answerKey.some((ansKey) => {
                return ansKey.every((index) => {
                    return gameBoard.spaces[index] === activePlayer.playerMark;
                });
            });
            if (wonBoolean === true) {
                console.log(`${activePlayer.playerName} has won!`);
                winner = activePlayer.playerName;
            } else {
                console.log(`No winner yet`);
            }
        }
    }

    return { getTurnCount, populateSpace, getSpaces, getAllSpaces }
})();
