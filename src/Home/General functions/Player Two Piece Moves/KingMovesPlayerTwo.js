const KingMovesPlayerTwo = (individualPiece, boardLetters, playerTwoPiecePositions, setAvailableMoves, playerOneNextMoves, ownBlockingKingFromCheckP1, nextAvailableMoves) => {
    if (individualPiece.id === 31) {
        let newAvailableMoves = []
        let removeFromAvailableMoves = []
        boardLetters.forEach((letter, i) => {
            if (individualPiece.tilePosition.includes(letter)) {
                boardLetters.forEach((letters, index) => {
                    if (parseInt(individualPiece.tilePosition[1]) === (index)) {
                        newAvailableMoves.push(letter + (index + 1))
                    }
                    if (parseInt(individualPiece.tilePosition[1]) === (index + 1)) {
                        newAvailableMoves.push(letter + index)
                    }
                })
            }
            boardLetters.forEach((letters, index) => {
                if (letters === individualPiece.tilePosition[0]) {
                    newAvailableMoves.push(boardLetters[index - 1] + individualPiece.tilePosition[1])
                    newAvailableMoves.push(boardLetters[index - 1] + parseInt(individualPiece.tilePosition[1] - 1));
                }
            })
            if (parseInt(individualPiece.tilePosition[1]) === (i + 1)) {
                boardLetters.forEach((letters, index) => {
                    if (individualPiece.tilePosition[0] === letters) {
                        newAvailableMoves.push(boardLetters[index - 1] + i)
                        newAvailableMoves.push(boardLetters[index + 1] + i)
                        newAvailableMoves.push(boardLetters[index - 1] + (i + 1))
                        newAvailableMoves.push(boardLetters[index + 1] + (i + 1))
                        newAvailableMoves.push(boardLetters[index - 1] + (i + 2))
                        newAvailableMoves.push(boardLetters[index + 1] + (i + 2))
                    }
                })
            }
        });
        newAvailableMoves.forEach(move => {
            playerTwoPiecePositions.forEach(position => {
                if (move === position.tilePosition) {
                    removeFromAvailableMoves.push(move)
                }
            })
            ownBlockingKingFromCheckP1.forEach(position => {
                if (position === move) {
                    removeFromAvailableMoves.push(move);
                }
            })
        })
        playerOneNextMoves.forEach(nextMove => {
            newAvailableMoves.forEach(move => {
                if (nextMove === move) {
                    removeFromAvailableMoves.push(move)
                }
            })
        })
        let upAndToRight = []
        let downAndToRight = []
        let downAndToLeft = []
        let upAndToLeft = []
        boardLetters.forEach((letter, i) => {
            if (individualPiece.tilePosition.includes(letter)) {
                boardLetters.map((letters, index) => {
                    // gets moves that are up and to right of current piece
                    upAndToRight.push(boardLetters[i - index] + (parseInt(individualPiece.tilePosition[1]) + index))
                    // down and to right 
                    downAndToRight.push(boardLetters[i + index] + (parseInt(individualPiece.tilePosition[1]) + index))
                    // down and to left
                    downAndToLeft.push(boardLetters[i + index] + (parseInt(individualPiece.tilePosition[1]) - index))
                    // up and to right
                    upAndToLeft.push(boardLetters[i - index] + (parseInt(individualPiece.tilePosition[1]) - index))
                })
            }
        })
        if (nextAvailableMoves[0]) {
            nextAvailableMoves[0].forEach(pieces => {
                pieces.map(piece => {
                    piece.newAvailableMoves.forEach(move => {
                        if (move === individualPiece.tilePosition) {
                            newAvailableMoves.forEach(newMove => {
                                if (piece.piece.includes('Queen') || piece.piece.includes('Rook')) {
                                    if (newMove[0] === piece.currentPosition[0] && newMove !== piece.currentPosition) {
                                        removeFromAvailableMoves.push(newMove)
                                    }
                                    if (newMove[1] === piece.currentPosition[1] && newMove !== piece.currentPosition) {
                                        removeFromAvailableMoves.push(newMove)
                                    }
                                }
                                if (piece.piece.includes('Queen') || piece.piece.includes('Bishop')) {
                                    downAndToRight.forEach(directionMove => {
                                        if (piece.currentPosition === directionMove) {
                                            upAndToLeft.forEach(direction => {
                                                newAvailableMoves.forEach(newAvailableMove => {
                                                    if (direction === newAvailableMove) {
                                                        removeFromAvailableMoves.push(newAvailableMove)
                                                    }
                                                })
                                            })
                                        }
                                    })
                                    upAndToRight.forEach(directionMove => {
                                        if (piece.currentPosition === directionMove) {
                                            downAndToLeft.forEach(direction => {
                                                newAvailableMoves.forEach(newAvailableMove => {
                                                    if (direction === newAvailableMove) {
                                                        removeFromAvailableMoves.push(newAvailableMove)
                                                    }
                                                })
                                            })
                                        }
                                    })
                                    downAndToLeft.forEach(directionMove => {
                                        if (piece.currentPosition === directionMove) {
                                            upAndToRight.forEach(direction => {
                                                newAvailableMoves.forEach(newAvailableMove => {
                                                    if (direction === newAvailableMove) {
                                                        removeFromAvailableMoves.push(newAvailableMove)
                                                    }
                                                })
                                            })
                                        }
                                    })
                                    upAndToLeft.forEach(directionMove => {
                                        if (piece.currentPosition === directionMove) {
                                            downAndToRight.forEach(direction => {
                                                newAvailableMoves.forEach(newAvailableMove => {
                                                    if (direction === newAvailableMove) {
                                                        removeFromAvailableMoves.push(newAvailableMove)
                                                    }
                                                })
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                })
            })
        }
        newAvailableMoves = newAvailableMoves.filter(move => {
            if (!removeFromAvailableMoves.includes(move)) {
                return move
            }
        })
        setAvailableMoves(newAvailableMoves)
    }
}

export default KingMovesPlayerTwo
