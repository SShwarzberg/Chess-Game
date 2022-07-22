const RookMovesPlayerOne = (individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP2, attackingPositionsP2Perpendicular) => {
    if (individualPiece.id === 10 || individualPiece.id === 11) {
        let newAvailableMoves = []
        boardLetters.forEach((letter, i) => {
            if (individualPiece.tilePosition.includes(letter)) {
                boardLetters.map((letters, i) => (
                    newAvailableMoves.push(letter + [i + 1])
                ))
            }
            if (individualPiece.tilePosition.includes(i + 1)) {
                boardLetters.map(letters => (
                    newAvailableMoves.push(letters + [i + 1])
                ))
            }
        })
        let checkIfBlockingPlayerOne = []
        // gets all available moves and pushes all piece which match own piece into array
        playerOnePiecePositions.forEach(position => {
            newAvailableMoves.forEach((move, index) => {
                if (position.tilePosition === move) {
                    boardLetters.forEach((letter, i) => {
                        if (move.includes(i + 1)) {
                            checkIfBlockingPlayerOne.push(move)
                        }
                    })
                    newAvailableMoves.splice(index, 1)
                }
            })
        })
        let removeFromAvailableMoves = []
        checkIfBlockingPlayerOne.forEach(piece => {
            // remove move if it is equal to current piece position
            if (individualPiece.tilePosition === piece) {
                removeFromAvailableMoves.push(piece)
            }
            // checks if own piece is blocking horizontally
            newAvailableMoves.forEach(move => {
                const firstCondition = individualPiece.tilePosition[0] === move[0]
                const secondCondition = individualPiece.tilePosition[1] < piece[1]
                const thirdCondition = piece[1] < move[1]
                if (firstCondition && secondCondition && thirdCondition) {
                    removeFromAvailableMoves.push(move)
                }
            })
            newAvailableMoves.forEach(move => {
                const firstCondition = individualPiece.tilePosition[0] === move[0]
                const secondCondition = individualPiece.tilePosition[1] > piece[1]
                const thirdCondition = piece[1] > move[1]
                if (firstCondition && secondCondition && thirdCondition) {
                    removeFromAvailableMoves.push(move)
                }
            })
            // checks if own piece is blocking vertically
            newAvailableMoves.forEach(move => {
                const firstCondition = individualPiece.tilePosition[1] === move[1]
                const secondCondition = individualPiece.tilePosition[0] < piece[0]
                const thirdCondition = piece[0] < move[0]
                if (firstCondition && secondCondition && thirdCondition) {
                    removeFromAvailableMoves.push(move)
                }
            })
            newAvailableMoves.forEach(move => {
                const firstCondition = individualPiece.tilePosition[1] === move[1]
                const secondCondition = individualPiece.tilePosition[0] > piece[0]
                const thirdCondition = piece[0] > move[0]
                if (firstCondition && secondCondition && thirdCondition) {
                    removeFromAvailableMoves.push(move)
                }
            })
        })
        playerTwoPiecePositions.forEach(position => {
            newAvailableMoves.forEach(move => {
                if (move === position.tilePosition) {
                    if (individualPiece.tilePosition[0] === move[0] && individualPiece.tilePosition[1] < move[1]) {
                        newAvailableMoves.forEach(moves => {
                            if (moves[0] === move[0] && moves[1] > move[1]) {
                                removeFromAvailableMoves.push(moves)
                            }
                        })
                    }
                    if (individualPiece.tilePosition[0] === move[0] && individualPiece.tilePosition[1] > move[1]) {
                        newAvailableMoves.forEach(moves => {
                            if (moves[0] === move[0] && moves[1] < move[1]) {
                                removeFromAvailableMoves.push(moves)
                            }
                        })
                    }
                }
            })
        })
        let lessThanHorizontal = []
        let moreThanHorizontal = []
        let individualPieceIndex = {}
        boardLetters.forEach((letter, i) => {
            if (individualPiece.tilePosition.includes(letter)) {
                individualPieceIndex = { move: individualPiece.tilePosition, i }
            }
        })
        boardLetters.forEach((letter, i) => {
            newAvailableMoves.forEach(move => {
                if (move.includes(letter) && move[1] === individualPiece.tilePosition[1]) {
                    boardLetters.forEach((letters, index) => {
                        if (individualPiece.tilePosition.includes(letters)) {
                            if (index > i) {
                                lessThanHorizontal.push({ move, i })
                            }
                            if (index < i) {
                                moreThanHorizontal.push({ move, i })
                            }
                        }
                    })
                }
            })
        })
        let playerTwoHorizontalMatch = []
        playerTwoPiecePositions.forEach(position => {
            boardLetters.forEach((letter, i) => {
                if (position.tilePosition.includes(letter) && individualPiece.tilePosition[1] === position.tilePosition[1]) {
                    playerTwoHorizontalMatch.push({ move: position.tilePosition, i })
                }
            })
        })
        lessThanHorizontal.forEach(obj => {
            playerTwoHorizontalMatch.forEach(match => {
                if (match.i > obj.i && match.i < individualPieceIndex.i) {
                    removeFromAvailableMoves.push(obj.move)
                }
            })
        })
        moreThanHorizontal.forEach(obj => {
            playerTwoHorizontalMatch.forEach(match => {
                if (match.i < obj.i && match.i > individualPieceIndex.i) {
                    removeFromAvailableMoves.push(obj.move)
                }
            })
        })
        newAvailableMoves = newAvailableMoves.filter(item => {
            if (!removeFromAvailableMoves.includes(item)) {
                return item
            }
        })
        if (tilesBetweenKingAndAttackerP2.length > 0) {
            newAvailableMoves = newAvailableMoves.filter(move => {
                if (tilesBetweenKingAndAttackerP2.includes(move)) {
                    return move
                }
            })
        }

        const blockingKingPerpendicular = () => {
            let newNewAvailableMoves = []
            attackingPositionsP2Perpendicular.forEach((attacker, i) => {
                attacker.attackingPositions.forEach(position => {
                    if (individualPiece.tilePosition === position) {
                        attackingPositionsP2Perpendicular[i].attackingPositions.forEach(selectedAttacker => {
                            newAvailableMoves.forEach(newMove => {
                                if (selectedAttacker === newMove) {
                                    newNewAvailableMoves.push(selectedAttacker);
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
        blockingKingPerpendicular()
        setAvailableMoves(newAvailableMoves)
    }
}

export default RookMovesPlayerOne
