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
    if (nextAvailableMoves[1]) {
        nextAvailableMoves[1].forEach(pieces => {
            pieces.map(piece => {
                piece.newAvailableMoves.forEach(move => {
                    playerTwoNextMoves.push(move)
                })
            })
        })
    }
    if (nextAvailableMoves[0]) {
        nextAvailableMoves[0].forEach(pieces => {
            pieces.map(piece => {
                piece.newAvailableMoves.forEach(move => {
                    playerOneNextMoves.push(move)
                })
            })
        })
    }
    if (playerOneTurn) {
        // player one
        setCurrentPiece(individualPiece)
        PawnMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP2, attackingPositionsP2Perpendicular, attackingPositionsDiagonalP2, playerOneNextMoves)
        RookMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP2, attackingPositionsP2Perpendicular, playerOneNextMoves)
        BishopMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP2, attackingPositionsP2Perpendicular, attackingPositionsDiagonalP2, playerOneNextMoves)
        QueenMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP2, attackingPositionsP2Perpendicular, attackingPositionsDiagonalP2, playerOneNextMoves)
        HorseMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP2, attackingPositionsP2Perpendicular, playerOneNextMoves)
        KingMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, setAvailableMoves, playerTwoNextMoves, ownBlockingKingFromCheckP2)
    } else {
        // player two
        setCurrentPiece(individualPiece)
        PawnMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP1, attackingPositionsP1Perpendicular, attackingPositionsDiagonalP1)
        RookMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP1, attackingPositionsP1Perpendicular)
        BishopMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP1, attackingPositionsP1Perpendicular, attackingPositionsDiagonalP1)
        QueenMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP1, attackingPositionsP1Perpendicular, attackingPositionsDiagonalP1)
        HorseMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP1)
        KingMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, setAvailableMoves, playerTwoNextMoves, ownBlockingKingFromCheckP1)
    }
}

export default getAvailableMoves
