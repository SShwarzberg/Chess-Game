const KingMovesPlayerOne = (individualPiece, boardLetters, playerOnePiecePositions, setAvailableMoves) => {
    if (individualPiece.id === 16) {
        let newAvailableMoves = []
        boardLetters.forEach((letter, i) => {
            if (individualPiece.tilePosition.includes(letter)) {
                boardLetters.forEach((letters, index) => {
                    if (parseInt(individualPiece.tilePosition[1]) === (index - 1)) {
                        newAvailableMoves.push(letter + index)
                    }
                    if (parseInt(individualPiece.tilePosition[1]) === (index + 1)) {
                        newAvailableMoves.push(letter + index)
                    }
                })
            }
            if (parseInt(individualPiece.tilePosition[1]) === i) {
                boardLetters.forEach(letters => {
                    console.log(letters, i)
                })
            }
        })
        setAvailableMoves(newAvailableMoves)
    }
}

export default KingMovesPlayerOne
