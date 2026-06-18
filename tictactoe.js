const gameBoard = (() => {
    let boardSpaces = [];
    for (let spaces = 0; spaces < 9; ++spaces) {
        const newSpace = (() => {
            let isOccupied = null;

            const getOccupied = () => {
                return isOccupied != null;
            }

            const setOccupied = (activePlayer) => {
                if (getOccupied() === false) {
                    isOccupied = activePlayer;
                    return true;
                } else return false;
            }

            return { getOccupied, setOccupied };
        })();
        boardSpaces.push(newSpace);
    }

    const updateSpace = (activePlayer, index) => {
        return boardSpaces[index].setOccupied(activePlayer);
    }

    return { updateSpace };
})();

const gameController = (() => {
    let turnCount = 0;
    const playerOne = createPlayer("John", "X");
    const playerTwo = createPlayer("Jarod", "O");

    let activePlayer = playerOne;

    function createPlayer(name, marker) {
        const playerName = name;
        const playerMarker = marker;
        return { playerName, playerMarker };
    }
    const incrementTurn = () => {
        turnCount = + 1;
    }

    const switchActivePlayer = () => {
        activePlayer = playerOne ? playerTwo : playerOne
    }

    return { incrementTurn, switchActivePlayer }
})();
