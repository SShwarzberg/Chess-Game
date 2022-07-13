import pawn from './images/pawn.png'
import bishop from './images/bishop.png'
import king from './images/king.png'
import queen from './images/queen.png'
import rook from './images/rook.png'
import horse from './images/horse.png'

// player one initial positions
const pawnsPlayerOne = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8']
const bishopsPlayerOne = ['h3', 'h6']
const rooksPlayerOne = ['h1', 'h8']
const horsesPlayerOne = ['h2', 'h7']
const queenPlayerOne = ['h4']
const kingPlayerOne = ['h5']

// player two initial position
const pawnsPlayerTwo = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8']
const bishopsPlayerTwo = ['a3', 'a6']
const rooksPlayerTwo = ['a1', 'a8']
const horsesPlayerTwo = ['a2', 'a7']
const queenPlayerTwo = ['a4']
const kingPlayerTwo = ['e7']

// player one piece info
const piecesPlayerOne = [
    ...pawnsPlayerOne.map((position, i) => {
        return {
            pieceName: pawn,
            tilePosition: position,
            id: i
        }
    }),
    ...bishopsPlayerOne.map((position, i) => {
        return {
            pieceName: bishop,
            tilePosition: position,
            id: i + 8
        }
    }),
    ...rooksPlayerOne.map((position, i) => {
        return {
            pieceName: rook,
            tilePosition: position,
            id: i + 10
        }
    }),
    ...horsesPlayerOne.map((position, i) => {
        return {
            pieceName: horse,
            tilePosition: position,
            id: i + 12
        }
    }),
    ...queenPlayerOne.map((position, i) => {
        return {
            pieceName: queen,
            tilePosition: position,
            id: i + 14
        }
    }),
    ...kingPlayerOne.map((position, i) => {
        return {
            pieceName: king,
            tilePosition: position,
            id: i + 15
        }
    }),
]


// player two piece info
const piecesPlayerTwo = [
    ...pawnsPlayerTwo.map((position, i) => {
        return {
            pieceName: pawn,
            tilePosition: position,
            id: i + 16
        }
    }),
    ...bishopsPlayerTwo.map((position, i) => {
        return {
            pieceName: bishop,
            tilePosition: position,
            id: i + 24
        }
    }),
    ...rooksPlayerTwo.map((position, i) => {
        return {
            pieceName: rook,
            tilePosition: position,
            id: i + 26
        }
    }),
    ...horsesPlayerTwo.map((position, i) => {
        return {
            pieceName: horse,
            tilePosition: position,
            id: i + 28
        }
    }),
    ...queenPlayerTwo.map((position, i) => {
        return {
            pieceName: queen,
            tilePosition: position,
            id: i + 30
        }
    }),
    ...kingPlayerTwo.map((position, i) => {
        return {
            pieceName: king,
            tilePosition: position,
            id: i + 31
        }
    }),
]



export { piecesPlayerOne, piecesPlayerTwo, }
