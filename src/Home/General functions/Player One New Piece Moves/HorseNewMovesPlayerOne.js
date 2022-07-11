const HorseNewMovesPlayerOne = (individualPiece, boardLetters, playerOnePiecePositions) => {
    if (individualPiece.id === 12 || individualPiece.id === 13) {
        boardLetters.forEach((letter, i) => {
            if (individualPiece.tilePosition[0] === letter) {
                let newAvailableMoves = []
                newAvailableMoves.push(
                    // move horse forward
                    boardLetters[i - 2] + (parseInt(individualPiece.tilePosition[1]) + 1),
                    boardLetters[i - 2] + (parseInt(individualPiece.tilePosition[1]) - 1),
                    boardLetters[i - 1] + (parseInt(individualPiece.tilePosition[1]) - 2),
                    boardLetters[i - 1] + (parseInt(individualPiece.tilePosition[1]) + 2),
                    // move horse backward
                    boardLetters[i + 2] + (parseInt(individualPiece.tilePosition[1]) + 1),
                    boardLetters[i + 2] + (parseInt(individualPiece.tilePosition[1]) - 1),
                    boardLetters[i + 1] + (parseInt(individualPiece.tilePosition[1]) + 2),
                    boardLetters[i + 1] + (parseInt(individualPiece.tilePosition[1]) - 2),
                )
                let removeFromAvailableMoves = []
                playerOnePiecePositions.forEach(position => {
                    newAvailableMoves.forEach(move => {
                        if (position.tilePosition === move) {
                            removeFromAvailableMoves.push(move)
                        }
                    })
                })
                // removes any move that includes a number position that is not a board position
                newAvailableMoves = newAvailableMoves.filter(move => {
                    if (move[1] >= 1) {
                        return move
                    }
                })
                // removes available move if own piece is in spot
                newAvailableMoves = newAvailableMoves.filter(move => {
                    if (!removeFromAvailableMoves.includes(move)) {
                        return move
                    }
                })
                console.log('Horse', individualPiece.id, newAvailableMoves);
            }
        })
    }
}

export default HorseNewMovesPlayerOne
