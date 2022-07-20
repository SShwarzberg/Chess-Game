const RookNewMovesPlayerTwo = (individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions) => {
    let returnedMoves
    let blockingKingFromCheck = []
    let removeFromAvailableMoves = []
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
    if (moreThanVertical.some(position => position.move === kingPosition)) {
        moreThanVertical.forEach(position => {
            underCurrentPiece.push(position.move)
        })
    }
    if (lessThanVertical.some(position => position.move === kingPosition)) {
        lessThanVertical.forEach(position => {
            if (position.tilePosition !== kingPosition) {
                overCurrentPiece.push(position.move)
            }
        })
    }

    let tilesBetweenKingAndAttacker = []
    if (underCurrentPiece.includes(kingPosition)) {
        underCurrentPiece.forEach(position => {
            if (position[0] < kingPosition[0]) {
                tilesBetweenKingAndAttacker.push(position)
            }
        })
        tilesBetweenKingAndAttacker.forEach(position => {
            if (playerTwoTilePositions.includes(position) || playerOneTilePositions.includes(position)) {
                tilesBetweenKingAndAttacker = []
            }
        })
    }
    if (overCurrentPiece.includes(kingPosition)) {
        overCurrentPiece.forEach(position => {
            if (position[0] > kingPosition[0]) {
                tilesBetweenKingAndAttacker.push(position)
            }
        })
        tilesBetweenKingAndAttacker.forEach(position => {
            if (playerTwoTilePositions.includes(position) || playerOneTilePositions.includes(position)) {
                tilesBetweenKingAndAttacker = []
            }
        })
    }

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
    return [returnedMoves, blockingKingFromCheck, tilesBetweenKingAndAttacker]
}

export default RookNewMovesPlayerTwo
