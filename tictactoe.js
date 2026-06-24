const gameController = (() => {

    let roundWinner = null;

    const gameBoard = (() => {
        let spaces = new Array(9).fill(null);
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
            roundWinner = checkWinCondition();
            incrementTurn();
        } else console.log("Already Occupied")
    }

    function getSpaces(index) {
        return gameBoard.spaces(index);
    }

    function getAllSpaces() {
        return gameBoard.spaces;
    }

    function checkWinCondition() {
        let winner;
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
            let wonBoolean = answerKey.some((ansKey) => {
                return ansKey.every((index) => {
                    return gameBoard.spaces[index] === activePlayer.playerMark;
                });
            });
            if (wonBoolean === true) {
                console.log(`${activePlayer.playerName} has won!`);
                winner = activePlayer.playerName;
                return winner;
            } else {
                console.log(`No winner yet`);
            }
        }
    }

    const domController = (() => {
        const boardContainer = document.querySelector(".board-container");

        let boardTilesDOM = function (spaces) {
            spaces.forEach((tile, index) => {
                const currentTile = document.createElement("div");
                const currentTileMarker = document.createElement("p");
                currentTile.setAttribute("class", "boardPlace");
                currentTile.setAttribute("id", `${index}`);
                currentTileMarker.setAttribute("id", `markerID-${index}`);
                currentTile.appendChild(currentTileMarker);
                boardContainer.appendChild(currentTile);
            });
        }
        boardTilesDOM(getAllSpaces());

        addEventListener("click", (e) => {
            if (e.target.matches('.boardPlace') && !roundWinner) {
                let target = e.target.id;
                console.log(target);
                populateSpace(target);
                let internalMarker = e.target.querySelector("p");
                internalMarker.textContent = activePlayer.playerMark;
                setActivePlayer();
            }
        });
        return { boardTilesDOM };
    })();
    return { getTurnCount, populateSpace, getSpaces, getAllSpaces, domController }
})();
