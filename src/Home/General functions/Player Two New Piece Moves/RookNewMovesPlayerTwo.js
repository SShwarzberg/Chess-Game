const RookNewMovesPlayerTwo = (individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions) => {
    let returnedMoves
    let blockingKingFromCheck = []
    let removeFromAvailableMoves = []
    let newAvailableMoves = []
    let horizontalMoves = []
    let verticalMoves = []
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
    let checkIfBlockingPlayerTwo = []
    // gets all available moves and pushes all piece which match own piece into array
    playerTwoPiecePositions.forEach(position => {
        newAvailableMoves.forEach((move, index) => {
            if (position.tilePosition === move) {
                boardLetters.forEach((letter, i) => {
                    if (move.includes(i + 1)) {
                        checkIfBlockingPlayerTwo.push(move)
                    }
                })
                newAvailableMoves.splice(index, 1)
            }
        })
    })
    checkIfBlockingPlayerTwo.forEach(piece => {
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
    tilesBetweenKingAndAttacker.forEach(position => {
        if (playerOneTilePositions.includes(position) || playerTwoTilePositions.includes(position)) {
            tilesBetweenKingAndAttacker = []
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
    newAvailableMoves = newAvailableMoves.filter(item => {
        if (!removeFromAvailableMoves.includes(item)) {
            return item
        }
    })
    newAvailableMoves = Array.from(new Set(newAvailableMoves))
    returnedMoves = { piece: 'Rook 2', id: individualPiece.id, newAvailableMoves }

    let attackingPiecesPositions
    const getPiecesBetweenKingAndOpponentPerpendicular = () => {
        let kingPosition
        playerOnePiecePositions.forEach(position => {
            if (position.id === 15) {
                kingPosition = position.tilePosition
            }
        })

        let tilesBetweenKingAndAttacker = []
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
            if (playerTwoTilePositions.includes(position)) {
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
                    blockingKingFromCheck.push(piece)
                })
            }
        }
        blockingArrayDiagonal.forEach(direction => {
            getBlockingDirectionDiagonal(direction)
        })

    }
    blockingKingFromCheckFunc()
    return [returnedMoves, blockingKingFromCheck, tilesBetweenKingAndAttacker, attackingPiecesPositions]
}

export default RookNewMovesPlayerTwo
