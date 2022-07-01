import { useState } from 'react'
import './home.css'
import tiles from '../Tiles'
import {
    piecesPlayerOne, piecesPlayerTwo,
} from '../InitialPosition'
// import player one's piece moves
import PawnMovesPlayerOne from './Player One Piece moves/PawnMovesPlayerOne'
import RookMovesPlayerOne from './Player One Piece moves/RookMovesPlayerOne'
import HorseMovesPlayerOne from './Player One Piece moves/HorseMovesPlayerOne'
import BishopMovesPlayerOne from './Player One Piece moves/BishopMovesPlayerOne'
//import player two's piece positions
import PawnMovesPlayerTwo from './Player Two Piece Moves/PawnMovesPlayerTwo'
import HorseMovesPlayerTwo from './Player Two Piece Moves/HorseMovesPlayerTwo'
import RookMovesPlayerTwo from './Player Two Piece Moves/RookMovesPlayerTwo'
import BishopMovesPlayerTwo from './Player Two Piece Moves/BishopMovesPlayerTwo'

const boardLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

const Home = () => {
    const [playerOnePiecePositions, setPlayerOnePiecePositions] = useState(piecesPlayerOne)
    const [playerTwoPiecePositions, setPlayerTwoPiecePositions] = useState(piecesPlayerTwo)
    const [playerOneLostPieces, setPlayerOneLostPieces] = useState([])
    const [playerTwoLostPieces, setPlayerTwoLostPieces] = useState([])
    const [playerOneTurn, setPlayerOneTurn] = useState(false)
    const [availableMoves, setAvailableMoves] = useState([])
    const [currentPieceId, setCurrentPieceId] = useState(null)
    const [switchPawn, setSwitchPawn] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const checkGameOver = () => {
        playerOnePiecePositions.forEach(position => {
            if (position.id === 17) {
                if (position.tilePosition === null) {
                    setGameOver(true)
                }
            }
        })
        playerTwoPiecePositions.forEach(position => {
            if (position.id === 33) {
                if (position.tilePosition === null) {
                    setGameOver(true)
                }
            }
        })
    }
    const changePiecePosition = (eventTargetId) => {
        if (availableMoves !== []) {
            availableMoves.forEach(move => {
                if (move === eventTargetId) {
                    if (playerOneTurn) {
                        // player one 
                        const newPlayerOnePositions = playerOnePiecePositions.map(position => {
                            return Object.assign({}, position);
                        })
                        newPlayerOnePositions[currentPieceId - 1].tilePosition = move
                        setPlayerOnePiecePositions(newPlayerOnePositions)
                        setAvailableMoves([])
                        setPlayerOneTurn(false)
                    } else {
                        // player two
                        const newPlayerTwoPositions = playerTwoPiecePositions.map(position => {
                            return Object.assign({}, position);
                        })
                        newPlayerTwoPositions[currentPieceId - 17].tilePosition = move
                        setPlayerTwoPiecePositions(newPlayerTwoPositions)
                        setAvailableMoves([])
                        setPlayerOneTurn(true)
                    }
                }
            })
        }
    }
    const takeOpponentPiece = (eventTargetId) => {
        playerTwoPiecePositions.forEach((position, i) => {
            availableMoves.forEach(move => {
                if (move === position.tilePosition && eventTargetId === position.tilePosition) {
                    const newPlayerTwoPositions = playerTwoPiecePositions.map(positions => {
                        return Object.assign({}, positions)
                    })
                    newPlayerTwoPositions[i].tilePosition = null
                    const newPlayerTwoLostPiece = playerTwoLostPieces.concat(newPlayerTwoPositions[i])
                    setPlayerTwoLostPieces(newPlayerTwoLostPiece)
                    setPlayerTwoPiecePositions(newPlayerTwoPositions)
                    setAvailableMoves([])
                }
            })
        })
        playerOnePiecePositions.forEach((position, i) => {
            availableMoves.forEach(move => {
                if (move === position.tilePosition && eventTargetId === position.tilePosition) {
                    const newPlayerOnePositions = playerOnePiecePositions.map(positions => {
                        return Object.assign({}, positions)
                    })
                    newPlayerOnePositions[i].tilePosition = null
                    const newPlayerOneLostPiece = playerOneLostPieces.concat(newPlayerOnePositions[i])
                    setPlayerOneLostPieces(newPlayerOneLostPiece)
                    setPlayerOnePiecePositions(newPlayerOnePositions)
                    setAvailableMoves([])
                }
            })
        })
    }
    const replacePawn = (eventTargetId) => {
        if (eventTargetId.includes('a') && currentPieceId !== null && currentPieceId < 9) {
            setSwitchPawn(true)
        }
    }
    const changePiece = (newSelectedPiece) => {
        playerOnePiecePositions.forEach(position => {
            if (position.id === currentPieceId) {
                position.pieceName = newSelectedPiece.pieceName
            }
        })
        setSwitchPawn(false)
    }
    const getAvailableMoves = (individualPiece) => {
        // player one
        PawnMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves)
        RookMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves)
        HorseMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, setAvailableMoves)
        BishopMovesPlayerOne(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves)
        // player two
        PawnMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves)
        RookMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves)
        HorseMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, setAvailableMoves)
        BishopMovesPlayerTwo(individualPiece, boardLetters, playerTwoPiecePositions, playerOnePiecePositions, setAvailableMoves)
    }
    const renderPiecePosition = (boardPosition) => {
        let playerPieces = [playerOnePiecePositions, playerTwoPiecePositions]
        return playerPieces.map(playerArray => {
            return playerArray.map(individualPiece => {
                if (individualPiece.tilePosition === boardPosition) {
                    let className
                    if (individualPiece.id < 17) {
                        className = 'playerOnePieces'
                        // } else if (individualPiece.id > 16 && individualPiece.id < 34) {
                    } else {
                        className = 'playerTwoPieces'
                    }
                    return <img onClick={() => {
                        setCurrentPieceId(individualPiece.id)
                        getAvailableMoves(individualPiece)
                    }} className={className} src={individualPiece.pieceName} alt="" key={individualPiece.id} />
                }
            })
        })
    }
    const colorBoard = () => {
        return tiles.map(piece => {
            for (let i in boardLetters) {
                if (piece.position.includes(boardLetters[i])) {
                    const isNumberEven = piece.position[1] % 2 === 0
                    const isLetterIndexEven = i % 2
                    let tile
                    if ((isNumberEven && !isLetterIndexEven) || (!isNumberEven && isLetterIndexEven)) {
                        tile = 'blackTile'
                    } else {
                        tile = 'whiteTile'
                    }
                    return <div onClick={(e) => {
                        changePiecePosition(e.target.id)
                        takeOpponentPiece(e.target.id)
                        replacePawn(e.target.id)
                        checkGameOver()
                    }} key={piece.position} id={piece.position} className={tile}>{renderPiecePosition(piece.position)}
                        <div className='boardPositions'>{piece.position}</div>
                    </div>
                }
            }
        })
    }
    return (
        <>
            {gameOver && <div>Game Over</div>}
            <div className='gameBoard'>
                {colorBoard()}
            </div>
            {switchPawn &&
                <div className='pickNewPieceContainer'>Pick a piece:
                    <div className='pickNewPiece'>
                        {playerOnePiecePositions.map(position => {
                            if (position.id > 9 && position.id !== 12 && position.id !== 14 && position.id !== 16) {
                                return <img onClick={() => {
                                    changePiece(position)
                                }} src={position.pieceName} alt="" key={position.id} />
                            }
                        })}
                        {playerTwoPiecePositions.map(position => {
                            if (position.id > 9 && position.id !== 12 && position.id !== 14 && position.id !== 16) {
                                return <img onClick={() => {
                                    changePiece(position)
                                }} src={position.pieceName} alt="" key={position.id} />
                            }
                        })}
                    </div>
                </div>
            }
        </>
    )
}

export default Home
