const RookNewMovesPlayerTwo = (individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions) => {
    let returnedMoves
    let blockingKingFromCheck = []
    let removeFromAvailableMoves = []
    let newAvailableMoves = []
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
                horizontalMoves.push(letter + [i + 1]),
                newAvailableMoves.push(letter + [i + 1])
            ))
        }
        if (individualPiece.tilePosition.includes(i + 1)) {
            boardLetters.map(letters => (
                verticalMoves.push(letters + [i + 1]),
                newAvailableMoves.push(letters + [i + 1])
            ))
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
                            if (playerOneTilePositions.some(position => position === horizMove)) {
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
                            if (playerOneTilePositions.some(position => position === horizMove)) {
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
                            if (playerOneTilePositions.some(position => position === move)) {
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
                            if (playerOneTilePositions.some(position => position === move)) {
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


    // checks if opponents piece is blocking 
    playerOnePiecePositions.forEach(position => {
        newAvailableMoves.forEach(move => {
            if (move === position.tilePosition) {
                if (individualPiece.tilePosition[0] === move[0] && individualPiece.tilePosition[1] < move[1] && position.id !== 15) {
                    newAvailableMoves.forEach(moves => {
                        if (moves[0] === move[0] && moves[1] > move[1]) {
                            removeFromAvailableMoves.push(moves)
                        }
                    })
                }
                if (individualPiece.tilePosition[0] === move[0] && individualPiece.tilePosition[1] > move[1] && position.id !== 15) {
                    newAvailableMoves.forEach(moves => {
                        if (moves[0] === move[0] && moves[1] < move[1]) {
                            removeFromAvailableMoves.push(moves)
                        }
                    })
                }
            }
        })
    })
    let lessThanVertical = []
    let moreThanVertical = []
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
                            lessThanVertical.push({ move, i })
                        }
                        if (index < i) {
                            moreThanVertical.push({ move, i })
                        }
                    }
                })
            }
        })
    })

    let kingPosition
    playerOnePiecePositions.forEach(position => {
        if (position.id === 15) {
            kingPosition = position.tilePosition
        }
    })

    let playerOneVerticalMatch = []
    playerOnePiecePositions.forEach(position => {
        boardLetters.forEach((letter, i) => {
            if (position.tilePosition.includes(letter) && individualPiece.tilePosition[1] === position.tilePosition[1] && position.id !== 15) {
                playerOneVerticalMatch.push({ move: position.tilePosition, i })
            }
        })
    })
    lessThanVertical.forEach(obj => {
        playerOneVerticalMatch.forEach(match => {
            if (match.i > obj.i && match.i < individualPieceIndex.i) {
                removeFromAvailableMoves.push(obj.move)
            }
        })
    })
    moreThanVertical.forEach(obj => {
        playerOneVerticalMatch.forEach(match => {
            if (match.i < obj.i && match.i > individualPieceIndex.i) {
                removeFromAvailableMoves.push(obj.move)
            }
        })
    })

    let tilesBetweenKingAndAttacker = []
    let attackingPiecesPositions
    const getPiecesBetweenKingAndOpponentPerpendicular = () => {
        let kingPosition
        playerOnePiecePositions.forEach(position => {
            if (position.id === 15) {
                kingPosition = position.tilePosition
            }
        })

        let tilesBetweenKingAndAttacker = []
        let playerOneTilePositions = []
        let playerTwoTilePositions = []
        playerTwoPiecePositions.forEach(position => {
            if (position.id !== individualPiece.id) {
                playerOneTilePositions.push(position.tilePosition)
            }
        })
        playerOnePiecePositions.forEach(position => {
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
            playerOnePiecePositions.forEach(p2Positions => {
                if (p2Positions.tilePosition === position) {
                    opponentsPiecesBetween.push(p2Positions.tilePosition)
                }
            })
        })
        if (opponentsPiecesBetween.length > 1) {
            tilesBetweenKingAndAttacker = []
        }
        attackingPiecesPositions = ({
            attackerId: individualPiece.id,
            attackerPosition: individualPiece.tilePosition,
            attackingPositions: tilesBetweenKingAndAttacker
        })
    }
    getPiecesBetweenKingAndOpponentPerpendicular()

    const blockingKingFromCheckFunc = () => {
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
            playerOneTilePositions.forEach(p1Position => {
                overCurrentPiece.forEach(position => {
                    if (p1Position === position && p1Position !== kingPosition && position[0] > kingPosition[0]) {
                        blockingKingUp.push(position)
                    }
                    if (playerTwoTilePositions.includes(position) && position[0] > kingPosition[0]) {
                        blockingKingUp = []
                    }
                })
            })
        }
        if (underCurrentPiece.some(position => position === kingPosition)) {
            playerOneTilePositions.forEach(p1Position => {
                underCurrentPiece.forEach(position => {
                    if (p1Position === position && p1Position !== kingPosition && position[0] < kingPosition[0]) {
                        blockingKingDown.push(position)
                    }
                    if (playerTwoTilePositions.includes(position) && position[0] < kingPosition[0]) {
                        blockingKingDown = []
                    }
                    blockingKingDown.forEach(piece => {
                        if (piece[0] < position[0]) {
                            removeFromAvailableMoves.push(position)
                        }
                    })
                })
            })
        }
        if (rightOfCurrentPiece.some(position => position === kingPosition)) {
            playerOneTilePositions.forEach(p1Position => {
                rightOfCurrentPiece.forEach(position => {
                    if (p1Position === position && p1Position !== kingPosition && position[1] < kingPosition[1]) {
                        blockingKingRight.push(position)
                    }
                    if (playerTwoTilePositions.includes(position) && position[1] < kingPosition[1]) {
                        blockingKingRight = []
                    }
                })
            })
        }
        if (leftOfCurrentPiece.some(position => position === kingPosition)) {
            playerOneTilePositions.forEach(p1Position => {
                leftOfCurrentPiece.forEach(position => {
                    if (p1Position === position && p1Position !== kingPosition && position[1] > kingPosition[1]) {
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
    const ownBlockingKingFromCheckFunc = () => {
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
                    ownBlockingKingFromCheck.push(piece)
                })
            }
        }
        blockingArrayDiagonal.forEach(direction => {
            getBlockingDirectionDiagonal(direction)
        })
    }
    ownBlockingKingFromCheckFunc()

    newAvailableMoves = newAvailableMoves.filter(item => {
        if (!removeFromAvailableMoves.includes(item)) {
            return item
        }
    })
    addToAvailableMovesRightAngle.forEach(move => {
        newAvailableMoves.push(move)
    })
    newAvailableMoves = Array.from(new Set(newAvailableMoves))
    returnedMoves = { piece: 'Rook 2', id: individualPiece.id, newAvailableMoves }

    return [returnedMoves, blockingKingFromCheck, tilesBetweenKingAndAttacker, attackingPiecesPositions, ownBlockingKingFromCheck]
}

export default RookNewMovesPlayerTwo
