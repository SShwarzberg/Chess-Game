const changePiecePosition = (eventTargetId, availableMoves, playerOneTurn, playerOnePiecePositions, currentPiece, setPlayerOnePiecePositions, setAvailableMoves, setPlayerOneTurn, playerTwoPiecePositions, setPlayerTwoPiecePositions) => {
    if (availableMoves !== []) {
        availableMoves.forEach(move => {
            if (move === eventTargetId) {
                if (playerOneTurn) {
                    // player one 
                    const newPlayerOnePositions = playerOnePiecePositions.map(position => {
                        return Object.assign({}, position)
                    })
                    newPlayerOnePositions[currentPiece.id].tilePosition = move
                    setPlayerOnePiecePositions(newPlayerOnePositions)
                    setAvailableMoves([])
                    setPlayerOneTurn(false)
                } else {
                    // player two
                    const newPlayerTwoPositions = playerTwoPiecePositions.map(position => {
                        return Object.assign({}, position)
                    })
                    newPlayerTwoPositions[currentPiece.id - 16].tilePosition = move
                    setPlayerTwoPiecePositions(newPlayerTwoPositions)
                    setAvailableMoves([])
                    setPlayerOneTurn(true)
                }
            }
        })
    }
}

export default changePiecePosition
