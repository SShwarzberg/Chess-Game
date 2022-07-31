import pawn from './images/pawn.png'
import bishop from './images/bishop.png'
import king from './images/king.png'
import queen from './images/queen.png'
import rook from './images/rook.png'
import horse from './images/horse.png'

// player one initial positions
const pawnsPlayerOne = ['', '', '', '', '', '', '', '']
const bishopsPlayerOne = ['', '']
const rooksPlayerOne = ['f4', '']
const horsesPlayerOne = ['', '']
const queenPlayerOne = ['']
const kingPlayerOne = ['f5']

// player two initial position
const pawnsPlayerTwo = ['', '', '', '', '', '', '', '']
const bishopsPlayerTwo = ['', '']
const rooksPlayerTwo = ['', '']
const horsesPlayerTwo = ['', '']
const queenPlayerTwo = ['f1']
const kingPlayerTwo = ['']

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
