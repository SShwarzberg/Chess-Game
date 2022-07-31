const HorseMovesPlayerOne = (individualPiece, boardLetters, playerOnePiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP2, attackingPositionsP2Perpendicular, playerTwoNextMoves) => {
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
                if (tilesBetweenKingAndAttackerP2.length > 0) {
                    newAvailableMoves = newAvailableMoves.filter(move => {
                        if (tilesBetweenKingAndAttackerP2.includes(move)) {
                            return move
                        }
                    })
                } else {
                    playerTwoNextMoves.forEach(move => {
                        playerOnePiecePositions.forEach(position => {
                            if (position.tilePosition === move && position.id === 15) {
                                console.log(true);
                                newAvailableMoves = []
                            }
                        })
                    })
                }

                const blockingKingPerpendicular = () => {
                    attackingPositionsP2Perpendicular.forEach((attacker, i) => {
                        attacker.attackingPositions.forEach(position => {
                            if (individualPiece.tilePosition === position) {
                                newAvailableMoves = []
                            }
                        })
                    })
                }
                blockingKingPerpendicular()
                setAvailableMoves(newAvailableMoves)
            }
        })
    }
}

export default HorseMovesPlayerOne
