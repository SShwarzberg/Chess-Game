const PawnMovesPlayerOne = (individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP2, attackingPositionsP2Perpendicular, attackingPositionsDiagonalP2, p2CheckingKingPieces) => {
    if (individualPiece.id >= 0 && individualPiece.id <= 7) {
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
                let removeFromAvailableMoves = []
                playerTwoPiecePositions.forEach(position => {
                    newAvailableMoves.forEach(move => {
                        if (position.tilePosition && position.tilePosition.includes('f') && position.tilePosition[1] === move[1]) {
                            removeFromAvailableMoves.push('e' + move[1])
                        }
                    })
                    if (position.tilePosition === pawnMove) {
                        removeFromAvailableMoves.push(pawnMove)
                    }
                })
                playerOnePiecePositions.forEach(position => {
                    if (position.tilePosition === pawnMove) {
                        removeFromAvailableMoves.push(pawnMove)
                    }
                    if (position.tilePosition === pawnFirstMove) {
                        removeFromAvailableMoves.push(pawnFirstMove)
                    }
                    if (position.tilePosition[0] === 'f' && individualPiece.tilePosition[1] === position.tilePosition[1] && individualPiece.tilePosition[0] === 'g') {
                        removeFromAvailableMoves.push(pawnFirstMove)
                    }
                })
                if (individualPiece.tilePosition.includes('g')) {
                    newAvailableMoves.push(pawnFirstMove)
                }
                playerTwoPiecePositions.forEach(position => {
                    newAvailableMoves.forEach(move => {
                        if (position.tilePosition === move) {
                            removeFromAvailableMoves.push(move)
                        }
                    })
                })
                playerTwoPiecePositions.forEach(position => {
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


                if (tilesBetweenKingAndAttackerP2.length > 0) {
                    newAvailableMoves = newAvailableMoves.filter(move => {
                        if (tilesBetweenKingAndAttackerP2.includes(move)) {
                            return move
                        }
                    })
                }

                const attackingKingPerpendicular = () => {
                    let newNewAvailableMoves = []
                    attackingPositionsP2Perpendicular.forEach((attacker, i) => {
                        attacker.attackingPositions.forEach(position => {
                            if (individualPiece.tilePosition === position) {
                                attackingPositionsP2Perpendicular[i].attackingPositions.forEach(selectedAttacker => {
                                    newAvailableMoves.forEach(newMove => {
                                        if (selectedAttacker === newMove) {
                                            newNewAvailableMoves.push(selectedAttacker)
                                        }
                                    })
                                })
                                newAvailableMoves = newAvailableMoves.filter(moves => {
                                    if (newNewAvailableMoves.includes(moves)) {
                                        return moves
                                    }
                                })
                            }
                        })
                    })
                }
                attackingKingPerpendicular()

                const attackingKingDiagonal = () => {
                    let newNewAvailableMovesDiagonal = []
                    attackingPositionsDiagonalP2.forEach((attacker, i) => {
                        attacker.attackingPositions.forEach(position => {
                            if (individualPiece.tilePosition === position) {
                                attackingPositionsDiagonalP2[i].attackingPositions.forEach(selectedAttacker => {
                                    newAvailableMoves.forEach(newMove => {
                                        if (selectedAttacker === newMove) {
                                            newNewAvailableMovesDiagonal.push(selectedAttacker);
                                        }
                                    })
                                })
                                newAvailableMoves = newAvailableMoves.filter(moves => {
                                    if (newNewAvailableMovesDiagonal.includes(moves)) {
                                        return moves
                                    }
                                })
                            }
                        })
                    })
                }
                attackingKingDiagonal()
                if (p2CheckingKingPieces.length > 1) {
                    newAvailableMoves = []
                }
                setAvailableMoves(newAvailableMoves)
            }
        })
    }
}

export default PawnMovesPlayerOne
