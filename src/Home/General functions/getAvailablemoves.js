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

const getAvailableMoves = (individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves, nextAvailableMoves, playerOneTurn, playerTwoInCheck, setCurrentPiece, playerOneInCheck) => {
    if (playerOneTurn) {
        // player one
        if (!playerOneInCheck) {
            setCurrentPiece(individualPiece)
            PawnMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves)
            RookMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves)
            BishopMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves)
            QueenMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves)
            HorseMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, setAvailableMoves)
        } else if (playerOneInCheck && individualPiece.id === 15) {
            setCurrentPiece(individualPiece)
        }
        KingMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, setAvailableMoves, nextAvailableMoves)
    } else {
        // player two
        if (!playerTwoInCheck) {
            setCurrentPiece(individualPiece)
            PawnMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves)
            RookMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves)
            BishopMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves)
            QueenMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves)
            HorseMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, setAvailableMoves)
        } else if (playerTwoInCheck && individualPiece.id === 31) {
            setCurrentPiece(individualPiece)
        }
        KingMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, setAvailableMoves, nextAvailableMoves)
    }
}

export default getAvailableMoves
