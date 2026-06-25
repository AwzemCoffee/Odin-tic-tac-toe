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
            setActivePlayer();
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
        } else if (wonBoolean != true && getTurnCount() === 9) {
            console.log(`tie`);
            return winner = "tie";
        }
    }

    const domController = (() => {
        const boardContainer = document.querySelector(".board-container");
        const newButton = document.querySelector(".newButton");
        const submitButton = document.querySelector("#submit-button");
        const userDataForm = document.querySelector(".userDataForm");

        // Generate board DOM
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

        // Mark board
        boardContainer.addEventListener("click", (e) => {
            if (e.target.matches('.boardPlace') && !roundWinner) {
                let target = e.target.id;
                console.log(target);
                let internalMarker = e.target.querySelector("p");
                internalMarker.textContent = activePlayer.playerMark;
                populateSpace(target);
            }
        });

        // Reset
        newButton.addEventListener("click", (e) => {
            const resetBoard = (() => {
                const boardContainer = document.querySelector(".board-container");
                const tileMarkerNodes = boardContainer.querySelectorAll("p")
                console.table(tileMarkerNodes);
                gameBoard.spaces = new Array(9).fill(null);
                turnCount = 1;
                activePlayer = playerOne;
                roundWinner = null;
                tileMarkerNodes.forEach(tileText => {
                    tileText.textContent = null;
                })
            })();
        });

        // Change names
        submitButton.addEventListener("click", (e) => {
            e.preventDefault();
            playerOne.playerName = document.getElementById("PlayerOneName").value;
            playerTwo.playerName = document.getElementById("PlayerTwoName").value;
            userDataForm.reset();
        });
        return { boardTilesDOM };
    })();
    return { getTurnCount, populateSpace, getSpaces, getAllSpaces, domController }
})();
