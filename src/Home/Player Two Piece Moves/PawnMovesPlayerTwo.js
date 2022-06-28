const PawnMovesPlayerTwo = (individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves) => {
    if (individualPiece.id > 16 && individualPiece.id < 25) {
        boardLetters.forEach((letter, i) => {
            if (individualPiece.tilePosition.includes(letter)) {
                const tileHorizontalIndex = parseInt(individualPiece.tilePosition[1])
                let pawnMove = boardLetters[i + 1] + tileHorizontalIndex
                let pawnFirstMove = boardLetters[i + 2] + tileHorizontalIndex
                let pawnAttackLeft = boardLetters[i + 1] + (tileHorizontalIndex - 1)
                let pawnAttackRight = boardLetters[i + 1] + (tileHorizontalIndex + 1)
                let newAvailableMoves = [
                    pawnMove
                ]
                console.log(pawnFirstMove);
                playerOnePiecePositions.forEach(position => {
                    if (position.tilePosition === pawnMove) {
                        newAvailableMoves.splice(pawnMove)
                    }
                })
                playerOnePiecePositions.forEach(position => {
                    if (position.tilePosition === pawnAttackLeft) {
                        newAvailableMoves.push(pawnAttackLeft)
                    }
                    if (position.tilePosition === pawnAttackRight) {
                        newAvailableMoves.push(pawnAttackRight)
                    }
                })
                playerTwoPiecePositions.forEach(position => {
                    if (position.tilePosition === pawnMove) {
                        newAvailableMoves.splice(pawnMove)
                    }
                })
                if (individualPiece.tilePosition.includes('b')) {
                    newAvailableMoves.push(pawnFirstMove)
                }
                setAvailableMoves(newAvailableMoves)
            }
        })
    }
}

export default PawnMovesPlayerTwo
