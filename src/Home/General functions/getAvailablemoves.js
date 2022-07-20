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

const getAvailableMoves = (individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves, nextAvailableMoves, playerOneTurn, setCurrentPiece, p1UnmovablePieces, p2UnmovablePieces, tilesBetweenKingAndAttackerP1, tilesBetweenKingAndAttackerP2) => {
    if (playerOneTurn) {
        // player one
        setCurrentPiece(individualPiece)
        let opponentNextAvailableMoves = []
        if (nextAvailableMoves[1]) {
            nextAvailableMoves[1].forEach(pieces => {
                pieces.map(piece => {
                    piece.newAvailableMoves.forEach(move => {
                        opponentNextAvailableMoves.push(move)
                    })
                })
            })
        }
        PawnMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP2)
        RookMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP2)
        BishopMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP2)
        QueenMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP2)
        HorseMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP2)
        KingMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, setAvailableMoves, opponentNextAvailableMoves)
    } else {
        // player two
        setCurrentPiece(individualPiece)
        let opponentNextAvailableMoves = []
        if (nextAvailableMoves[0]) {
            nextAvailableMoves[0].forEach(pieces => {
                pieces.map(piece => {
                    piece.newAvailableMoves.forEach(move => {
                        opponentNextAvailableMoves.push(move)
                    })
                })
            })
        }
        PawnMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP1)
        RookMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP1)
        BishopMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP1)
        QueenMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP1)
        HorseMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, setAvailableMoves, tilesBetweenKingAndAttackerP1)
        KingMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, setAvailableMoves, opponentNextAvailableMoves)
    }
}

export default getAvailableMoves
