const BishopNewMovesPlayerTwo = (individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions) => {
    let returnedMoves
    let blockingKingFromCheck = []
    let newAvailableMoves = []
    let upAndToRight = []
    let downAndToRight = []
    let downAndToLeft = []
    let upAndToLeft = []

    let kingPosition
    playerOnePiecePositions.forEach(position => {
        if (position.id === 15) {
            kingPosition = position.tilePosition
        }
    })

    let playerTwoTilePositions = []
    let playerOneTilePositions = []
    playerTwoPiecePositions.forEach(position => {
        if (position.id !== individualPiece.id) {
            playerTwoTilePositions.push(position.tilePosition)
        }
    })
    playerOnePiecePositions.forEach(position => {
        playerOneTilePositions.push(position.tilePosition)
    })


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

    let addToAvailableMoves = []
    const checkIfBlockingOwnPiece = () => {
        let checkIfBlockingOwn = []
        playerTwoPiecePositions.forEach(position => {
            newAvailableMoves.forEach(move => {
                if (move === position.tilePosition) {
                    checkIfBlockingOwn.push(move)
                }
            })
        })
        checkIfBlockingOwn.forEach(blocking => {
            const opponentBlockingDirections = (directionIndex, opponentPiecesBlockingDirection) => {
                directionIndex.forEach(index => {
                    if (index.move === blocking) {
                        opponentPiecesBlockingDirection.push(index)
                    }
                })
            }
            opponentBlockingDirections(upAndToRightIndex, ownPiecesBlockingUpRight)
            opponentBlockingDirections(downAndToRightIndex, ownPiecesBlockingDownRight)
            opponentBlockingDirections(downAndToLeftIndex, ownPiecesBlockingDownLeft)
            opponentBlockingDirections(upAndToLeftIndex, ownPiecesBlockingUpLeft)
        })
        const getBlockingDownRight = (ownPiecesBlockingDownRightIndex, directionIndex) => {
            let downRightIndex = []
            ownPiecesBlockingDownRightIndex.forEach(object => {
                if (object.move !== individualPiece.tilePosition) {
                    downRightIndex.push(object.i)
                }
            })
            if (downRightIndex.length > 1) {
                let blocking = false
                ownPiecesBlockingDownRightIndex.forEach(piece => {
                    if (piece.i === Math.min(...downRightIndex)) {
                        directionIndex.forEach(direction => {
                            if (!playerOneTilePositions.some(p1Position => p1Position === direction && p1Position[1] < piece.move[1])) {
                                addToAvailableMoves.push(piece.move)
                            } else {
                                blocking = true
                            }
                        })
                        if (blocking === true) {
                            addToAvailableMoves = []
                        }
                    }
                })
            } else if (downRightIndex.length === 1) {
                let blocking = false
                ownPiecesBlockingDownRightIndex.forEach(piece => {
                    if (piece.move !== individualPiece.tilePosition) {
                        directionIndex.forEach(direction => {
                            if (!playerOneTilePositions.some(p1Position => p1Position === direction && p1Position[1] < piece.move[1])) {
                                addToAvailableMoves.push(piece.move)
                            } else {
                                blocking = true
                            }
                        })
                        if (blocking === true) {
                            addToAvailableMoves = []
                        }
                    }
                })
            } else return
            addToAvailableMoves.forEach(move => {
                directionIndex.forEach(index => {
                    if (index === move) {
                        directionIndex.forEach(downRight => {
                            if (move[1] < downRight[1]) {
                                removeFromAvailableMoves.push(downRight)
                            }
                        })
                    }
                })
            })
        }
        getBlockingDownRight(ownPiecesBlockingDownRight, downAndToRight)

        const getBlockingDownLeft = (ownPiecesBlockingDownRightIndex, directionIndex) => {
            let downLeftIndex = []
            ownPiecesBlockingDownRightIndex.forEach(object => {
                if (object.move !== individualPiece.tilePosition) {
                    downLeftIndex.push(object.i)
                }
            })
            if (downLeftIndex.length > 1) {
                let blocking = false
                ownPiecesBlockingDownRightIndex.forEach(piece => {
                    if (piece.i === Math.min(...downLeftIndex)) {
                        directionIndex.forEach(direction => {
                            if (!playerOneTilePositions.some(p1Position => p1Position === direction && p1Position[1] > piece.move[1])) {
                                addToAvailableMoves.push(piece.move)
                            } else {
                                blocking = true
                            }
                        })
                        if (blocking === true) {
                            addToAvailableMoves = []
                        }
                    }
                })
            } else if (downLeftIndex.length === 1) {
                let blocking = false
                ownPiecesBlockingDownRightIndex.forEach(piece => {
                    if (piece.move !== individualPiece.tilePosition) {
                        directionIndex.forEach(direction => {
                            if (!playerOneTilePositions.some(p1Position => p1Position === direction && p1Position[1] > piece.move[1])) {
                                addToAvailableMoves.push(piece.move)
                            } else {
                                blocking = true
                            }
                        })
                        if (blocking === true) {
                            addToAvailableMoves = []
                        }
                    }
                })
            } else return
            addToAvailableMoves.forEach(move => {
                directionIndex.forEach(index => {
                    if (index === move) {
                        directionIndex.forEach(downLeft => {
                            if (move[1] > downLeft[1]) {
                                removeFromAvailableMoves.push(downLeft)
                            }
                        })
                    }
                })
            })
        }
        getBlockingDownLeft(ownPiecesBlockingDownLeft, downAndToLeft)

        const getBlockingUpRight = (ownPiecesBlockingUpRightIndex, directionIndex) => {
            let upRightIndex = []
            ownPiecesBlockingUpRightIndex.forEach(object => {
                if (object.move !== individualPiece.tilePosition) {
                    upRightIndex.push(object.i)
                }
            })
            if (upRightIndex.length > 1) {
                let blocking = false
                ownPiecesBlockingUpRightIndex.forEach(piece => {
                    if (piece.i === Math.max(...upRightIndex)) {
                        directionIndex.forEach(direction => {
                            if (!playerOneTilePositions.some(p1Position => p1Position === direction && p1Position[1] < piece.move[1])) {
                                addToAvailableMoves.push(piece.move)
                            } else {
                                blocking = true
                            }
                        })
                        if (blocking === true) {
                            addToAvailableMoves = []
                        }
                    }
                })
            } else if (upRightIndex.length === 1) {
                let blocking = false
                ownPiecesBlockingUpRightIndex.forEach(piece => {
                    if (piece.move !== individualPiece.tilePosition) {
                        directionIndex.forEach(direction => {
                            if (!playerOneTilePositions.some(p1Position => p1Position === direction && p1Position[1] < piece.move[1])) {
                                addToAvailableMoves.push(piece.move)
                            } else {
                                blocking = true
                            }
                        })
                        if (blocking === true) {
                            addToAvailableMoves = []
                        }
                    }
                })
            } else return
            addToAvailableMoves.forEach(move => {
                directionIndex.forEach(index => {
                    if (index === move) {
                        directionIndex.forEach(upRight => {
                            if (move[1] < upRight[1]) {
                                removeFromAvailableMoves.push(upRight)
                            }
                        })
                    }
                })
            })
        }
        getBlockingUpRight(ownPiecesBlockingUpRight, upAndToRight)

        const getBlockingUpLeft = (ownPiecesBlockingUpLeftIndex, directionIndex) => {
            let upLeftIndex = []
            ownPiecesBlockingUpLeftIndex.forEach(object => {
                if (object.move !== individualPiece.tilePosition) {
                    upLeftIndex.push(object.i)
                }
            })
            if (upLeftIndex.length > 1) {
                let blocking = false
                ownPiecesBlockingUpLeftIndex.forEach(piece => {
                    if (piece.i === Math.max(...upLeftIndex)) {
                        directionIndex.forEach(direction => {
                            if (!playerOneTilePositions.some(p1Position => p1Position === direction && p1Position[1] > piece.move[1])) {
                                addToAvailableMoves.push(piece.move)
                            } else {
                                blocking = true
                            }
                        })
                        if (blocking === true) {
                            addToAvailableMoves = []
                        }
                    }
                })
            } else if (upLeftIndex.length === 1) {
                let blocking = false
                ownPiecesBlockingUpLeftIndex.forEach(piece => {
                    if (piece.move !== individualPiece.tilePosition) {
                        directionIndex.forEach(direction => {
                            if (!playerOneTilePositions.some(p1Position => p1Position === direction && p1Position[1] > piece.move[1])) {
                                addToAvailableMoves.push(piece.move)
                            } else {
                                blocking = true
                            }
                        })
                        if (blocking === true) {
                            addToAvailableMoves = []
                        }
                    }
                })
            } else return
            addToAvailableMoves.forEach(move => {
                directionIndex.forEach(index => {
                    if (index === move) {
                        directionIndex.forEach(upLeft => {
                            if (move[1] > upLeft[1]) {
                                removeFromAvailableMoves.push(upLeft)
                            }
                        })
                    }
                })
            })
        }
        getBlockingUpLeft(ownPiecesBlockingUpLeft, upAndToLeft)
    }
    checkIfBlockingOwnPiece()

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
            return ownPiecesBlockingDirection.map(piece => {
                addToAvailableMoves.forEach(move => {
                    if (move !== piece.move) {
                        return piece.i
                    }
                })
            })
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
        const getOwnBlockingIndexUp = () => {
            return ownPiecesBlockingDirection.map(piece => {
                addToAvailableMoves.forEach(move => {
                    if (move !== piece.move) {
                        return piece.i
                    }
                })
            })
        }
        const getMaxIndexUp = () => {
            return Math.max(...getOwnBlockingIndexUp())
        }
        let ownPieceBlockingDirection
        ownPiecesBlockingDirection.forEach(piece => {
            if (piece.i === getMaxIndexUp()) {
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
            return opponentPiecesBlockingDirection.map(piece => {
                if (piece.move !== individualPiece.tilePosition) {
                    return piece.i
                }
            })
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
        if (!removeFromAvailableMoves.includes(move)) {
            return move
        }
    })
    addToAvailableMoves.forEach(move => {
        newAvailableMoves.push(move)
    })
    newAvailableMoves.forEach(move => {
        if (typeof move !== 'string') {
            removeFromAvailableMoves.push(move)
        }
    })
    newAvailableMoves = newAvailableMoves.filter(move => {
        if (!move.includes('-')) {
            return move
        }
    })
    newAvailableMoves = newAvailableMoves.filter(move => {
        if (!move.includes('0')) {
            return move
        }
    })
    newAvailableMoves = Array.from(new Set(newAvailableMoves))
    returnedMoves = { piece: 'Bishop 2', currentPosition: individualPiece.tilePosition, id: individualPiece.id, newAvailableMoves }

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


    let tilesBetweenKingAndAttacker = []
    let attackingPiecesPositionsDiagonal
    const getTilesBetweenKingAndOpponentDiagonal = () => {
        let kingPosition
        playerOnePiecePositions.forEach(position => {
            if (position.id === 15) {
                kingPosition = position.tilePosition
            }
        })

        let playerTwoTilePositions = []
        let playerOneTilePositions = []
        playerTwoPiecePositions.forEach(position => {
            if (position.id !== individualPiece.id) {
                playerTwoTilePositions.push(position.tilePosition)
            }
        })
        playerOnePiecePositions.forEach(position => {
            playerOneTilePositions.push(position.tilePosition)
        })


        if (upAndToRight.some(move => move === kingPosition)) {
            upAndToRight.forEach(position => {
                if (position[1] <= kingPosition[1]) {
                    tilesBetweenKingAndAttacker.push(position)
                }
            })
        }
        if (upAndToLeft.some(move => move === kingPosition)) {
            upAndToLeft.forEach(position => {
                if (position[1] >= kingPosition[1]) {
                    tilesBetweenKingAndAttacker.push(position)
                }
            })
        }
        if (downAndToRight.some(move => move === kingPosition)) {
            downAndToRight.forEach(position => {
                if (position[1] <= kingPosition[1]) {
                    tilesBetweenKingAndAttacker.push(position)
                }
            })
        }
        if (downAndToLeft.some(move => move === kingPosition)) {
            downAndToLeft.forEach(position => {
                if (position[1] >= kingPosition[1]) {
                    tilesBetweenKingAndAttacker.push(position)
                }
            })
        }

        let opponentsPiecesBetween = []
        tilesBetweenKingAndAttacker.forEach(position => {
            if (playerTwoTilePositions.includes(position)) {
                tilesBetweenKingAndAttacker = []
            }
            playerOnePiecePositions.forEach(p1Positions => {
                if (p1Positions.tilePosition === position) {
                    opponentsPiecesBetween.push(p1Positions.tilePosition)
                }
            })
        })

        if (opponentsPiecesBetween.length > 2) {
            tilesBetweenKingAndAttacker = []
        }
        tilesBetweenKingAndAttacker = tilesBetweenKingAndAttacker.filter(position => {
            if (position !== kingPosition) {
                return position
            }
        })
        if (tilesBetweenKingAndAttacker.length !== 0) {
            attackingPiecesPositionsDiagonal = ({
                attackerId: individualPiece.id,
                attackerPosition: individualPiece.tilePosition,
                attackingPositions: tilesBetweenKingAndAttacker
            })
        }
    }
    getTilesBetweenKingAndOpponentDiagonal()


    let ownBlockingKingFromCheck = []
    const ownBlockingKingFromCheckDiagonal = () => {
        let BlockingKingUpRight = []
        let BlockingKingDownRight = []
        let BlockingKingDownLeft = []
        let BlockingKingUpLeft = []
        const checkDirectionForBlockingDiagonalRight = (direction, blockingDirection) => {
            if (direction.some(position => position === kingPosition)) {
                playerOneTilePositions.forEach(tilePosition => {
                    if (direction.some(position => position === tilePosition && position !== kingPosition)) {
                        if (tilePosition[1] < kingPosition[1]) {
                            blockingDirection.push(tilePosition)
                        }
                    }
                })
            }
            playerTwoTilePositions.forEach(p2TilePosition => {
                direction.forEach(move => {
                    if (move === p2TilePosition && p2TilePosition[1] < kingPosition[1] && p2TilePosition[1] > individualPiece.tilePosition[1]) {
                        blockingDirection.pop()
                    }
                })
            })
        }
        const checkDirectionForBlockingDiagonalLeft = (direction, blockingDirection) => {
            if (direction.some(position => position === kingPosition)) {
                playerOneTilePositions.forEach(tilePosition => {
                    if (direction.some(position => position === tilePosition && position !== kingPosition)) {
                        if (tilePosition[1] > kingPosition[1]) {
                            blockingDirection.push(tilePosition)
                        }
                    }
                })
            }
            playerTwoTilePositions.forEach(p2TilePosition => {
                direction.forEach(move => {
                    if (move === p2TilePosition && p2TilePosition[1] > kingPosition[1] && p2TilePosition[1] < individualPiece.tilePosition[1]) {
                        blockingDirection.pop()
                    }
                })
            })
        }
        checkDirectionForBlockingDiagonalRight(upAndToRight, BlockingKingUpRight)
        checkDirectionForBlockingDiagonalRight(downAndToRight, BlockingKingDownRight)
        checkDirectionForBlockingDiagonalLeft(upAndToLeft, BlockingKingUpLeft)
        checkDirectionForBlockingDiagonalLeft(downAndToLeft, BlockingKingDownLeft)

        const getBlockingDirectionOrthogonal = (blockingDirection) => {
            if (blockingDirection.length === 1) {
                blockingDirection.forEach(piece => {
                    ownBlockingKingFromCheck.push(piece)
                })
            }
        }
        const blockingArrayOrthogonal = [
            BlockingKingUpRight,
            BlockingKingDownRight,
            BlockingKingDownLeft,
            BlockingKingUpLeft
        ]
        blockingArrayOrthogonal.forEach(direction => {
            getBlockingDirectionOrthogonal(direction)
        })
    }
    ownBlockingKingFromCheckDiagonal()

    return [returnedMoves, blockingKingFromCheck, tilesBetweenKingAndAttacker, attackingPiecesPositionsDiagonal, ownBlockingKingFromCheck]
}

export default BishopNewMovesPlayerTwo
