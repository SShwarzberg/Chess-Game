const QueenNewMovesPlayerOne = (individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions) => {
    let returnedMoves
    let blockingKingFromCheck = []
    let newAvailableMoves = []
    let removeFromAvailableMoves = []
    let horizontalMoves = []
    let verticalMoves = []


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
            boardLetters.forEach((letters, i) => (
                horizontalMoves.push(letter + [i + 1])
            ))
        }
        if (individualPiece.tilePosition.includes(i + 1)) {
            boardLetters.forEach(letters => (
                verticalMoves.push(letters + [i + 1])
            ))
        }
        if (parseInt(individualPiece.tilePosition[1]) === 8) {
            boardLetters.forEach(letters => {
                if (i + 1 === 8) {
                    newAvailableMoves.push(letters + (i + 1))
                }
            })
        }
    })

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

    playerOnePiecePositions.forEach(position => {
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


    let newAvailableMovesIndexVertical = []
    let newAvailableMovesIndexHorizontal = []
    let addToAvailableMovesRightAngle = []
    const ownBlockingPieces = () => {
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

        newAvailableMoves.map(move => {
            boardLetters.forEach((letter, i) => {
                if (move[0] === letter && individualPiece.tilePosition[1] === move[1]) {
                    newAvailableMovesIndexVertical.push({ move, i: i + 1 })
                }
                if (parseInt(move[1]) === (i + 1) && individualPiece.tilePosition[0] === move[0]) {
                    newAvailableMovesIndexHorizontal.push({ move, i: i + 1 })
                }
            })
        })


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

        const ownBlockingRight = () => {
            let addRight = []
            const indexBlockingRight = ownPieceBlockingRight.map(piece => {
                return piece.i
            })
            const getMinBlockingRight = Math.min(...indexBlockingRight)
            let pieceBlocking = false
            newAvailableMovesIndexHorizontal.forEach(nextMove => {
                if (nextMove.i === getMinBlockingRight) {
                    addRight.push(nextMove.move)
                    horizontalMoves.forEach(horizMove => {
                        if (horizMove[1] > individualPiece.tilePosition[1]) {
                            if (playerTwoTilePositions.some(position => position === horizMove)) {
                                if (horizMove[1] < nextMove.move[1]) {
                                    pieceBlocking = true
                                }
                            }
                        }
                    })
                }
                if (nextMove.move[0] === individualPiece.tilePosition[0] && nextMove.move[1] > getMinBlockingRight) {
                    removeFromAvailableMoves.push(nextMove.move)
                }
            })
            if (pieceBlocking === true) {
                addRight = []
            }
            addRight.forEach(item => {
                addToAvailableMovesRightAngle.push(item)
            })
        }
        ownBlockingRight()

        const ownBlockingLeft = () => {
            let addLeft = []
            const indexBlockingLeft = ownPieceBlockingLeft.map(piece => {
                return piece.i
            })
            const getMaxBlockingLeft = Math.max(...indexBlockingLeft)
            let pieceBlocking = false
            newAvailableMovesIndexHorizontal.forEach(nextMove => {
                if (nextMove.i === getMaxBlockingLeft) {
                    addLeft.push(nextMove.move)
                    horizontalMoves.forEach(horizMove => {
                        if (horizMove[1] < individualPiece.tilePosition[1]) {
                            if (playerTwoTilePositions.some(position => position === horizMove)) {
                                if (horizMove[1] > nextMove.move[1]) {
                                    pieceBlocking = true
                                }
                            }
                        }
                    })
                }
                if (nextMove.move[0] === individualPiece.tilePosition[0] && nextMove.move[1] < getMaxBlockingLeft) {
                    removeFromAvailableMoves.push(nextMove.move)
                }
            })
            if (pieceBlocking === true) {
                addLeft = []
            }
            addLeft.forEach(item => {
                addToAvailableMovesRightAngle.push(item)
            })
        }
        ownBlockingLeft()

        const ownBlockingUp = () => {
            let addUp = []
            const indexBlockingUp = ownPieceBlockingUp.map(piece => {
                return piece.i
            })
            const getMaxBlockingUp = Math.max(...indexBlockingUp)
            let pieceBlocking = false
            newAvailableMovesIndexVertical.forEach(vertMove => {
                if (vertMove.i === getMaxBlockingUp) {
                    addUp.push(vertMove.move)
                    verticalMoves.forEach(move => {
                        if (move[0] < individualPiece.tilePosition[0]) {
                            if (playerTwoTilePositions.some(position => position === move)) {
                                if (move[0] > vertMove.move[0]) {
                                    pieceBlocking = true
                                }
                            }
                        }
                    })
                }
                if (vertMove.i < getMaxBlockingUp && Number.isFinite(getMaxBlockingUp) && vertMove.i < individualPieceIndex) {
                    removeFromAvailableMoves.push(vertMove.move)
                }
            })
            if (pieceBlocking === true) {
                addUp = []
            }
            addUp.forEach(item => {
                addToAvailableMovesRightAngle.push(item)
            })
        }
        ownBlockingUp()

        const ownBlockingDown = () => {
            let addDown = []
            const indexBlockingDown = ownPieceBlockingDown.map(piece => {
                return piece.i
            })
            const getMinBlockingDown = Math.min(...indexBlockingDown)
            let pieceBlocking = false
            newAvailableMovesIndexVertical.forEach(vertMove => {
                if (vertMove.i === getMinBlockingDown) {
                    addDown.push(vertMove.move)
                    verticalMoves.forEach(move => {
                        if (move[0] > individualPiece.tilePosition[0]) {
                            if (playerTwoTilePositions.some(position => position === move)) {
                                if (move[0] < vertMove.move[0]) {
                                    pieceBlocking = true
                                }
                            }
                        }
                    })
                }
                if (vertMove.i > getMinBlockingDown && Number.isFinite(getMinBlockingDown) && vertMove.i > individualPieceIndex) {
                    removeFromAvailableMoves.push(vertMove.move)
                }
            })
            if (pieceBlocking === true) {
                addDown = []
            }
            addDown.forEach(item => {
                addToAvailableMovesRightAngle.push(item)
            })
        }
        ownBlockingDown()
    }
    ownBlockingPieces()

    // opponents pieces blocking
    let opponentPieceBlockingOrthogonal = []
    playerTwoPiecePositions.forEach(position => {
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
    playerOnePiecePositions.forEach(position => {
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
        }
        getBlockingUpLeft(ownPiecesBlockingUpLeft, upAndToLeft)
    }
    checkIfBlockingOwnPiecesDiagonal()

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
        const getOwnBlockingIndexUpLeft = () => {
            return ownPiecesBlockingDirection.map(piece => {
                addToAvailableMoves.forEach(move => {
                    if (move !== piece.move) {
                        return piece.i
                    }
                })
            })
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

    newAvailableMoves = newAvailableMoves.filter(move => {
        return !removeFromAvailableMoves.includes(move) ? move : null
    })
    newAvailableMoves = newAvailableMoves.filter(move => {
        return move !== individualPiece.tilePosition ? move : null
    })
    addToAvailableMoves.forEach(move => {
        newAvailableMoves.push(move)
    })
    addToAvailableMovesRightAngle.forEach(move => {
        newAvailableMoves.push(move)
    })
    returnedMoves = { piece: 'Queen 2', id: individualPiece.id, newAvailableMoves }

    let kingPosition
    playerTwoPiecePositions.forEach(position => {
        if (position.id === 31) {
            kingPosition = position.tilePosition
        }
    })

    let tilesBetweenKingAndAttacker = []
    let tilesBetweenKingAndAttackerOrthogonal = []
    const orthogonalTilePositionsBetweenKingAndAttacker = () => {
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

        const rightTilesBetween = (vertRight) => {
            if (vertRight.includes(kingPosition)) {
                vertRight.forEach(position => {
                    if (position[1] < kingPosition[1]) {
                        tilesBetweenKingAndAttackerOrthogonal.push(position)
                    }
                })
                tilesBetweenKingAndAttackerOrthogonal.forEach(position => {
                    if (playerOneTilePositions.includes(position) || playerTwoTilePositions.includes(position)) {
                        tilesBetweenKingAndAttackerOrthogonal = []
                    }
                })
            }
        }
        const leftTilesBetween = (vertRight) => {
            if (vertRight.includes(kingPosition)) {
                vertRight.forEach(position => {
                    if (position[1] > kingPosition[1]) {
                        tilesBetweenKingAndAttackerOrthogonal.push(position)
                    }
                })
                tilesBetweenKingAndAttackerOrthogonal.forEach(position => {
                    if (playerOneTilePositions.includes(position) || playerTwoTilePositions.includes(position)) {
                        tilesBetweenKingAndAttackerOrthogonal = []
                    }
                })
            }
        }
        rightTilesBetween(upAndToRight)
        rightTilesBetween(downAndToRight)
        leftTilesBetween(upAndToLeft)
        leftTilesBetween(downAndToLeft)
    }
    orthogonalTilePositionsBetweenKingAndAttacker()
    if (tilesBetweenKingAndAttackerOrthogonal.length > 0) {
        tilesBetweenKingAndAttackerOrthogonal.forEach(move => {
            tilesBetweenKingAndAttacker.push(move)
        })
    }
    let tilesBetweenKingAndAttackerDiagonal = []
    const diagonalTilePositionsBetweenKingAndAttacker = () => {
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

        let underCurrentPiece = []
        let overCurrentPiece = []
        let rightOfCurrentPiece = []
        let leftOfCurrentPiece = []

        verticalMoves.forEach(move => {
            if (move[0] >= individualPiece.tilePosition[0]) {
                underCurrentPiece.push(move)
            }
        })
        verticalMoves.forEach(move => {
            if (move[0] <= individualPiece.tilePosition[0]) {
                overCurrentPiece.push(move)
            }
        })
        horizontalMoves.forEach(move => {
            if (move[1] >= individualPiece.tilePosition[1]) {
                rightOfCurrentPiece.push(move)
            }
        })
        horizontalMoves.forEach(move => {
            if (move[1] <= individualPiece.tilePosition[1]) {
                leftOfCurrentPiece.push(move)
            }
        })

        if (underCurrentPiece.some(piece => piece === kingPosition)) {
            underCurrentPiece.forEach(position => {
                if (position[0] < kingPosition[0]) {
                    tilesBetweenKingAndAttackerDiagonal.push(position)
                }
            })
        }
        if (overCurrentPiece.some(piece => piece === kingPosition)) {
            overCurrentPiece.forEach(position => {
                if (position[0] > kingPosition[0]) {
                    tilesBetweenKingAndAttackerDiagonal.push(position)
                }
            })
        }
        if (rightOfCurrentPiece.some(piece => piece === kingPosition)) {
            rightOfCurrentPiece.forEach(position => {
                if (position[1] < kingPosition[1]) {
                    tilesBetweenKingAndAttackerDiagonal.push(position)
                }
            })
        }
        if (leftOfCurrentPiece.some(piece => piece === kingPosition)) {
            leftOfCurrentPiece.forEach(position => {
                if (position[1] > kingPosition[1]) {
                    tilesBetweenKingAndAttackerDiagonal.push(position)
                }
            })
        }
        tilesBetweenKingAndAttackerDiagonal.forEach(position => {
            if (playerOneTilePositions.includes(position) || playerTwoTilePositions.includes(position)) {
                tilesBetweenKingAndAttackerDiagonal = []
            }
        })
    }
    diagonalTilePositionsBetweenKingAndAttacker()
    if (tilesBetweenKingAndAttackerDiagonal.length > 0) {
        tilesBetweenKingAndAttackerDiagonal.forEach(move => {
            tilesBetweenKingAndAttacker.push(move)
        })
    }

    let attackingPiecesPositionsPerpendicular
    const getPiecesBetweenKingAndOpponentPerpendicular = () => {
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

        let underCurrentPiece = []
        let overCurrentPiece = []
        let rightOfCurrentPiece = []
        let leftOfCurrentPiece = []

        verticalMoves.forEach(move => {
            if (move[0] >= individualPiece.tilePosition[0]) {
                underCurrentPiece.push(move)
            }
        })
        verticalMoves.forEach(move => {
            if (move[0] <= individualPiece.tilePosition[0]) {
                overCurrentPiece.push(move)
            }
        })
        horizontalMoves.forEach(move => {
            if (move[1] >= individualPiece.tilePosition[1]) {
                rightOfCurrentPiece.push(move)
            }
        })
        horizontalMoves.forEach(move => {
            if (move[1] <= individualPiece.tilePosition[1]) {
                leftOfCurrentPiece.push(move)
            }
        })

        if (underCurrentPiece.some(piece => piece === kingPosition)) {
            underCurrentPiece.forEach(position => {
                if (position[0] < kingPosition[0]) {
                    tilesBetweenKingAndAttacker.push(position)
                }
            })
        }
        if (overCurrentPiece.some(piece => piece === kingPosition)) {
            overCurrentPiece.forEach(position => {
                if (position[0] > kingPosition[0]) {
                    tilesBetweenKingAndAttacker.push(position)
                }
            })
        }
        if (rightOfCurrentPiece.some(piece => piece === kingPosition)) {
            rightOfCurrentPiece.forEach(position => {
                if (position[1] < kingPosition[1]) {
                    tilesBetweenKingAndAttacker.push(position)
                }
            })
        }
        if (leftOfCurrentPiece.some(piece => piece === kingPosition)) {
            leftOfCurrentPiece.forEach(position => {
                if (position[1] > kingPosition[1]) {
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
        if (opponentsPiecesBetween.length > 1) {
            tilesBetweenKingAndAttacker = []
        }
        attackingPiecesPositionsPerpendicular = ({
            attackerId: individualPiece.id,
            attackerPosition: individualPiece.tilePosition,
            attackingPositions: tilesBetweenKingAndAttacker
        })
    }
    getPiecesBetweenKingAndOpponentPerpendicular()

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

        if (opponentsPiecesBetween.length !== 2) {
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

    const blockingKingFromCheckFunc = () => {
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


        let BlockingKingUpRight = []
        let BlockingKingDownRight = []
        let BlockingKingDownLeft = []
        let BlockingKingUpLeft = []
        const checkDirectionForBlockingDiagonalRight = (direction, blockingDirection) => {
            if (direction.some(position => position === kingPosition)) {
                playerTwoTilePositions.forEach(tilePosition => {
                    if (direction.some(position => position === tilePosition && position !== kingPosition)) {
                        if (direction.some(position => position[1] < kingPosition[1])) {
                            if (tilePosition[1] < kingPosition[1]) {
                                blockingDirection.push(tilePosition)
                            }
                        }

                    }
                })
            }
        }
        const checkDirectionForBlockingDiagonalLeft = (direction, blockingDirection) => {
            if (direction.some(position => position === kingPosition)) {
                playerTwoTilePositions.forEach(tilePosition => {
                    if (direction.some(position => position === tilePosition && position !== kingPosition)) {
                        if (direction.some(position => position[1] > kingPosition[1])) {
                            if (tilePosition[1] > kingPosition[1]) {
                                blockingDirection.push(tilePosition)
                            }
                        }
                    }
                })
            }
        }
        checkDirectionForBlockingDiagonalRight(upAndToRight, BlockingKingUpRight)
        checkDirectionForBlockingDiagonalRight(downAndToRight, BlockingKingDownRight)
        checkDirectionForBlockingDiagonalLeft(upAndToLeft, BlockingKingUpLeft)
        checkDirectionForBlockingDiagonalLeft(downAndToLeft, BlockingKingDownLeft)


        const getBlockingDirectionOrthogonal = (blockingDirection) => {
            if (blockingDirection.length === 1) {
                blockingDirection.forEach(piece => {
                    blockingKingFromCheck.push(piece)
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



        let underCurrentPiece = []
        let overCurrentPiece = []
        let rightOfCurrentPiece = []
        let leftOfCurrentPiece = []

        verticalMoves.forEach(move => {
            if (move[0] >= individualPiece.tilePosition[0]) {
                underCurrentPiece.push(move)
            }
        })
        verticalMoves.forEach(move => {
            if (move[0] <= individualPiece.tilePosition[0]) {
                overCurrentPiece.push(move)
            }
        })
        horizontalMoves.forEach(move => {
            if (move[1] >= individualPiece.tilePosition[1]) {
                rightOfCurrentPiece.push(move)
            }
        })
        horizontalMoves.forEach(move => {
            if (move[1] <= individualPiece.tilePosition[1]) {
                leftOfCurrentPiece.push(move)
            }
        })

        let blockingKingUp = []
        let blockingKingDown = []
        let blockingKingRight = []
        let blockingKingLeft = []

        if (overCurrentPiece.some(position => position === kingPosition)) {
            playerTwoTilePositions.forEach(p2Position => {
                overCurrentPiece.forEach(position => {
                    if (p2Position === position && p2Position !== kingPosition && position[0] > kingPosition[0]) {
                        blockingKingUp.push(position)
                    }
                    if (playerOneTilePositions.includes(position) && position[0] > kingPosition[0]) {
                        blockingKingUp = []
                    }
                })
            })
        }
        if (underCurrentPiece.some(position => position === kingPosition)) {
            playerTwoTilePositions.forEach(p2Position => {
                underCurrentPiece.forEach(position => {
                    if (p2Position === position && p2Position !== kingPosition && position[0] < kingPosition[0]) {
                        blockingKingDown.push(position)
                    }
                    if (playerOneTilePositions.includes(position) && position[0] < kingPosition[0]) {
                        blockingKingDown = []
                    }
                })
            })
        }
        if (rightOfCurrentPiece.some(position => position === kingPosition)) {
            playerTwoTilePositions.forEach(p2Position => {
                rightOfCurrentPiece.forEach(position => {
                    if (p2Position === position && p2Position !== kingPosition && position[1] < kingPosition[1]) {
                        blockingKingRight.push(position)
                    }
                    if (playerOneTilePositions.includes(position) && position[1] < kingPosition[1]) {
                        blockingKingRight = []
                    }
                })
            })
        }
        if (leftOfCurrentPiece.some(position => position === kingPosition)) {
            playerTwoTilePositions.forEach(p2Position => {
                leftOfCurrentPiece.forEach(position => {
                    if (p2Position === position && p2Position !== kingPosition && position[1] > kingPosition[1]) {
                        blockingKingLeft.push(position)
                    }
                    if (playerOneTilePositions.includes(position) && position[1] > kingPosition[1]) {
                        blockingKingLeft = []
                    }
                })
            })
        }


        const blockingArrayDiagonal = [
            blockingKingUp,
            blockingKingDown,
            blockingKingRight,
            blockingKingLeft
        ]

        const getBlockingDirectionDiagonal = (blockingDirection) => {
            if (blockingDirection.length === 1) {
                blockingDirection.forEach(piece => {
                    blockingKingFromCheck.push(piece)
                })
            }
        }
        blockingArrayDiagonal.forEach(direction => {
            getBlockingDirectionDiagonal(direction)
        })

    }
    blockingKingFromCheckFunc()



    let ownBlockingKingFromCheck = []
    const ownBlockingKingFromCheckFuncHorizVert = () => {

        let underCurrentPiece = []
        let overCurrentPiece = []
        let rightOfCurrentPiece = []
        let leftOfCurrentPiece = []

        verticalMoves.forEach(move => {
            if (move[0] >= individualPiece.tilePosition[0]) {
                underCurrentPiece.push(move)
            }
        })
        verticalMoves.forEach(move => {
            if (move[0] <= individualPiece.tilePosition[0]) {
                overCurrentPiece.push(move)
            }
        })
        horizontalMoves.forEach(move => {
            if (move[1] >= individualPiece.tilePosition[1]) {
                rightOfCurrentPiece.push(move)
            }
        })
        horizontalMoves.forEach(move => {
            if (move[1] <= individualPiece.tilePosition[1]) {
                leftOfCurrentPiece.push(move)
            }
        })

        let blockingKingUp = []
        let blockingKingDown = []
        let blockingKingRight = []
        let blockingKingLeft = []

        if (overCurrentPiece.some(position => position === kingPosition)) {
            playerOneTilePositions.forEach(p2Position => {
                overCurrentPiece.forEach(position => {
                    if (p2Position === position && p2Position !== kingPosition && position[0] > kingPosition[0]) {
                        blockingKingUp.push(position)
                    }
                    if (playerTwoTilePositions.includes(position) && position[0] > kingPosition[0]) {
                        blockingKingUp = []
                    }
                })
            })
        }
        if (underCurrentPiece.some(position => position === kingPosition)) {
            playerOneTilePositions.forEach(p2Position => {
                underCurrentPiece.forEach(position => {
                    if (p2Position === position && p2Position !== kingPosition && position[0] < kingPosition[0]) {
                        blockingKingDown.push(position)
                    }
                    if (playerTwoTilePositions.includes(position) && position[0] < kingPosition[0]) {
                        blockingKingDown = []
                    }
                })
            })
        }
        if (rightOfCurrentPiece.some(position => position === kingPosition)) {
            playerOneTilePositions.forEach(p2Position => {
                rightOfCurrentPiece.forEach(position => {
                    if (p2Position === position && p2Position !== kingPosition && position[1] < kingPosition[1]) {
                        blockingKingRight.push(position)
                    }
                    if (playerTwoTilePositions.includes(position) && position[1] < kingPosition[1]) {
                        blockingKingRight = []
                    }
                })
            })
        }
        if (leftOfCurrentPiece.some(position => position === kingPosition)) {
            playerOneTilePositions.forEach(p2Position => {
                leftOfCurrentPiece.forEach(position => {
                    if (p2Position === position && p2Position !== kingPosition && position[1] > kingPosition[1]) {
                        blockingKingLeft.push(position)
                    }
                    if (playerTwoTilePositions.includes(position) && position[1] > kingPosition[1]) {
                        blockingKingLeft = []
                    }
                })
            })
        }


        const blockingArrayDiagonal = [
            blockingKingUp,
            blockingKingDown,
            blockingKingRight,
            blockingKingLeft
        ]

        const getBlockingDirectionDiagonal = (blockingDirection) => {
            if (blockingDirection.length === 1) {
                blockingDirection.forEach(piece => {
                    ownBlockingKingFromCheck.push(piece)
                })
            }
        }
        blockingArrayDiagonal.forEach(direction => {
            getBlockingDirectionDiagonal(direction)
        })
    }
    ownBlockingKingFromCheckFuncHorizVert()

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

    return [returnedMoves, blockingKingFromCheck, tilesBetweenKingAndAttacker, attackingPiecesPositionsPerpendicular, attackingPiecesPositionsDiagonal, ownBlockingKingFromCheck]
}

export default QueenNewMovesPlayerOne
