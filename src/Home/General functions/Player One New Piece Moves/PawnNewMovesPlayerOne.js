const PawnNewMovesPlayerOne = (individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions) => {
    if (individualPiece.id >= 0 && individualPiece.id <= 7) {
        let returnedMoves
        boardLetters.forEach((letter, i) => {
            if (individualPiece.tilePosition.includes(letter)) {
                const tileHorizontalIndex = parseInt(individualPiece.tilePosition[1])
                let pawnAttackLeft = boardLetters[i - 1] + (individualPiece.tilePosition[1] - 1)
                let pawnAttackRight = boardLetters[i - 1] + (tileHorizontalIndex + 1)
                let newAvailableMoves = []
                let removeFromAvailableMoves = []
                playerTwoPiecePositions.forEach(position => {
                    newAvailableMoves.forEach(move => {
                        if (position.tilePosition && position.tilePosition.includes('f') && position.tilePosition[1] === move[1]) {
                            removeFromAvailableMoves.push('e' + move[1])
                        }
                    })
                })
                playerTwoPiecePositions.forEach(position => {
                    newAvailableMoves.forEach(move => {
                        if (position.tilePosition === move) {
                            removeFromAvailableMoves.push(move)
                        }
                    })
                })
                newAvailableMoves.push(pawnAttackLeft)
                newAvailableMoves.push(pawnAttackRight)
                newAvailableMoves = newAvailableMoves.filter(move => {
                    if (!removeFromAvailableMoves.includes(move)) {
                        return move
                    }
                })
                returnedMoves = { piece: 'Pawn', id: individualPiece.id, newAvailableMoves }
            }
        })
        return returnedMoves
    }
}

export default PawnNewMovesPlayerOne
