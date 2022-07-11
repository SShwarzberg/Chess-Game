const KingNewMovesPlayerTwo = (individualPiece, boardLetters, playerTwoPiecePositions) => {
    if (individualPiece.id === 31) {
        let newAvailableMoves = ['d4', 'd6']
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
        playerTwoPiecePositions.forEach(position => {
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
        console.log('King 2', individualPiece.id, newAvailableMoves)
    }
}

export default KingNewMovesPlayerTwo
