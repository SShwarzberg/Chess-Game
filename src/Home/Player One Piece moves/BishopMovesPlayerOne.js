const BishopMovesPlayerOne = (individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves) => {
    if (individualPiece.id === 9 || individualPiece.id === 10) {
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
        let checkIfBlockingPlayerOne = []
        playerOnePiecePositions.forEach(position => {
            newAvailableMoves.forEach(move => {
                if (position.tilePosition === move) {
                    removeFromAvailableMoves.push(move)
                    checkIfBlockingPlayerOne.push(move)
                }
            })
        })
        let upAndToRightIndex = []
        upAndToRight.forEach(move => {
            boardLetters.forEach((letter, i) => {
                if (move[0] === letter) {
                    upAndToRightIndex.push({ move, i })
                }
            })
        })
        let downAndToRightIndex = []
        downAndToRight.forEach(move => {
            boardLetters.forEach((letter, i) => {
                if (move[0] === letter) {
                    downAndToRightIndex.push({ move, i })
                }
            })
        })
        let downAndToLeftIndex = []
        downAndToLeft.forEach(move => {
            boardLetters.forEach((letter, i) => {
                if (move[0] === letter) {
                    downAndToLeftIndex.push({ move, i })
                }
            })
        })
        let upAndToLeftIndex = []
        upAndToLeft.forEach(move => {
            boardLetters.forEach((letter, i) => {
                if (move[0] === letter) {
                    upAndToLeftIndex.push({ move, i })
                }
            })
        })
        let ownPiecesBlockingUpRight = []
        let ownPiecesBlockingDownRight = []
        let ownPiecesBlockingDownLeft = []
        let ownPiecesBlockingUpLeft = []
        checkIfBlockingPlayerOne.forEach(blocking => {
            // up right
            upAndToRight.forEach(availableMove => {
                if (availableMove === blocking && blocking !== individualPiece.tilePosition) {
                    boardLetters.forEach((letter, i) => {
                        if (blocking.includes(letter)) {
                            ownPiecesBlockingUpRight.push({ blocking, i })
                        }
                    })
                }
            })
            // down right
            downAndToRight.forEach(availableMove => {
                if (availableMove === blocking && blocking !== individualPiece.tilePosition) {
                    boardLetters.forEach((letter, i) => {
                        if (blocking.includes(letter)) {
                            ownPiecesBlockingDownRight.push({ blocking, i })
                        }
                    })
                }
            })
            // down left
            downAndToLeft.forEach(availableMove => {
                if (availableMove === blocking && blocking !== individualPiece.tilePosition) {
                    boardLetters.forEach((letter, i) => {
                        if (blocking.includes(letter)) {
                            ownPiecesBlockingDownLeft.push({ blocking, i })
                        }
                    })
                }
            })
            // up left
            upAndToLeft.forEach(availableMove => {
                if (availableMove === blocking && blocking !== individualPiece.tilePosition) {
                    boardLetters.forEach((letter, i) => {
                        if (blocking.includes(letter)) {
                            ownPiecesBlockingUpLeft.push({ blocking, i })
                        }
                    })
                }
            })
        })

        // remove all pieces after own first piece that blocks up and to the right
        const getOwnBlockingIndexUpRight = () => {
            return ownPiecesBlockingUpRight.map(piece => piece.i)
        }
        const getMaxIndexUpRight = () => {
            return Math.max(...getOwnBlockingIndexUpRight())
        }
        let ownPieceBlockingUpRight
        ownPiecesBlockingUpRight.forEach(piece => {
            if (piece.i === getMaxIndexUpRight()) {
                ownPieceBlockingUpRight = piece
            }
        })
        upAndToRightIndex.forEach(position => {
            if (ownPieceBlockingUpRight !== undefined && position.i < ownPieceBlockingUpRight.i) {
                removeFromAvailableMoves.push(position.move)
            }
        })

        // remove all pieces after own first piece that blocks down and to the right
        const getOwnBlockingIndexDownRight = () => {
            return ownPiecesBlockingDownRight.map(piece => piece.i)
        }
        const getMinIndexDownRight = () => {
            return Math.min(...getOwnBlockingIndexDownRight())
        }
        let ownPieceBlockingDownRight
        ownPiecesBlockingDownRight.forEach(piece => {
            if (piece.i === getMinIndexDownRight()) {
                ownPieceBlockingDownRight = piece
            }
        })
        downAndToRightIndex.forEach(position => {
            if (ownPieceBlockingDownRight !== undefined && position.i > ownPieceBlockingDownRight.i) {
                removeFromAvailableMoves.push(position.move)
            }
        })

        // remove all pieces after own first piece that blocks down and to the left
        const getOwnBlockingIndexDownLeft = () => {
            return ownPiecesBlockingDownLeft.map(piece => piece.i)
        }
        const getMinIndexDownLeft = () => {
            return Math.min(...getOwnBlockingIndexDownLeft())
        }
        let ownPieceBlockingDownLeft
        ownPiecesBlockingDownLeft.forEach(piece => {
            if (piece.i === getMinIndexDownLeft()) {
                ownPieceBlockingDownLeft = piece
            }
        })
        downAndToLeftIndex.forEach(position => {
            if (ownPieceBlockingDownLeft !== undefined && position.i > ownPieceBlockingDownLeft.i) {
                removeFromAvailableMoves.push(position.move)
            }
        })



        const pushBlockingPieces = (ownPiecesBlockingDirection, directionIndex) => {
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

        // remove all pieces after own first piece that blocks up and to the Left
        pushBlockingPieces(ownPiecesBlockingUpLeft, upAndToLeftIndex)
        // const getOwnBlockingIndexUpLeft = () => {
        //     return ownPiecesBlockingUpLeft.map(piece => piece.i)
        // }
        // const getMaxIndexUpLeft = () => {
        //     return Math.max(...getOwnBlockingIndexUpLeft())
        // }
        // let ownPieceBlockingUpLeft
        // ownPiecesBlockingUpLeft.forEach(piece => {
        //     if (piece.i === getMaxIndexUpLeft()) {
        //         ownPieceBlockingUpLeft = piece
        //     }
        // })
        // upAndToLeftIndex.forEach(position => {
        //     if (ownPieceBlockingUpLeft !== undefined && position.i < ownPieceBlockingUpLeft.i) {
        //         removeFromAvailableMoves.push(position.move)
        //     }
        // })

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

export default BishopMovesPlayerOne
