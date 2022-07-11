import { useState } from 'react'
import './home.css'
import tiles from '../Tiles'
import {
    piecesPlayerOne, piecesPlayerTwo,
} from '../InitialPosition'
// General functions
import getAvailableMoves from './General functions/getAvailablemoves'
import takeOpponentPiece from './General functions/takeOpponentsPiece'
import getNewAvailableMoves from './General functions/getNewAvailableMoves'


const Home = () => {
    const boardLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const [playerOnePiecePositions, setPlayerOnePiecePositions] = useState(piecesPlayerOne)
    const [playerTwoPiecePositions, setPlayerTwoPiecePositions] = useState(piecesPlayerTwo)
    const [playerOneTurn, setPlayerOneTurn] = useState(true)
    const [availableMoves, setAvailableMoves] = useState([])
    const [nextAvailableMoves, setNextAvailableMoves] = useState([])
    const [currentPiece, setCurrentPiece] = useState(null)

    // change pieces position
    const changePiecePosition = (eventTargetId, currentPiece, availableMoves, playerOneTurn, playerOnePiecePositions, setPlayerOnePiecePositions, setAvailableMoves, setPlayerOneTurn, playerTwoPiecePositions, setPlayerTwoPiecePositions) => {
        if (availableMoves !== []) {
            availableMoves.forEach(move => {
                if (move === eventTargetId) {
                    if (playerOneTurn) {
                        // player one 
                        const newPlayerOnePositions = playerOnePiecePositions.map(position => {
                            return Object.assign({}, position)
                        })
                        newPlayerOnePositions[currentPiece.id].tilePosition = move
                        setPlayerOnePiecePositions(newPlayerOnePositions)
                        setAvailableMoves([])
                        setPlayerOneTurn(false)
                        getNewAvailableMoves(newPlayerOnePositions, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setNextAvailableMoves)
                    } else {
                        // player two
                        const newPlayerTwoPositions = playerTwoPiecePositions.map(position => {
                            return Object.assign({}, position)
                        })
                        newPlayerTwoPositions[currentPiece.id - 16].tilePosition = move
                        setPlayerTwoPiecePositions(newPlayerTwoPositions)
                        setAvailableMoves([])
                        setPlayerOneTurn(true)
                        getNewAvailableMoves(newPlayerTwoPositions, boardLetters, playerOnePiecePositions, playerTwoPiecePositions)
                    }
                }
            })
        }
    }

    // renders pieces onto board as team one and team two
    const renderPiecePosition = (boardPosition) => {
        let playerPieces = [playerOnePiecePositions, playerTwoPiecePositions]
        return playerPieces.map(playerArray => {
            return playerArray.map(individualPiece => {
                if (individualPiece.tilePosition === boardPosition) {
                    let className
                    if (individualPiece.id < 16) {
                        className = 'playerOnePieces'
                    } else {
                        className = 'playerTwoPieces'
                    }
                    return <img onClick={() => {
                        setCurrentPiece(individualPiece)
                        getAvailableMoves(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves, nextAvailableMoves)
                    }} className={className} src={individualPiece.pieceName} alt="" key={individualPiece.id} />
                }
            })
        })
    }

    // colors board by iterating through squares 
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
                        changePiecePosition(e.target.id, currentPiece, availableMoves, playerOneTurn, playerOnePiecePositions, setPlayerOnePiecePositions, setAvailableMoves, setPlayerOneTurn, playerTwoPiecePositions, setPlayerTwoPiecePositions)
                        takeOpponentPiece(e.target.id, playerTwoPiecePositions, playerOnePiecePositions, availableMoves, setPlayerTwoPiecePositions, setAvailableMoves, setPlayerOnePiecePositions)
                    }}
                        key={piece.position}
                        id={piece.position}
                        className={tile}>
                        {renderPiecePosition(piece.position)}
                        <div className='boardPositions'>
                            {piece.position}
                        </div>
                    </div>
                }
            }
        })
    }
    return (
        <>
            <div className='whosTurn'>player&nbsp; {playerOneTurn && <p>one&nbsp;  </p>} {!playerOneTurn && <p>two&nbsp; </p>} turn</div>
            <div className='gameBoard'>
                {colorBoard()}
            </div>
        </>
    )
}

export default Home
