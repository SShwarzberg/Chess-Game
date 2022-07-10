const takeOpponentPiece = (eventTargetId) => {
    playerTwoPiecePositions.forEach((position, i) => {
        availableMoves.forEach(move => {
            if (move === position.tilePosition && eventTargetId === position.tilePosition) {
                const newPlayerTwoPositions = playerTwoPiecePositions.map(positions => {
                    return Object.assign({}, positions)
                })
                newPlayerTwoPositions[i].tilePosition = null
                const newPlayerTwoLostPiece = playerTwoLostPieces.concat(newPlayerTwoPositions[i])
                setPlayerTwoLostPieces(newPlayerTwoLostPiece)
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
                newPlayerOnePositions[i].tilePosition = null
                const newPlayerOneLostPiece = playerOneLostPieces.concat(newPlayerOnePositions[i])
                setPlayerOneLostPieces(newPlayerOneLostPiece)
                setPlayerOnePiecePositions(newPlayerOnePositions)
                setAvailableMoves([])
            }
        })
    })
}

export default takeOpponentPiece
