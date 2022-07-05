const PawnMovesPlayerTwo = (individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves) => {
    if (individualPiece.id > 15 && individualPiece.id < 24) {
        console.log(individualPiece.id);
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
                playerOnePiecePositions.forEach(position => {
                    if (position.tilePosition === pawnMove) {
                        newAvailableMoves.splice(pawnMove)
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
                let removeFromAvailableMoves = []
                playerOnePiecePositions.forEach(position => {
                    newAvailableMoves.forEach(move => {
                        if (move === position.tilePosition) {
                            removeFromAvailableMoves.push(move)
                        }
                    })
                })
                playerOnePiecePositions.forEach(position => {
                    if (position.tilePosition === pawnAttackLeft) {
                        newAvailableMoves.push(pawnAttackLeft)
                    }
                    if (position.tilePosition === pawnAttackRight) {
                        newAvailableMoves.push(pawnAttackRight)
                    }
                })
                newAvailableMoves = newAvailableMoves.filter(move => {
                    if (!removeFromAvailableMoves.includes(move)) {
                        return move
                    }
                })
                setAvailableMoves(newAvailableMoves)
            }
        })
    }
}

export default PawnMovesPlayerTwo
