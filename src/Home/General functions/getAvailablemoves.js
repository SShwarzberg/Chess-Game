// import player one's moves
import PawnMovesPlayerOne from './Player One Piece Moves/PawnMovesPlayerOne'
import RookMovesPlayerOne from './Player One Piece Moves/RookMovesPlayerOne'
import HorseMovesPlayerOne from './Player One Piece Moves/HorseMovesPlayerOne'
import BishopMovesPlayerOne from './Player One Piece Moves/BishopMovesPlayerOne'
import QueenMovesPlayerOne from './Player One Piece Moves/QueenMovesPlayerOne'
import KingMovesPlayerOne from './Player One Piece Moves/KingMovesPlayerOne'
// import player two's moves
import PawnMovesPlayerTwo from './Player Two Piece Moves/PawnMovesPlayerTwo'
import HorseMovesPlayerTwo from './Player Two Piece Moves/HorseMovesPlayerTwo'
import RookMovesPlayerTwo from './Player Two Piece Moves/RookMovesPlayerTwo'
import BishopMovesPlayerTwo from './Player Two Piece Moves/BishopMovesPlayerTwo'
import QueenMovesPlayerTwo from './Player Two Piece Moves/QueenMovesPlayerTwo'
import KingMovesPlayerTwo from './Player Two Piece Moves/KingMovesPlayerTwo'

const getAvailableMoves = (individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves, nextAvailableMoves, playerOneTurn, setCurrentPiece, tilesBetweenKingAndAttackerP1, tilesBetweenKingAndAttackerP2, attackingPositionsP1Perpendicular, attackingPositionsP2Perpendicular, attackingPositionsDiagonalP1, attackingPositionsDiagonalP2, ownBlockingKingFromCheckP1, ownBlockingKingFromCheckP2) => {
    let playerTwoNextMoves = []
    let playerOneNextMoves = []
    let kingPositionP1
    playerOnePiecePositions.forEach(position => {
        if (position.id === 15) {
            kingPositionP1 = position.tilePosition
        }
    })
    let p2CheckingKingPieces = []
    if (nextAvailableMoves[1]) {
        nextAvailableMoves[1].forEach(pieces => {
            pieces.map(piece => {
                piece.newAvailableMoves.forEach(move => {
                    playerTwoNextMoves.push(move)
                    if (move === kingPositionP1) {
                        p2CheckingKingPieces.push(piece.piece)
                    }
                })
            })
        })
    }
    let kingPositionP2
    playerTwoPiecePositions.forEach(position => {
        if (position.id === 31) {
            kingPositionP2 = position.tilePosition
        }
    })
    let p1CheckingKingPieces = []
    if (nextAvailableMoves[0]) {
        nextAvailableMoves[0].forEach(pieces => {
            pieces.map(piece => {
                piece.newAvailableMoves.forEach(move => {
                    playerOneNextMoves.push(move)
                    if (move === kingPositionP2) {
                        p1CheckingKingPieces.push(piece.piece)
                    }
                })
            })
        })
    }
    if (playerOneTurn) {
        // player one
        setCurrentPiece(individualPiece)
        PawnMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP2, attackingPositionsP2Perpendicular, attackingPositionsDiagonalP2, p2CheckingKingPieces)
        RookMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP2, attackingPositionsP2Perpendicular, p2CheckingKingPieces)
        BishopMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP2, attackingPositionsP2Perpendicular, attackingPositionsDiagonalP2, p2CheckingKingPieces)
        QueenMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP2, attackingPositionsP2Perpendicular, attackingPositionsDiagonalP2, p2CheckingKingPieces)
        HorseMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP2, attackingPositionsP2Perpendicular, p2CheckingKingPieces)
        KingMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, setAvailableMoves, playerTwoNextMoves, ownBlockingKingFromCheckP2, nextAvailableMoves)
    } else {
        // player two
        setCurrentPiece(individualPiece)
        PawnMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP1, attackingPositionsP1Perpendicular, attackingPositionsDiagonalP1, p1CheckingKingPieces)
        RookMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP1, attackingPositionsP1Perpendicular, p1CheckingKingPieces)
        BishopMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP1, attackingPositionsP1Perpendicular, attackingPositionsDiagonalP1, p1CheckingKingPieces)
        QueenMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP1, attackingPositionsP1Perpendicular, attackingPositionsDiagonalP1, p1CheckingKingPieces)
        HorseMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP1, p1CheckingKingPieces)
        KingMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, setAvailableMoves, playerOneNextMoves, ownBlockingKingFromCheckP1, nextAvailableMoves)
    }
}

export default getAvailableMoves
