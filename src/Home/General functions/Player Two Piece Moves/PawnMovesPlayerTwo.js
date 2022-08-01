const PawnMovesPlayerTwo = (individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP1, attackingPositionsP1Perpendicular, attackingPositionsDiagonalP1, checkingKingPieces) => {
    if (individualPiece.id >= 16 && individualPiece.id <= 23) {
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
                let removeFromAvailableMoves = []
                playerOnePiecePositions.forEach(position => {
                    newAvailableMoves.forEach(move => {
                        if (position.tilePosition && position.tilePosition.includes('c') && position.tilePosition[1] === move[1]) {
                            removeFromAvailableMoves.push('d' + move[1])
                        }
                    })
                    if (position.tilePosition === pawnMove) {
                        removeFromAvailableMoves.push(pawnMove)
                    }
                })
                playerTwoPiecePositions.forEach(position => {
                    if (position.tilePosition === pawnMove) {
                        removeFromAvailableMoves.push(pawnMove)
                    }
                    if (position.tilePosition === pawnFirstMove) {
                        removeFromAvailableMoves.push(pawnFirstMove)
                    }
                    if (position.tilePosition[0] === 'c' && individualPiece.tilePosition[1] === position.tilePosition[1] && individualPiece.tilePosition[0] === 'b') {
                        removeFromAvailableMoves.push(pawnFirstMove)
                    }
                })
                if (individualPiece.tilePosition.includes('b')) {
                    newAvailableMoves.push(pawnFirstMove)
                }
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
                if (tilesBetweenKingAndAttackerP1.length > 0) {
                    newAvailableMoves = newAvailableMoves.filter(move => {
                        if (tilesBetweenKingAndAttackerP1.includes(move)) {
                            return move
                        }
                    })
                }
                let newNewAvailableMovesPerpendicular = []
                attackingPositionsP1Perpendicular.forEach((attacker, i) => {
                    attacker.attackingPositions.forEach(position => {
                        if (individualPiece.tilePosition === position) {
                            attackingPositionsP1Perpendicular[i].attackingPositions.forEach(selectedAttacker => {
                                newAvailableMoves.forEach(newMove => {
                                    if (selectedAttacker === newMove) {
                                        newNewAvailableMovesPerpendicular.push(selectedAttacker);
                                    }
                                })
                            })
                            newAvailableMoves = newAvailableMoves.filter(moves => {
                                if (newNewAvailableMovesPerpendicular.includes(moves)) {
                                    return moves
                                }
                            })
                        }
                    })
                })
                let newNewAvailableMovesDiagonal = []
                attackingPositionsDiagonalP1.forEach((attacker, i) => {
                    attacker.attackingPositions.forEach(position => {
                        if (individualPiece.tilePosition === position) {
                            attackingPositionsDiagonalP1[i].attackingPositions.forEach(selectedAttacker => {
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
                if (checkingKingPieces.length > 1) {
                    newAvailableMoves = []
                }
                setAvailableMoves(newAvailableMoves)
            }
        })
    }
}

export default PawnMovesPlayerTwo
