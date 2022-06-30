import pawn from './images/pawn.png'
import bishop from './images/bishop.png'
import king from './images/king.png'
import queen from './images/queen.png'
import rook from './images/rook.png'
import horse from './images/horse.png'

// player one beginning positions
const pawnsPlayerOne = ['g1', 'g2', 'g3', 'e4', 'g5', 'c6', 'g7', 'g8']
const bishopsPlayerOne = ['f3', 'h6']
const rooksPlayerOne = ['h1', 'h8']
const horsesPlayerOne = ['h2', 'h7']
const queenPlayerOne = ['h4']
const kingPlayerOne = ['h5']

// player two beginning position
const pawnsPlayerTwo = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8']
const bishopsPlayerTwo = ['a3', 'a6']
const rooksPlayerTwo = ['a1', 'a8']
const horsesPlayerTwo = ['a2', 'a7']
const queenPlayerTwo = ['a4']
const kingPlayerTwo = ['a5']

// player one piece info
const piecesPlayerOne = [
    ...pawnsPlayerOne.map((position, i) => {
        return {
            pieceName: pawn,
            tilePosition: position,
            id: i + 1
        }
    }),
    ...bishopsPlayerOne.map((position, i) => {
        return {
            pieceName: bishop,
            tilePosition: position,
            id: i + 9
        }
    }),
    ...rooksPlayerOne.map((position, i) => {
        return {
            pieceName: rook,
            tilePosition: position,
            id: i + 11
        }
    }),
    ...horsesPlayerOne.map((position, i) => {
        return {
            pieceName: horse,
            tilePosition: position,
            id: i + 13
        }
    }),
    ...queenPlayerOne.map((position, i) => {
        return {
            pieceName: queen,
            tilePosition: position,
            id: i + 15
        }
    }),
    ...kingPlayerOne.map((position, i) => {
        return {
            pieceName: king,
            tilePosition: position,
            id: i + 16
        }
    }),
]


// player two piece info
const piecesPlayerTwo = [
    ...pawnsPlayerTwo.map((position, i) => {
        return {
            pieceName: pawn,
            tilePosition: position,
            id: i + 17
        }
    }),
    ...bishopsPlayerTwo.map((position, i) => {
        return {
            pieceName: bishop,
            tilePosition: position,
            id: i + 25
        }
    }),
    ...rooksPlayerTwo.map((position, i) => {
        return {
            pieceName: rook,
            tilePosition: position,
            id: i + 27
        }
    }),
    ...horsesPlayerTwo.map((position, i) => {
        return {
            pieceName: horse,
            tilePosition: position,
            id: i + 29
        }
    }),
    ...queenPlayerTwo.map((position, i) => {
        return {
            pieceName: queen,
            tilePosition: position,
            id: i + 31
        }
    }),
    ...kingPlayerTwo.map((position, i) => {
        return {
            pieceName: king,
            tilePosition: position,
            id: i + 33
        }
    }),
]



export { piecesPlayerOne, piecesPlayerTwo, }
