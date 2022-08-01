const BishopNewMovesPlayerOne = (individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions) => {
    let returnedMoves
    let blockingKingFromCheck = []
    let newAvailableMoves = []
    let upAndToRight = []
    let downAndToRight = []
    let downAndToLeft = []
    let upAndToLeft = []


    let playerOneTilePositions = []
    let playerTwoTilePositions = []
    playerOnePiecePositions.forEach(position => {
        if (position.id !== individualPiece.id) {
            playerOneTilePositions.push(position.tilePosition)
        }
    })
    playerTwoPiecePositions.forEach(position => {
        playerTwoTilePositions.push(position.tilePosition)
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
    playerOnePiecePositions.forEach(position => {
        newAvailableMoves.forEach(move => {
            if (position.tilePosition === move) {
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
    const checkIfBlockingOwnPiecesDiagonal = () => {
        let checkIfBlockingOwn = []
        playerOnePiecePositions.forEach(position => {
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
                            if (!playerTwoTilePositions.some(p1Position => p1Position === direction && p1Position[1] < piece.move[1])) {
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
                            if (!playerTwoTilePositions.some(p1Position => p1Position === direction && p1Position[1] < piece.move[1])) {
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
                            if (!playerTwoTilePositions.some(p1Position => p1Position === direction && p1Position[1] > piece.move[1])) {
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
                            if (!playerTwoTilePositions.some(p1Position => p1Position === direction && p1Position[1] > piece.move[1])) {
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
                            if (!playerTwoTilePositions.some(p1Position => p1Position === direction && p1Position[1] < piece.move[1])) {
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
                            if (!playerTwoTilePositions.some(p1Position => p1Position === direction && p1Position[1] < piece.move[1])) {
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
                            if (!playerTwoTilePositions.some(p1Position => p1Position === direction && p1Position[1] > piece.move[1])) {
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
                            if (!playerTwoTilePositions.some(p1Position => p1Position === direction && p1Position[1] > piece.move[1])) {
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
    checkIfBlockingOwnPiecesDiagonal()


    let checkIfBlockingOpponent = []
    playerTwoPiecePositions.forEach(position => {
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

    let kingPosition
    playerTwoPiecePositions.forEach(position => {
        if (position.id === 31) {
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
                playerTwoPiecePositions.forEach(position => {
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
                playerTwoPiecePositions.forEach(position => {
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
    playerOnePiecePositions.forEach(position => {
        upAndToRightIndex.forEach(directionIndex => {
            if (position.tilePosition === directionIndex.move && position.tilePosition !== individualPiece.tilePosition) {
                upAndToRightIndex.forEach(index => {
                    playerTwoPiecePositions.forEach(p2Position => {
                        if (p2Position.id === 31 && p2Position.tilePosition === index.move) {
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
    playerOnePiecePositions.forEach(position => {
        downAndToRightIndex.forEach(directionIndex => {
            if (position.tilePosition === directionIndex.move && position.tilePosition !== individualPiece.tilePosition) {
                downAndToRightIndex.forEach(index => {
                    playerTwoPiecePositions.forEach(p2Position => {
                        if (p2Position.id === 31 && p2Position.tilePosition === index.move) {
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
    playerOnePiecePositions.forEach(position => {
        downAndToLeftIndex.forEach(directionIndex => {
            if (position.tilePosition === directionIndex.move && position.tilePosition !== individualPiece.tilePosition) {
                downAndToLeftIndex.forEach(index => {
                    playerTwoPiecePositions.forEach(p2Position => {
                        if (p2Position.id === 31 && p2Position.tilePosition === index.move) {
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
    playerOnePiecePositions.forEach(position => {
        upAndToLeftIndex.forEach(directionIndex => {
            if (position.tilePosition === directionIndex.move && position.tilePosition !== individualPiece.tilePosition) {
                upAndToLeftIndex.forEach(index => {
                    playerTwoPiecePositions.forEach(p2Position => {
                        if (p2Position.id === 31 && p2Position.tilePosition === index.move) {
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

    newAvailableMoves.forEach(move => {
        if (typeof move !== 'string') {
            removeFromAvailableMoves.push(move)
        }
    })
    newAvailableMoves = newAvailableMoves.filter(move => {
        if (!removeFromAvailableMoves.includes(move)) {
            return move
        }
    })
    newAvailableMoves = Array.from(new Set(newAvailableMoves))
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
    addToAvailableMoves.forEach(move => {
        newAvailableMoves.push(move)
    })

    returnedMoves = { piece: 'Bishop 2', currentPosition: individualPiece.tilePosition, id: individualPiece.id, newAvailableMoves }


    let checkingOpponent = []
    newAvailableMoves.forEach(move => {
        playerTwoPiecePositions.forEach(position => {
            if (position.tilePosition === move && position.id === 31) {
                checkingOpponent.push(individualPiece)
            }
        })
    })


    let tilesBetweenKingAndAttacker = []
    const rightTilesBetween = (vertRight) => {
        if (vertRight.includes(kingPosition)) {
            vertRight.forEach(position => {
                if (position[1] < kingPosition[1]) {
                    tilesBetweenKingAndAttacker.push(position)
                }
            })
            tilesBetweenKingAndAttacker.forEach(position => {
                if (playerOneTilePositions.includes(position) || playerTwoTilePositions.includes(position)) {
                    tilesBetweenKingAndAttacker = []
                }
            })
        }
    }
    const leftTilesBetween = (vertRight) => {
        if (vertRight.includes(kingPosition)) {
            vertRight.forEach(position => {
                if (position[1] > kingPosition[1]) {
                    tilesBetweenKingAndAttacker.push(position)
                }
            })
            tilesBetweenKingAndAttacker.forEach(position => {
                if (playerOneTilePositions.includes(position) || playerTwoTilePositions.includes(position) && individualPiece.tilePosition !== position) {
                    tilesBetweenKingAndAttacker = []
                }
            })
        }
    }
    rightTilesBetween(upAndToRight)
    rightTilesBetween(downAndToRight)
    leftTilesBetween(upAndToLeft)
    leftTilesBetween(downAndToLeft)

    let checkingPositions = []
    if (upAndToLeft.some(position => position === kingPosition)) {
        upAndToLeft.forEach(position => {
            if (position[1] > kingPosition[1]) {
                checkingPositions.push(position)
            }
        })
    }
    if (upAndToRight.some(position => position === kingPosition)) {
        upAndToRight.forEach(position => {
            if (position[1] < kingPosition[1]) {
                checkingPositions.push(position)
            }
        })
    }
    if (downAndToRight.some(position => position === kingPosition)) {
        downAndToRight.forEach(position => {
            if (position[1] < kingPosition[1]) {
                checkingPositions.push(position)
            }
        })
    }
    if (downAndToLeft.some(position => position === kingPosition)) {
        downAndToLeft.forEach(position => {
            if (position[1] > kingPosition[1]) {
                checkingPositions.push(position)
            }
        })
    }


    let attackingPiecesPositionsDiagonal
    const getPiecesBetweenKingAndOpponentDiagonal = () => {
        let kingPosition
        playerTwoPiecePositions.forEach(position => {
            if (position.id === 31) {
                kingPosition = position.tilePosition
            }
        })

        let tilesBetweenKingAndAttacker = []
        let playerOneTilePositions = []
        let playerTwoTilePositions = []
        playerOnePiecePositions.forEach(position => {
            if (position.id !== individualPiece.id) {
                playerOneTilePositions.push(position.tilePosition)
            }
        })
        playerTwoPiecePositions.forEach(position => {
            playerTwoTilePositions.push(position.tilePosition)
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
            if (playerOneTilePositions.includes(position)) {
                tilesBetweenKingAndAttacker = []
            }
            playerTwoPiecePositions.forEach(p2Positions => {
                if (p2Positions.tilePosition === position) {
                    opponentsPiecesBetween.push(p2Positions.tilePosition)
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
    getPiecesBetweenKingAndOpponentDiagonal()


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

export default BishopNewMovesPlayerOne
