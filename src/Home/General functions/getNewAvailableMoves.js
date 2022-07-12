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

const getNewAvailableMoves = (newPositions, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setNextAvailableMoves) => {
    // player 1
    let pawnP1 = []
    let bishopP1 = []
    let rookP1 = []
    let horseP1 = []
    let queenP1 = []
    let kingP1 = []
    let player1NewMoves = []
    // player 2
    let pawnP2 = []
    let bishopP2 = []
    let rookP2 = []
    let horseP2 = []
    let queenP2 = []
    let kingP2 = []
    let player2NewMoves = []
    newPositions.forEach(position => {
        if (position.tilePosition !== null) {
            // player one new moves
            const pawn1 = (PawnNewMovesPlayerOne(position, boardLetters, newPositions, playerTwoPiecePositions))
            if (pawn1) {
                pawnP1.push(pawn1)
            }
            const bishop1 = BishopNewMovesPlayerOne(position, boardLetters, newPositions, playerTwoPiecePositions)
            if (bishop1) {
                bishopP1.push(bishop1)
            }
            const rook1 = RookNewMovesPlayerOne(position, boardLetters, newPositions, playerTwoPiecePositions)
            if (rook1) {
                rookP1.push(rook1)
            }
            const horse1 = HorseNewMovesPlayerOne(position, boardLetters, newPositions)
            if (horse1) {
                horseP1.push(horse1)
            }
            const queen1 = QueenNewMovesPlayerOne(position, boardLetters, newPositions, playerTwoPiecePositions)
            if (queen1) {
                queenP1.push(queen1)
            }
            const king1 = KingNewMovesPlayerOne(position, boardLetters, newPositions)
            if (king1) {
                kingP1.push(king1)
            }
        }
    })
    newPositions.forEach(position => {
        if (position !== null) {
            // player two new moves
            const pawn2 = PawnNewMovesPlayerTwo(position, boardLetters, newPositions, playerOnePiecePositions)
            if (pawn2) {
                pawnP2.push(pawn2)
            }
            const rook2 = RookNewMovesPlayerTwo(position, boardLetters, newPositions, playerOnePiecePositions)
            if (rook2) {
                rookP2.push(rook2)
            }
            const horse2 = HorseNewMovesPlayerTwo(position, boardLetters, newPositions)
            if (horse2) {
                horseP2.push(horse2)
            }
            const bishop2 = BishopNewMovesPlayerTwo(position, boardLetters, newPositions, playerOnePiecePositions)
            if (bishop2) {
                bishopP2.push(bishop2)
            }
            const queen2 = QueenNewMovesPlayerTwo(position, boardLetters, newPositions, playerOnePiecePositions)
            if (queen2) {
                queenP2.push(queen2)
            }
            const king2 = KingNewMovesPlayerTwo(position, boardLetters, newPositions)
            if (king2) {
                kingP2.push(king2)
            }
        }
    })

    // player 1
    player1NewMoves.push(
        pawnP1,
        bishopP1,
        rookP1,
        horseP1,
        queenP1,
        kingP1)
    let nextMovesP1 = []
    player1NewMoves.forEach(pieces => {
        pieces.forEach(piece => {
            piece.newAvailableMoves.forEach(move => {
                if (!move.includes('-')) {
                    if (!move.includes(0)) {
                        nextMovesP1.push(move)
                    }
                }
            })
        })
    })
    // player 2
    player2NewMoves.push(
        pawnP2,
        bishopP2,
        rookP2,
        horseP2,
        queenP2,
        kingP2
    )
    let nextMovesP2 = []
    player2NewMoves.forEach(pieces => {
        pieces.forEach(piece => {
            piece.newAvailableMoves.forEach(move => {
                if (!move.includes('-')) {
                    if (!move.includes(0)) {
                        nextMovesP2.push(move)
                    }
                }
            })
        })
    })
    setNextAvailableMoves([nextMovesP1, nextMovesP2])
}

export default getNewAvailableMoves
