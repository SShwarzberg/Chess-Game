const PawnNewMovesPlayerTwo = (individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions) => {
    let returnedMoves
    boardLetters.forEach((letter, i) => {
        if (individualPiece.tilePosition.includes(letter)) {
            const tileHorizontalIndex = parseInt(individualPiece.tilePosition[1])
            let pawnAttackLeft = boardLetters[i + 1] + (tileHorizontalIndex - 1)
            let pawnAttackRight = boardLetters[i + 1] + (tileHorizontalIndex + 1)
            let newAvailableMoves = []
            let removeFromAvailableMoves = []
            playerOnePiecePositions.forEach(position => {
                newAvailableMoves.forEach(move => {
                    if (position.tilePosition && position.tilePosition.includes('c') && position.tilePosition[1] === move[1]) {
                        removeFromAvailableMoves.push('d' + move[1])
                    }
                })
            })
            playerOnePiecePositions.forEach(position => {
                newAvailableMoves.forEach(move => {
                    if (move === position.tilePosition) {
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
            returnedMoves = { piece: 'Pawn 2', id: individualPiece.id, newAvailableMoves }
        }
    })
    return returnedMoves
}

export default PawnNewMovesPlayerTwo
