const QueenNewMovesPlayerTwo = (individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions) => {
    let returnedMoves
    let blockingKingFromCheck = []
    let newAvailableMoves = []
    let removeFromAvailableMoves = []

    // orthogonal moves
    let ownPieceBlockingOrthogonal = []
    let ownPieceBlockingHorizontal = []
    let ownPieceBlockingVertical = []

    boardLetters.forEach((letter, i) => {
        if (individualPiece.tilePosition[0] === letter) {
            boardLetters.forEach((letters, index) => {
                newAvailableMoves.push(letter + (index + 1))
            })
        }
        if (parseInt(individualPiece.tilePosition[1]) === i) {
            boardLetters.forEach(letters => {
                newAvailableMoves.push(letters + (i))
            })
        }
    })

    playerTwoPiecePositions.forEach(position => {
        newAvailableMoves.forEach(move => {
            if (position.tilePosition === move) {
                removeFromAvailableMoves.push(move)
                if (individualPiece.tilePosition !== move) {
                    ownPieceBlockingOrthogonal.push(move)
                }
            }
        })
    })

    ownPieceBlockingOrthogonal.forEach(blockingPiece => {
        if (individualPiece.tilePosition[0] === blockingPiece[0]) {
            ownPieceBlockingHorizontal.push({ blockingPiece, i: parseInt(blockingPiece[1]) })
        }
        if (individualPiece.tilePosition[1] === blockingPiece[1]) {
            boardLetters.forEach((letter, i) => {
                if (blockingPiece[0] === letter) {
                    ownPieceBlockingVertical.push({ blockingPiece, i: i + 1 })
                }
            })
        }
    })

    let ownPieceBlockingRight = []
    let ownPieceBlockingLeft = []
    ownPieceBlockingHorizontal.forEach(pieceBlocking => {
        if (pieceBlocking.i > parseInt(individualPiece.tilePosition[1])) {
            ownPieceBlockingRight.push(pieceBlocking)
        }
        if (pieceBlocking.i < parseInt(individualPiece.tilePosition[1])) {
            ownPieceBlockingLeft.push(pieceBlocking)
        }
    })

    const ownBlockingRight = () => {
        const indexBlockingRight = ownPieceBlockingRight.map(piece => {
            return piece.i
        })
        const getMinBlockingRight = Math.min(...indexBlockingRight)
        newAvailableMoves.forEach(move => {
            if (move[0] === individualPiece.tilePosition[0] && move[1] > getMinBlockingRight) {
                removeFromAvailableMoves.push(move)
            }
        })
    }
    ownBlockingRight()

    const ownBlockingLeft = () => {
        const indexBlockingLeft = ownPieceBlockingLeft.map(piece => {
            return piece.i
        })
        const getMaxBlockingLeft = Math.max(...indexBlockingLeft)
        newAvailableMoves.forEach(move => {
            if (move[0] === individualPiece.tilePosition[0] && move[1] < getMaxBlockingLeft) {
                removeFromAvailableMoves.push(move)
            }
        })
    }
    ownBlockingLeft()

    let individualPieceIndex
    let ownPieceBlockingUp = []
    let ownPieceBlockingDown = []
    ownPieceBlockingVertical.forEach(pieceBlocking => {
        boardLetters.forEach((letter, i) => {
            if (individualPiece.tilePosition[0] === letter) {
                individualPieceIndex = i + 1
            }
        })
        if (pieceBlocking.i < individualPieceIndex) {
            ownPieceBlockingUp.push(pieceBlocking)
        }
        if (pieceBlocking.i > individualPieceIndex) {
            ownPieceBlockingDown.push(pieceBlocking)
        }
    })

    let newAvailableMovesIndexVertical = []

    newAvailableMoves.map(move => {
        boardLetters.forEach((letter, i) => {
            if (move[0] === letter && individualPiece.tilePosition[1] === move[1]) {
                newAvailableMovesIndexVertical.push({ move, i: i + 1 })
            }
        })
    })

    const ownBlockingUp = () => {
        const indexBlockingUp = ownPieceBlockingUp.map(piece => {
            return piece.i
        })
        const getMaxBlockingUp = Math.max(...indexBlockingUp)
        newAvailableMovesIndexVertical.forEach(vertMove => {
            if (vertMove.i < getMaxBlockingUp && Number.isFinite(getMaxBlockingUp) && vertMove.i < individualPieceIndex) {
                removeFromAvailableMoves.push(vertMove.move)
            }
        })
    }
    ownBlockingUp()

    const ownBlockingDown = () => {
        const indexBlockingDown = ownPieceBlockingDown.map(piece => {
            return piece.i
        })
        const getMinBlockingDown = Math.min(...indexBlockingDown)
        newAvailableMovesIndexVertical.forEach(vertMove => {
            if (vertMove.i > getMinBlockingDown && Number.isFinite(getMinBlockingDown) && vertMove.i > individualPieceIndex) {
                removeFromAvailableMoves.push(vertMove.move)
            }
        })
    }
    ownBlockingDown()

    // opponents pieces blocking
    let opponentPieceBlockingOrthogonal = []
    playerOnePiecePositions.forEach(position => {
        newAvailableMoves.forEach(move => {
            if (position.tilePosition === move) {
                opponentPieceBlockingOrthogonal.push(move)
            }
        })
    })

    let opponentPieceBlockingHorizontal = []
    let opponentPieceBlockingVertical = []
    opponentPieceBlockingOrthogonal.forEach(blockingPiece => {
        if (individualPiece.tilePosition[0] === blockingPiece[0]) {
            opponentPieceBlockingHorizontal.push({ blockingPiece, i: parseInt(blockingPiece[1]) })
        }
        if (individualPiece.tilePosition[1] === blockingPiece[1]) {
            boardLetters.forEach((letter, i) => {
                if (blockingPiece[0] === letter) {
                    opponentPieceBlockingVertical.push({ blockingPiece, i: i + 1 })
                }
            })
        }
    })

    let opponentPieceBlockingRight = []
    let opponentPieceBlockingLeft = []
    opponentPieceBlockingHorizontal.forEach(pieceBlocking => {
        if (pieceBlocking.i > parseInt(individualPiece.tilePosition[1])) {
            opponentPieceBlockingRight.push(pieceBlocking)
        }
        if (pieceBlocking.i < parseInt(individualPiece.tilePosition[1])) {
            opponentPieceBlockingLeft.push(pieceBlocking)
        }
    })

    const opponentBlockingRight = () => {
        const indexBlockingRight = opponentPieceBlockingRight.map(piece => {
            return piece.i
        })
        const getMinBlockingRight = Math.min(...indexBlockingRight)
        newAvailableMoves.forEach(move => {
            if (move[0] === individualPiece.tilePosition[0] && move[1] > getMinBlockingRight) {
                removeFromAvailableMoves.push(move)
            }
        })
    }
    opponentBlockingRight()

    const opponentBlockingLeft = () => {
        const indexBlockingLeft = opponentPieceBlockingLeft.map(piece => {
            return piece.i
        })
        const getMaxBlockingLeft = Math.max(...indexBlockingLeft)
        newAvailableMoves.forEach(move => {
            if (move[0] === individualPiece.tilePosition[0] && move[1] < getMaxBlockingLeft) {
                removeFromAvailableMoves.push(move)
            }
        })
    }
    opponentBlockingLeft()

    let opponentPieceBlockingUp = []
    let opponentPieceBlockingDown = []
    opponentPieceBlockingVertical.forEach(pieceBlocking => {
        if (pieceBlocking.blockingPiece[0] < individualPiece.tilePosition[0]) {
            opponentPieceBlockingUp.push(pieceBlocking)
        }
        if (pieceBlocking.blockingPiece[0] > individualPiece.tilePosition[0]) {
            opponentPieceBlockingDown.push(pieceBlocking)
        }
    })


    const opponentBlockingUp = () => {
        if (opponentPieceBlockingUp.length > 0) {
            const indexBlockingUp = opponentPieceBlockingUp.map(piece => {
                return piece.i
            })
            const getMaxBlockingUp = Math.max(...indexBlockingUp)
            newAvailableMovesIndexVertical.forEach(vertMove => {
                if (vertMove.i < getMaxBlockingUp) {
                    removeFromAvailableMoves.push(vertMove.move)
                }
            })
        }
    }
    opponentBlockingUp()

    const opponentBlockingDown = () => {
        const indexBlockingDown = opponentPieceBlockingDown.map(piece => {
            return piece.i
        })
        const getMinBlockingDown = Math.min(...indexBlockingDown)
        newAvailableMovesIndexVertical.forEach(vertMove => {
            if (vertMove.i > getMinBlockingDown) {
                removeFromAvailableMoves.push(vertMove.move)
            }
        })
    }
    opponentBlockingDown()

    // diagonal moves
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
    let checkIfBlockingOwnPiece = []
    playerTwoPiecePositions.forEach(position => {
        newAvailableMoves.forEach(move => {
            if (position.tilePosition === move) {
                removeFromAvailableMoves.push(move)
                checkIfBlockingOwnPiece.push(move)
            }
        })
    })
    let upAndToRightIndex = []
    let downAndToRightIndex = []
    let downAndToLeftIndex = []
    let upAndToLeftIndex = []
    const getDirectionsAvailableMoves = (direction, directionIndex) => {
        direction.forEach(move => {
            boardLetters.forEach((letter, i) => {
                if (move[0] === letter) {
                    directionIndex.push({ move, i })
                }
            })
        })
    }
    getDirectionsAvailableMoves(upAndToRight, upAndToRightIndex)
    getDirectionsAvailableMoves(downAndToRight, downAndToRightIndex)
    getDirectionsAvailableMoves(downAndToLeft, downAndToLeftIndex)
    getDirectionsAvailableMoves(upAndToLeft, upAndToLeftIndex)
    let ownPiecesBlockingUpRight = []
    let ownPiecesBlockingDownRight = []
    let ownPiecesBlockingDownLeft = []
    let ownPiecesBlockingUpLeft = []
    checkIfBlockingOwnPiece.forEach(blocking => {
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
                removeFromAvailableMoves.push(index.move)
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
                removeFromAvailableMoves.push(index.move)
            }
        })
    }

    removePiecesBlockedByOpponentUp(opponentPiecesBlockingUpRight, upAndToRightIndex)
    removePiecesBlockedByOpponentUp(opponentPiecesBlockingUpLeft, upAndToLeftIndex)
    removePiecesBlockedByOpponentDown(opponentPiecesBlockingDownRight, downAndToRightIndex)
    removePiecesBlockedByOpponentDown(opponentPiecesBlockingDownLeft, downAndToLeftIndex)


    newAvailableMoves = newAvailableMoves.filter(move => {
        return !removeFromAvailableMoves.includes(move) ? move : null
    })
    newAvailableMoves = newAvailableMoves.filter(move => {
        return move !== individualPiece.tilePosition ? move : null
    })
    returnedMoves = { piece: 'Queen 2', id: individualPiece.id, newAvailableMoves }

    let moreThanBlockingHorizontal = []
    let lessThanBlockingHorizontal = []
    let moreThanBlockingVertical = []
    let lessThanBlockingVertical = []
    let ownMoreThanBlockingHorizontal = []
    let ownLessThanBlockingHorizontal = []
    newAvailableMoves.forEach(move => {
        playerOnePiecePositions.forEach(position => {
            if (position.tilePosition === move) {
                const availableMove = position
                playerOnePiecePositions.forEach(piecePosition => {
                    if (piecePosition.id === 15 && availableMove.id !== 15) {
                        const kingPosition = piecePosition
                        // gets blocking piece that is available move and is less than current piece index and more than king index horizontally
                        if (availableMove.tilePosition[0] === kingPosition.tilePosition[0] && individualPiece.tilePosition[1] > availableMove.tilePosition[1] && individualPiece.tilePosition[1] > kingPosition.tilePosition[1]) {
                            blockingKingFromCheck.push(availableMove.tilePosition)
                            playerTwoPiecePositions.forEach(p1Position => {
                                if (p1Position.tilePosition) {
                                    if (p1Position.tilePosition[0] === availableMove.tilePosition[0] && p1Position.id !== 15 && p1Position.tilePosition[1] < individualPiece.tilePosition[1] && p1Position.tilePosition[1] > kingPosition.tilePosition[1]) {
                                        ownLessThanBlockingHorizontal.push(p1Position.tilePosition[1])
                                    }
                                }
                            })
                            playerOnePiecePositions.forEach(p1Position => {
                                if (p1Position.tilePosition) {
                                    if (p1Position.tilePosition[0] === availableMove.tilePosition[0] && p1Position.id !== 15 && p1Position.tilePosition[1] < individualPiece.tilePosition[1] && p1Position.tilePosition[1] > kingPosition.tilePosition[1]) {
                                        lessThanBlockingHorizontal.push(p1Position.tilePosition)
                                    }
                                }
                            })
                        }
                        // gets blocking piece that is available move and is more than current piece index and less than king index horizontally
                        if (availableMove.tilePosition[0] === kingPosition.tilePosition[0] && individualPiece.tilePosition[1] < availableMove.tilePosition[1] && individualPiece.tilePosition[1] < kingPosition.tilePosition[1] && availableMove.tilePosition[0] === individualPiece.tilePosition[0]) {
                            blockingKingFromCheck.push(availableMove.tilePosition)
                            playerTwoPiecePositions.forEach(p2Position => {
                                if (p2Position.tilePosition[0] === availableMove.tilePosition[0] && p2Position.id !== 15 && p2Position.tilePosition[1] < kingPosition.tilePosition[1] && p2Position.tilePosition[1] > individualPiece.tilePosition[1]) {
                                    ownMoreThanBlockingHorizontal.push(parseInt(p2Position.tilePosition[1]))
                                }
                            })
                            playerOnePiecePositions.forEach(p1Position => {
                                if (p1Position.tilePosition[0] === availableMove.tilePosition[0] && p1Position.id !== 15 && p1Position.tilePosition[1] < kingPosition.tilePosition[1] && p1Position.tilePosition[1] > individualPiece.tilePosition[1] && !ownMoreThanBlockingHorizontal.length > 0) {
                                    moreThanBlockingHorizontal.push(p1Position)
                                }
                            })
                        }
                        if (availableMove.tilePosition[1] === kingPosition.tilePosition[1]) {
                            let individualPieceIndex
                            let kingPositionIndex
                            let verticalPositionIndex = []
                            playerOnePiecePositions.forEach(position => {
                                if (position.tilePosition[1] === availableMove.tilePosition[1]) {
                                    boardLetters.forEach((letter, i) => {
                                        if (individualPiece.tilePosition[0] === letter) {
                                            individualPieceIndex = { piece: individualPiece.tilePosition, i }
                                        }
                                        if (position.tilePosition[0] === letter && position.id !== 15) {
                                            verticalPositionIndex.push({ piece: position.tilePosition, i })
                                        }
                                        if (position.id === 15 && position.tilePosition[0] === letter) {
                                            kingPositionIndex = { piece: position.tilePosition, i }
                                        }
                                    })
                                }
                            })
                            let ownMoreThanVertical = []
                            let ownLessThanVertical = []
                            playerTwoPiecePositions.forEach(position => {
                                if (position.tilePosition[1] === availableMove.tilePosition[1]) {
                                    boardLetters.forEach((letter, i) => {
                                        if (position.tilePosition[0] === letter && position.tilePosition[0] > individualPiece.tilePosition[0]) {
                                            ownMoreThanVertical.push(i)
                                        }
                                        if (position.tilePosition[0] === letter && position.tilePosition[0] < individualPiece.tilePosition[0]) {
                                            ownLessThanVertical.push(i)
                                        }
                                    })
                                }
                            })
                            verticalPositionIndex.forEach(position => {
                                // gets blocking piece that is available move and is more than current piece letter index and less than king index vertically
                                if (position.i > individualPieceIndex.i && position.i < kingPositionIndex.i && !ownMoreThanVertical.length > 0) {
                                    moreThanBlockingVertical.push(position.piece)
                                }
                                else if (position.i > individualPieceIndex.i && position.i < kingPositionIndex.i && ownMoreThanVertical.length > 0) {
                                    if (!ownMoreThanVertical.some(el => el < kingPositionIndex.i)) {
                                        moreThanBlockingVertical.push(position.piece)
                                    }
                                }
                                // gets blocking piece that is available move and is less than current piece letter index and more than king index vertically
                                if (position.i < individualPieceIndex.i && position.i > kingPositionIndex.i && !ownLessThanVertical.length > 0) {
                                    lessThanBlockingVertical.push(position.piece)
                                }
                                else if (position.i < individualPieceIndex.i && position.i > kingPositionIndex.i && ownLessThanVertical.length > 0) {
                                    if (!ownLessThanVertical.some(el => el > kingPositionIndex.i)) {
                                        lessThanBlockingVertical.push(position.piece)
                                    }
                                }
                            })
                        }
                    }
                })
            }
        })
    })
    if (moreThanBlockingHorizontal.length > 1 || ownMoreThanBlockingHorizontal.length > 0) {
        blockingKingFromCheck.pop()
    }
    if (lessThanBlockingHorizontal.length > 1 || ownLessThanBlockingHorizontal.length > 0) {
        blockingKingFromCheck.pop()
    }
    moreThanBlockingVertical = Array.from(new Set(moreThanBlockingVertical))
    if (moreThanBlockingVertical.length === 1) {
        moreThanBlockingVertical.forEach(blocking => {
            blockingKingFromCheck.push(blocking)
        })
    }
    lessThanBlockingVertical = Array.from(new Set(lessThanBlockingVertical))
    if (lessThanBlockingVertical.length === 1) {
        lessThanBlockingVertical.forEach(blocking => {
            blockingKingFromCheck.push(blocking)
        })
    }

    let kingPosition
    playerOnePiecePositions.forEach(position => {
        if (position.id === 15) {
            kingPosition = position.tilePosition
        }
    })

    let blockingKingUpRight = []
    let blockingKingDownRight = []
    let blockingKingDownLeft = []
    let blockingKingUpLeft = []
    const setBlockingDirectionsRight = (opponentBlockingDirection, blockingKingDirection) => {
        opponentBlockingDirection.forEach(blockingPiece => {
            if (blockingPiece.move === kingPosition) {
                playerOnePiecePositions.forEach(position => {
                    opponentBlockingDirection.forEach(piece => {
                        if (position.tilePosition === piece.move && position.tilePosition[1] < kingPosition[1] && individualPiece.tilePosition !== piece.move) {
                            blockingKingDirection.push(piece.move)
                        }
                    })
                })
            }
        })
    }
    const setBlockingDirectionsLeft = (opponentBlockingDirection, blockingKingDirection) => {
        opponentBlockingDirection.forEach(blockingPiece => {
            if (blockingPiece.move === kingPosition) {
                playerOnePiecePositions.forEach(position => {
                    opponentBlockingDirection.forEach(piece => {
                        if (position.tilePosition === piece.move && position.tilePosition[1] > kingPosition[1] && individualPiece.tilePosition !== piece.move) {
                            blockingKingDirection.push(piece.move)
                        }
                    })
                })
            }
        })
    }
    setBlockingDirectionsRight(opponentPiecesBlockingUpRight, blockingKingUpRight)
    setBlockingDirectionsRight(opponentPiecesBlockingDownRight, blockingKingDownRight)
    setBlockingDirectionsLeft(opponentPiecesBlockingUpLeft, blockingKingUpLeft)
    setBlockingDirectionsLeft(opponentPiecesBlockingDownLeft, blockingKingDownLeft)

    let kingBlockedByOwnPieceUpRight
    playerTwoPiecePositions.forEach(position => {
        upAndToRightIndex.forEach(directionIndex => {
            if (position.tilePosition === directionIndex.move && position.tilePosition !== individualPiece.tilePosition) {
                upAndToRightIndex.forEach(index => {
                    playerOnePiecePositions.forEach(p1Position => {
                        if (p1Position.id === 15 && p1Position.tilePosition === index.move) {
                            if (directionIndex.i > index.i) {
                                kingBlockedByOwnPieceUpRight = true
                            }
                        }
                    })
                })
            }
        })
    })

    let kingBlockedByOwnPieceDownRight
    playerTwoPiecePositions.forEach(position => {
        downAndToRightIndex.forEach(directionIndex => {
            if (position.tilePosition === directionIndex.move && position.tilePosition !== individualPiece.tilePosition) {
                downAndToRightIndex.forEach(index => {
                    playerOnePiecePositions.forEach(p1Position => {
                        if (p1Position.id === 15 && p1Position.tilePosition === index.move) {
                            if (directionIndex.i < index.i) {
                                kingBlockedByOwnPieceDownRight = true
                            }
                        }
                    })
                })
            }
        })
    })

    let kingBlockedByOwnPieceDownLeft
    playerTwoPiecePositions.forEach(position => {
        downAndToLeftIndex.forEach(directionIndex => {
            if (position.tilePosition === directionIndex.move && position.tilePosition !== individualPiece.tilePosition) {
                downAndToLeftIndex.forEach(index => {
                    playerOnePiecePositions.forEach(p1Position => {
                        if (p1Position.id === 15 && p1Position.tilePosition === index.move) {
                            if (directionIndex.i < index.i) {
                                kingBlockedByOwnPieceDownLeft = true
                            }
                        }
                    })
                })
            }
        })
    })

    let kingBlockedByOwnPieceUpLeft
    playerTwoPiecePositions.forEach(position => {
        upAndToLeftIndex.forEach(directionIndex => {
            if (position.tilePosition === directionIndex.move && position.tilePosition !== individualPiece.tilePosition) {
                upAndToLeftIndex.forEach(index => {
                    playerOnePiecePositions.forEach(p1Position => {
                        if (p1Position.id === 15 && p1Position.tilePosition === index.move) {
                            if (directionIndex.i > index.i) {
                                kingBlockedByOwnPieceUpLeft = true
                            }
                        }
                    })
                })
            }
        })
    })

    const blockingDirections = [
        blockingKingUpRight,
        blockingKingDownRight,
        blockingKingDownLeft,
        blockingKingUpLeft
    ]
    const ownPieceBlockingDirection = [
        kingBlockedByOwnPieceUpRight,
        kingBlockedByOwnPieceDownRight,
        kingBlockedByOwnPieceDownLeft,
        kingBlockedByOwnPieceUpLeft
    ]
    const setBlockingKing = (blockingDirection) => {
        if (blockingDirection.length === 1 && ownPieceBlockingDirection.every(e => e === undefined)) {
            blockingDirection.forEach(blocking => {
                blockingKingFromCheck.push(blocking)
            })
        }
    }
    blockingDirections.forEach(direction => {
        setBlockingKing(direction)
    })

    return [returnedMoves, blockingKingFromCheck]
}

export default QueenNewMovesPlayerTwo
