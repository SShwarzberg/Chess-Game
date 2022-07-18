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
    const pushPiecesToArray = (piece, arrayToPushTo) => {
        if (piece) {
            arrayToPushTo.push(piece)
        }
    }
    let blockingKingFromCheckP1 = []
    let blockingKingFromCheckP2 = []
    newPositions.forEach(position => {
        if (position.tilePosition !== null) {
            // player one new moves
            if (position.id === 10 || position.id === 11) {
                const [rook1, blockingKingRook1] = RookNewMovesPlayerOne(position, boardLetters, newPositions, playerTwoPiecePositions)
                pushPiecesToArray(rook1, rookP1)
                blockingKingRook1.forEach(blockingPiece => {
                    blockingKingFromCheckP2.push(blockingPiece)
                })
            }

            if (position.id === 8 || position.id === 9) {
                const [bishop1, blockingKingBishop1] = BishopNewMovesPlayerOne(position, boardLetters, newPositions, playerTwoPiecePositions)
                pushPiecesToArray(bishop1, bishopP1)
                blockingKingBishop1.forEach(blockingPiece => {
                    blockingKingFromCheckP2.push(blockingPiece)
                })
            }

            if (position.id === 14) {
                const [queen1, blockingKingQueen1] = QueenNewMovesPlayerOne(position, boardLetters, newPositions, playerTwoPiecePositions)
                pushPiecesToArray(queen1, queenP1)
                blockingKingQueen1.forEach(blockingPiece => {
                    blockingKingFromCheckP2.push(blockingPiece)
                })
            }

            if (position.id >= 0 && position.id <= 7) {
                const pawn1 = PawnNewMovesPlayerOne(position, boardLetters, newPositions, playerTwoPiecePositions)
                pushPiecesToArray(pawn1, pawnP1)
            }

            if (position.id === 12 || position.id === 13) {
                const horse1 = HorseNewMovesPlayerOne(position, boardLetters, newPositions)
                pushPiecesToArray(horse1, horseP1)
            }

            if (position.id === 15) {
                const king1 = KingNewMovesPlayerOne(position, boardLetters, newPositions)
                pushPiecesToArray(king1, kingP1)
            }
        }
    })
    newPositions.forEach(position => {
        if (position !== null) {
            // player two new moves
            if (position.id === 26 || position.id === 27) {
                const [rook2, blockingKingRook2] = RookNewMovesPlayerTwo(position, boardLetters, newPositions, playerOnePiecePositions)
                pushPiecesToArray(rook2, rookP2)
                blockingKingRook2.forEach(blockingPiece => {
                    blockingKingFromCheckP1.push(blockingPiece)
                })
            }

            if (position.id === 24 || position.id === 25) {
                const [bishop2, blockingKingBishop2] = BishopNewMovesPlayerTwo(position, boardLetters, newPositions, playerOnePiecePositions)
                pushPiecesToArray(bishop2, bishopP2)
                blockingKingBishop2.forEach(blockingPiece => {
                    blockingKingFromCheckP1.push(blockingPiece)
                })
            }

            if (position.id === 30) {
                const [queen2, blockingKingQueen2] = QueenNewMovesPlayerTwo(position, boardLetters, newPositions, playerOnePiecePositions)
                pushPiecesToArray(queen2, queenP2)
                blockingKingQueen2.forEach(blockingPiece => {
                    blockingKingFromCheckP1.push(blockingPiece)
                })
            }

            if (position.id >= 16 && position.id <= 23) {
                const pawn2 = PawnNewMovesPlayerTwo(position, boardLetters, newPositions, playerOnePiecePositions)
                pushPiecesToArray(pawn2, pawnP2)
            }

            if (position.id === 28 || position.id === 29) {
                const horse2 = HorseNewMovesPlayerTwo(position, boardLetters, newPositions)
                pushPiecesToArray(horse2, horseP2)
            }

            if (position.id === 31) {
                const king2 = KingNewMovesPlayerTwo(position, boardLetters, newPositions)
                pushPiecesToArray(king2, kingP2)
            }
        }
    })

    const extractAvailableMoves = (playerNewMoves, nextMovesPlayer) => {
        playerNewMoves.forEach(pieces => {
            pieces.forEach(piece => {
                piece.newAvailableMoves.forEach(move => {
                    if (!move.includes('-')) {
                        if (!move.includes(0)) {
                            nextMovesPlayer.push(move)
                        }
                    }
                })
            })
        })
    }

    // player 1
    player1NewMoves.push(
        pawnP1,
        bishopP1,
        rookP1,
        horseP1,
        queenP1,
        kingP1)
    let nextMovesP1 = []
    extractAvailableMoves(player1NewMoves, nextMovesP1)

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
    extractAvailableMoves(player2NewMoves, nextMovesP2)

    setNextAvailableMoves([nextMovesP1, nextMovesP2])
    return [nextMovesP1, nextMovesP2, blockingKingFromCheckP1]
}

export default getNewAvailableMoves
