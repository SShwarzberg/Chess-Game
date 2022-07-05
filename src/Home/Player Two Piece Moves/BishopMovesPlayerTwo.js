const BishopMovesPlayerTwo = (individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves) => {
    if (individualPiece.id === 25 || individualPiece.id === 26) {
        let newAvailableMoves = []
        let upAndToRight = []
        let downAndToRight = []
        let downAndToLeft = []
        let upAndToLeft = []
        boardLetters.forEach((letter, i) => {
            if (individualPiece.tilePosition.includes(letter)) {
                boardLetters.map((letters, index) => {
                    // gets moves that are up and to right of current piece
                    upAndToRight.push(boardLetters[i - index] + (parseInt(individualPiece.tilePosition[1]) + index))
                    newAvailableMoves.push(boardLetters[i - index] + (parseInt(individualPiece.tilePosition[1]) + index))
                    // down and to right 
                    downAndToRight.push(boardLetters[i + index] + (parseInt(individualPiece.tilePosition[1]) + index))
                    newAvailableMoves.push(boardLetters[i + index] + (parseInt(individualPiece.tilePosition[1]) + index))
                    // down and to left
                    downAndToLeft.push(boardLetters[i + index] + (parseInt(individualPiece.tilePosition[1]) - index))
                    newAvailableMoves.push(boardLetters[i + index] + (parseInt(individualPiece.tilePosition[1]) - index))
                    // up and to right
                    upAndToLeft.push(boardLetters[i - index] + (parseInt(individualPiece.tilePosition[1]) - index))
                    newAvailableMoves.push(boardLetters[i - index] + (parseInt(individualPiece.tilePosition[1]) - index))
                })
            }
        })
        let removeFromAvailableMoves = []
        let checkIfBlockingPlayerTwo = []
        playerTwoPiecePositions.forEach(position => {
            newAvailableMoves.forEach(move => {
                if (position.tilePosition === move) {
                    removeFromAvailableMoves.push(move)
                    checkIfBlockingPlayerTwo.push(move)
                }
            })
        })
        const getDirectionsAvailableMoves = (direction, directionIndex) => {
            direction.forEach(move => {
                boardLetters.forEach((letter, i) => {
                    if (move[0] === letter) {
                        directionIndex.push({ move, i })
                    }
                })
            })
        }
        let upAndToRightIndex = []
        let downAndToRightIndex = []
        let downAndToLeftIndex = []
        let upAndToLeftIndex = []
        getDirectionsAvailableMoves(upAndToRight, upAndToRightIndex)
        getDirectionsAvailableMoves(downAndToRight, downAndToRightIndex)
        getDirectionsAvailableMoves(downAndToLeft, downAndToLeftIndex)
        getDirectionsAvailableMoves(upAndToLeft, upAndToLeftIndex)
        let ownPiecesBlockingUpRight = []
        let ownPiecesBlockingDownRight = []
        let ownPiecesBlockingDownLeft = []
        let ownPiecesBlockingUpLeft = []
        checkIfBlockingPlayerTwo.forEach(blocking => {
            const ownBlockingDirections = (direction, directionArray) => {
                direction.forEach(availableMove => {
                    if (availableMove === blocking && blocking !== individualPiece.tilePosition) {
                        boardLetters.forEach((letter, i) => {
                            if (blocking.includes(letter)) {
                                directionArray.push({ blocking, i })
                            }
                        })
                    }
                })
            }
            // up right
            ownBlockingDirections(upAndToRight, ownPiecesBlockingUpRight)
            // down right
            ownBlockingDirections(downAndToRight, ownPiecesBlockingDownRight)
            // down left
            ownBlockingDirections(downAndToLeft, ownPiecesBlockingDownLeft)
            // up left
            ownBlockingDirections(upAndToLeft, ownPiecesBlockingUpLeft)
        })

        const pushOwnBlockingPiecesDown = (ownPiecesBlockingDirection, directionIndex) => {
            const getOwnBlockingDirection = () => {
                return ownPiecesBlockingDirection.map(piece => piece.i)
            }
            const getMinIndex = () => {
                return Math.min(...getOwnBlockingDirection())
            }
            let ownPieceBlockingDirection
            ownPiecesBlockingDirection.forEach(piece => {
                if (piece.i === getMinIndex()) {
                    ownPieceBlockingDirection = piece
                }
            })
            directionIndex.forEach(position => {
                if (ownPieceBlockingDirection !== undefined && position.i > ownPieceBlockingDirection.i) {
                    removeFromAvailableMoves.push(position.move)
                }
            })
        }
        const pushOwnBlockingPiecesUp = (ownPiecesBlockingDirection, directionIndex) => {
            const getOwnBlockingIndexUpLeft = () => {
                return ownPiecesBlockingDirection.map(piece => piece.i)
            }
            const getMaxIndexUpLeft = () => {
                return Math.max(...getOwnBlockingIndexUpLeft())
            }
            let ownPieceBlockingDirection
            ownPiecesBlockingDirection.forEach(piece => {
                if (piece.i === getMaxIndexUpLeft()) {
                    ownPieceBlockingDirection = piece
                }
            })
            directionIndex.forEach(position => {
                if (ownPieceBlockingDirection !== undefined && position.i < ownPieceBlockingDirection.i) {
                    removeFromAvailableMoves.push(position.move)
                }
            })
        }

        // remove all pieces after own first piece that blocks up and to the right
        pushOwnBlockingPiecesUp(ownPiecesBlockingUpRight, upAndToRightIndex)

        // remove all pieces after own first piece that blocks down and to the right
        pushOwnBlockingPiecesDown(ownPiecesBlockingDownRight, downAndToRightIndex)

        // remove all pieces after own first piece that blocks down and to the left
        pushOwnBlockingPiecesDown(ownPiecesBlockingDownLeft, downAndToLeftIndex)

        // remove all pieces after own first piece that blocks up and to the Left
        pushOwnBlockingPiecesUp(ownPiecesBlockingUpLeft, upAndToLeftIndex)

        let checkIfBlockingOpponent = []
        playerOnePiecePositions.forEach(position => {
            newAvailableMoves.forEach(move => {
                if (move === position.tilePosition) {
                    checkIfBlockingOpponent.push(move)
                }
            })
        })

        let opponentPiecesBlockingUpRight = []
        let opponentPiecesBlockingDownRight = []
        let opponentPiecesBlockingDownLeft = []
        let opponentPiecesBlockingUpLeft = []

        checkIfBlockingOpponent.forEach(blocking => {
            const opponentBlockingDirections = (directionIndex, opponentPiecesBlockingDirection) => {
                directionIndex.forEach(index => {
                    if (index.move === blocking) {
                        opponentPiecesBlockingDirection.push(index)
                    }
                })
            }
            opponentBlockingDirections(upAndToRightIndex, opponentPiecesBlockingUpRight)
            opponentBlockingDirections(downAndToRightIndex, opponentPiecesBlockingDownRight)
            opponentBlockingDirections(downAndToLeftIndex, opponentPiecesBlockingDownLeft)
            opponentBlockingDirections(upAndToLeftIndex, opponentPiecesBlockingUpLeft)
        })
        const removePiecesBlockedByOpponentUp = (opponentPiecesBlockingDirection, directionIndex) => {
            const getOpponentsBlockingIndexDirection = () => {
                return opponentPiecesBlockingDirection.map(piece => piece.i)
            }
            const getMaxIndexDirection = () => {
                return Math.max(...getOpponentsBlockingIndexDirection())
            }
            directionIndex.forEach(index => {
                if (getMaxIndexDirection() !== undefined && index.i < getMaxIndexDirection()) {
                    removeFromAvailableMoves.push(index.move);
                }
            })
        }
        const removePiecesBlockedByOpponentDown = (opponentPiecesBlockingDirection, directionIndex) => {
            const getOpponentsBlockingIndexDirection = () => {
                return opponentPiecesBlockingDirection.map(piece => piece.i)
            }
            const getMinIndexDirection = () => {
                return Math.min(...getOpponentsBlockingIndexDirection())
            }
            directionIndex.forEach(index => {
                if (getMinIndexDirection() !== undefined && index.i > getMinIndexDirection()) {
                    removeFromAvailableMoves.push(index.move);
                }
            })
        }

        removePiecesBlockedByOpponentUp(opponentPiecesBlockingUpRight, upAndToRightIndex)
        removePiecesBlockedByOpponentUp(opponentPiecesBlockingUpLeft, upAndToLeftIndex)
        removePiecesBlockedByOpponentDown(opponentPiecesBlockingDownRight, downAndToRightIndex)
        removePiecesBlockedByOpponentDown(opponentPiecesBlockingDownLeft, downAndToLeftIndex)
        newAvailableMoves = newAvailableMoves.filter(move => {
            if (!removeFromAvailableMoves.includes(move)) {
                return move
            }
        })
        newAvailableMoves.forEach(move => {
            if (typeof move !== 'string') {
                removeFromAvailableMoves.push(move)
            }
        })
        newAvailableMoves = Array.from(new Set(newAvailableMoves))
        setAvailableMoves(newAvailableMoves)
    }
}

export default BishopMovesPlayerTwo
