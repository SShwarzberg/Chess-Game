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
        upAndToRight.forEach(move => {
            boardLetters.forEach((letter, i) => {
                if (move[0] === letter) {
                    downAndToRightIndex.push({ move, i })
                }
            })
        })
        let ownPiecesBlockingUpRight = []
        let ownPieceBlockingDownRight
        checkIfBlockingPlayerOne.forEach(blocking => {
            upAndToRight.forEach(availableMove => {
                if (availableMove === blocking && blocking !== individualPiece.tilePosition) {
                    boardLetters.forEach((letter, i) => {
                        if (blocking.includes(letter)) {
                            ownPiecesBlockingUpRight.push({ blocking, i })
                        }
                    })
                }
            })
            // downAndToRight.forEach(availableMove => {
            //     if (availableMove === blocking && blocking !== individualPiece.tilePosition) {
            //         boardLetters.forEach((letter, i) => {
            //             if (blocking.includes(letter)) {
            //                 ownPieceBlockingDownRight = { blocking, i }
            //             }
            //         })
            //     }
            // })
        })
        const getIndexUpRight = () => {
            return ownPiecesBlockingUpRight.map(piece => piece.i)
        }
        const getMinUpRight = () => {
            return Math.max(...getIndexUpRight())
        }
        let ownPieceBlockingUpRight
        ownPiecesBlockingUpRight.forEach(piece => {
            if (piece.i === getMinUpRight()) {
                ownPieceBlockingUpRight = piece
            }
        })
        upAndToRightIndex.forEach(position => {
            if (ownPieceBlockingUpRight !== undefined && position.i < ownPieceBlockingUpRight.i) {
                removeFromAvailableMoves.push(position.move)
            }
        })
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
