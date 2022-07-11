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

const getNewAvailableMoves = (positions, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setNextAvailableMoves) => {
    let pawnP1 = []
    let bishopP1 = []
    let rookP1 = []
    let horseP1 = []
    let queenP1 = []
    let kingP1 = []
    let player1NewMoves = []
    positions.forEach(position => {
        if (position.tilePosition !== null) {
            // player one new moves
            const pawn = (PawnNewMovesPlayerOne(position, boardLetters, positions, playerTwoPiecePositions))
            if (pawn) {
                pawnP1.push(pawn)
            }
            const bishop = BishopNewMovesPlayerOne(position, boardLetters, positions, playerTwoPiecePositions)
            if (bishop) {
                bishopP1.push(bishop)
            }
            const rook = RookNewMovesPlayerOne(position, boardLetters, positions, playerTwoPiecePositions)
            if (rook) {
                rookP1.push(rook)
            }
            const horse = HorseNewMovesPlayerOne(position, boardLetters, positions)
            if (horse) {
                horseP1.push(horse)
            }
            const queen = QueenNewMovesPlayerOne(position, boardLetters, positions, playerTwoPiecePositions)
            if (queen) {
                queenP1.push(queen)
            }
            const king = KingNewMovesPlayerOne(position, boardLetters, positions)
            if (king) {
                kingP1.push(king)
            }
            // // player two new moves
            // PawnNewMovesPlayerTwo(position, boardLetters, positions, playerOnePiecePositions)
            // RookNewMovesPlayerTwo(position, boardLetters, positions, playerOnePiecePositions)
            // HorseNewMovesPlayerTwo(position, boardLetters, positions)
            // BishopNewMovesPlayerTwo(position, boardLetters, positions, playerOnePiecePositions)
            // QueenNewMovesPlayerTwo(position, boardLetters, positions, playerOnePiecePositions)
            // KingNewMovesPlayerTwo(position, boardLetters, positions)
        }
    })
    player1NewMoves.push(pawnP1)
    player1NewMoves.push(bishopP1)
    player1NewMoves.push(rookP1)
    player1NewMoves.push(horseP1)
    player1NewMoves.push(queenP1)
    player1NewMoves.push(kingP1)
    let nextMoves = []
    player1NewMoves.forEach(pieces => {
        pieces.forEach(piece => {
            piece.newAvailableMoves.forEach(move => {
                if (!move.includes('-')) {
                    if (!move.includes(0)) {
                        nextMoves.push(move)
                    }
                }
            })
        })
    })
    setNextAvailableMoves(nextMoves)
}

export default getNewAvailableMoves
