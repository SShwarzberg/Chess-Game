// import player one's moves
import PawnMovesPlayerOne from '../Player One Piece moves/PawnMovesPlayerOne'
import RookMovesPlayerOne from '../Player One Piece moves/RookMovesPlayerOne'
import HorseMovesPlayerOne from '../Player One Piece moves/HorseMovesPlayerOne'
import BishopMovesPlayerOne from '../Player One Piece moves/BishopMovesPlayerOne'
import QueenMovesPlayerOne from '../Player One Piece moves/QueenMovesPlayerOne'
import KingMovesPlayerOne from '../Player One Piece moves/KingMovesPlayerOne'
// import player two's moves
import PawnMovesPlayerTwo from '../Player Two Piece Moves/PawnMovesPlayerTwo'
import HorseMovesPlayerTwo from '../Player Two Piece Moves/HorseMovesPlayerTwo'
import RookMovesPlayerTwo from '../Player Two Piece Moves/RookMovesPlayerTwo'
import BishopMovesPlayerTwo from '../Player Two Piece Moves/BishopMovesPlayerTwo'
import QueenMovesPlayerTwo from '../Player Two Piece Moves/QueenMovesPlayerTwo'
import KingMovesPlayerTwo from '../Player Two Piece Moves/KingMovesPlayerTwo'

const getAvailableMoves = (individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves) => {
    // player one
    PawnMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves)
    RookMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves)
    BishopMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves)
    QueenMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves)
    HorseMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, setAvailableMoves)
    KingMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, setAvailableMoves)
    // player two
    PawnMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves)
    RookMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves)
    BishopMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves)
    QueenMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves)
    HorseMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, setAvailableMoves)
    KingMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, setAvailableMoves)
}

export default getAvailableMoves
