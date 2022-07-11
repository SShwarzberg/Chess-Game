// Player one
import PawnNewMovesPlayerOne from "./Player One New Piece Moves/PawnNewMovesPlayerOne"
import RookNewMovesPlayerOne from "./Player One New Piece Moves/RookNewMovesPlayerOne"
import HorseNewMovesPlayerOne from "./Player One New Piece Moves/HorseNewMovesPlayerOne"
import BishopNewMovesPlayerOne from "./Player One New Piece Moves/BishopNewMovesPlayerOne"
import QueenNewMovesPlayerOne from "./Player One New Piece Moves/QueenNewMovesPlayerOne"
import KingNewMovesPlayerOne from "./Player One New Piece Moves/KingNewMovesPlayerOne"
// Player two
import PawnNewMovesPlayerTwo from "./Player Two New Piece Moves/PawnNewMovesPlayerTwo"
import RookNewMovesPlayerTwo from "./Player Two New Piece Moves/RookNewMovesPlayerTwo"
import HorseNewMovesPlayerTwo from "./Player Two New Piece Moves/HorseNewMovesPlayerTwo"
import BishopNewMovesPlayerTwo from "./Player Two New Piece Moves/BishopNewMovesPlayerTwo"
import QueenNewMovesPlayerTwo from "./Player Two New Piece Moves/QueenNewMovesPlayerTwo"
import KingNewMovesPlayerTwo from "./Player Two New Piece Moves/KingNewMovesPlayerTwo"

const getNewAvailableMoves = (positions, boardLetters, playerOnePiecePositions, playerTwoPiecePositions) => {
    positions.forEach(position => {
        if (position.tilePosition !== null) {
            // player one new moves
            PawnNewMovesPlayerOne(position, boardLetters, positions, playerTwoPiecePositions)
            RookNewMovesPlayerOne(position, boardLetters, positions, playerTwoPiecePositions)
            HorseNewMovesPlayerOne(position, boardLetters, positions)
            BishopNewMovesPlayerOne(position, boardLetters, positions, playerTwoPiecePositions)
            QueenNewMovesPlayerOne(position, boardLetters, positions, playerTwoPiecePositions)
            KingNewMovesPlayerOne(position, boardLetters, positions)
            // player two new moves
            PawnNewMovesPlayerTwo(position, boardLetters, positions, playerOnePiecePositions)
            RookNewMovesPlayerTwo(position, boardLetters, positions, playerOnePiecePositions)
            HorseNewMovesPlayerTwo(position, boardLetters, positions)
            BishopNewMovesPlayerTwo(position, boardLetters, positions, playerOnePiecePositions)
            QueenNewMovesPlayerTwo(position, boardLetters, positions, playerOnePiecePositions)
            KingNewMovesPlayerTwo(position, boardLetters, positions)
        }
    })
}

export default getNewAvailableMoves
