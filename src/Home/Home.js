import { useState } from 'react'
import './home.css'
import tiles from '../Tiles'
import {
    piecesPlayerOne, piecesPlayerTwo,
} from '../InitialPosition'
// General functions
import getAvailableMoves from './General functions/getAvailablemoves'
import takeOpponentPiece from './General functions/takeOpponentsPiece'
import changePiecePosition from './General functions/changePiecePosition'


const Home = () => {
    const boardLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const [playerOnePiecePositions, setPlayerOnePiecePositions] = useState(piecesPlayerOne)
    const [playerTwoPiecePositions, setPlayerTwoPiecePositions] = useState(piecesPlayerTwo)
    const [playerOneTurn, setPlayerOneTurn] = useState(true)
    const [availableMoves, setAvailableMoves] = useState([])
    const [currentPiece, setCurrentPiece] = useState(null)
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
                        getAvailableMoves(individualPiece, boardLetters, playerOnePiecePositions, playerTwoPiecePositions, setAvailableMoves)
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
                        changePiecePosition(e.target.id, availableMoves, playerOneTurn, playerOnePiecePositions, currentPiece, setPlayerOnePiecePositions, setAvailableMoves, setPlayerOneTurn, playerTwoPiecePositions, setPlayerTwoPiecePositions)
                        takeOpponentPiece(e.target.id)
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
