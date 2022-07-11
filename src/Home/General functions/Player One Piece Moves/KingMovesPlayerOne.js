const KingMovesPlayerOne = (individualPiece, boardLetters, playerOnePiecePositions, setAvailableMoves) => {
    if (individualPiece.id === 15) {
        let newAvailableMoves = []
        let removeFromAvailableMoves = []
        boardLetters.forEach((letter, i) => {
            if (individualPiece.tilePosition.includes(letter)) {
                boardLetters.forEach((letters, index) => {
                    if (parseInt(individualPiece.tilePosition[1]) === (index - 1)) {
                        newAvailableMoves.push(letter + index)
                    }
                    if (parseInt(individualPiece.tilePosition[1]) === (index + 1)) {
                        newAvailableMoves.push(letter + index)
                    }
                })
            }
            if (parseInt(individualPiece.tilePosition[1]) === i) {
                boardLetters.forEach((letters, index) => {
                    if (individualPiece.tilePosition[0] === letters) {
                        newAvailableMoves.push(boardLetters[index - 1] + i)
                        newAvailableMoves.push(boardLetters[index + 1] + i)
                        newAvailableMoves.push(boardLetters[index - 1] + (i + 1))
                        newAvailableMoves.push(boardLetters[index + 1] + (i + 1))
                        newAvailableMoves.push(boardLetters[index - 1] + (i - 1))
                        newAvailableMoves.push(boardLetters[index + 1] + (i - 1))
                    }
                })
            }
        })
        playerOnePiecePositions.forEach(position => {
            newAvailableMoves.forEach(move => {
                if (move === position.tilePosition) {
                    removeFromAvailableMoves.push(move)
                }
            })
        })
        newAvailableMoves = newAvailableMoves.filter(move => {
            if (!removeFromAvailableMoves.includes(move)) {
                return move
            }
        })
        setAvailableMoves(newAvailableMoves)
    }
}

export default KingMovesPlayerOne
