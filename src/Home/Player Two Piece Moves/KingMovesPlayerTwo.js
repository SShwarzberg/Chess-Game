const KingMovesPlayerTwo = (individualPiece, boardLetters, playerTwoPiecePositions, setAvailableMoves) => {
    if (individualPiece.id === 33) {
        let newAvailableMoves = ['d4', 'd6']
        let removeFromAvailableMoves = []


        setAvailableMoves(newAvailableMoves)
    }
}

export default KingMovesPlayerTwo
