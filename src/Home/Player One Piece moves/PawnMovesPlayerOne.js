const PawnMovesPlayerOne = (individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves) => {
    if (individualPiece.id < 9) {
        boardLetters.forEach((letter, i) => {
            if (individualPiece.tilePosition.includes(letter)) {
                const tileHorizontalIndex = parseInt(individualPiece.tilePosition[1])
                let pawnMove = boardLetters[i - 1] + individualPiece.tilePosition[1]
                let pawnFirstMove = boardLetters[i - 2] + individualPiece.tilePosition[1]
                let pawnAttackLeft = boardLetters[i - 1] + (individualPiece.tilePosition[1] - 1)
                let pawnAttackRight = boardLetters[i - 1] + (tileHorizontalIndex + 1)
                let newAvailableMoves = [
                    pawnMove
                ]
                playerTwoPiecePositions.forEach(position => {
                    if (position.tilePosition === pawnMove) {
                        newAvailableMoves.splice(pawnMove)
                    }
                })
                playerTwoPiecePositions.forEach(position => {
                    if (position.tilePosition === pawnAttackLeft) {
                        newAvailableMoves.push(pawnAttackLeft)
                    }
                    if (position.tilePosition === pawnAttackRight) {
                        newAvailableMoves.push(pawnAttackRight)
                    }
                })
                playerOnePiecePositions.forEach(position => {
                    if (position.tilePosition === pawnMove) {
                        newAvailableMoves.splice(pawnMove)
                    }
                })
                if (individualPiece.tilePosition.includes('g')) {
                    newAvailableMoves.push(pawnFirstMove)
                }
                setAvailableMoves(newAvailableMoves)
            }
        })
    }
}

export default PawnMovesPlayerOne
