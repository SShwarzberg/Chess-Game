const HorseNewMovesPlayerTwo = (individualPiece, boardLetters, playerTwoPiecePositions) => {
    let returnedMoves
    boardLetters.forEach((letter, i) => {
        if (individualPiece.tilePosition[0] === letter) {
            let newAvailableMoves = []
            newAvailableMoves.push(
                // move horse down two, right one
                boardLetters[i + 2] + (parseInt(individualPiece.tilePosition[1]) + 1),
                // down two, left one
                boardLetters[i + 2] + (parseInt(individualPiece.tilePosition[1]) - 1),
                // down one, left two
                boardLetters[i + 1] + (parseInt(individualPiece.tilePosition[1]) - 2),
                // down one, right two
                boardLetters[i + 1] + (parseInt(individualPiece.tilePosition[1]) + 2),
                // up two, right one 
                boardLetters[i - 2] + (parseInt(individualPiece.tilePosition[1]) + 1),
                // up two, left one
                boardLetters[i - 2] + (parseInt(individualPiece.tilePosition[1]) - 1),
                // up one, right two
                boardLetters[i - 1] + (parseInt(individualPiece.tilePosition[1]) + 2),
                // up one, left two
                boardLetters[i - 1] + (parseInt(individualPiece.tilePosition[1]) - 2),
            )
            let removeFromAvailableMoves = []
            playerTwoPiecePositions.forEach(position => {
                newAvailableMoves.forEach(move => {
                    if (position.tilePosition === move) {
                        removeFromAvailableMoves.push(move)
                    }
                })
            })
            // // removes any move that includes a number position that is not a board position
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
            returnedMoves = { piece: 'Horse 2', currentPosition: individualPiece.tilePosition, id: individualPiece.id, newAvailableMoves }
        }
    })
    return returnedMoves
}

export default HorseNewMovesPlayerTwo
