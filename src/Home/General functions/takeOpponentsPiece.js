const takeOpponentPiece = (eventTargetId, playerTwoPiecePositions, playerOnePiecePositions, availableMoves, setPlayerTwoPiecePositions, setAvailableMoves, setPlayerOnePiecePositions) => {
    playerTwoPiecePositions.forEach((position, i) => {
        availableMoves.forEach(move => {
            if (move === position.tilePosition && eventTargetId === position.tilePosition) {
                const newPlayerTwoPositions = playerTwoPiecePositions.map(positions => {
                    return Object.assign({}, positions)
                })
                newPlayerTwoPositions[i].tilePosition = 'null'
                setPlayerTwoPiecePositions(newPlayerTwoPositions)
                setAvailableMoves([])
            }
        })
    })
    playerOnePiecePositions.forEach((position, i) => {
        availableMoves.forEach(move => {
            if (move === position.tilePosition && eventTargetId === position.tilePosition) {
                const newPlayerOnePositions = playerOnePiecePositions.map(positions => {
                    return Object.assign({}, positions)
                })
                newPlayerOnePositions[i].tilePosition = 'null'
                setPlayerOnePiecePositions(newPlayerOnePositions)
                setAvailableMoves([])
            }
        })
    })
}

export default takeOpponentPiece
