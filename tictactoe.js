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
        boardSpaces[index].setOccupied(activePlayer);
    }

    return { updateSpace };
})();
