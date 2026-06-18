const gameBoard = (() => {
    let boardSpaces = [];
    for (let spaces = 0; spaces < 9; ++spaces) {
        const newSpace = (() => {
            let isOccupied = false;

            const getOccupied = () => {
                return isOccupied;
            }

            const setOccupied = (activePlayer) => {
                if (getOccupied() === false) {
                    isOccupied = activePlayer;
                    gameController.incrementTurn();
                    return true;
                } else return false;
            }

            return { getOccupied, setOccupied };
        })();
        boardSpaces.push(newSpace);
    }

    const updateSpace = (activePlayer, index) => {
        boardSpaces[index].setOccupied(activePlayer);
    }

    const isSpaceOccupied = (index) => {
        return boardSpaces[index].getOccupied() ? true : false;
    }

    return { updateSpace, isSpaceOccupied };
})();

const gameController = (() => {

    const playerOne = createPlayer("John", "X");
    const playerTwo = createPlayer("Jarod", "O");
    let activePlayer = playerOne;

    function createPlayer(name, marker) {
        const playerName = name;
        const playerMarker = marker;
        return { playerName, playerMarker };
    }

    const incrementTurn = () => {
        turnCount += 1;
        switchActivePlayer();
    }
    let turnCount = 0;

    const getActivePlayer = () => {
        return activePlayer;
    }

    const switchActivePlayer = () => {
        activePlayer = (playerOne) ? playerTwo : playerOne
    }

    const currentTurnCount = () => {
        return turnCount;
    }

    const checkWinCondition = () => {
        if (currentTurnCount === 8) {
            return console.log("Tie")
        }
    }

    return { incrementTurn, getActivePlayer, currentTurnCount };
})();
