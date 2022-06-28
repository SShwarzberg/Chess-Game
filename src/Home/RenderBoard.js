import { useState } from 'react'
import { piecesPlayerOne } from '../InitialPosition'
import { piecesPlayerTwo } from '../InitialPosition'
import tiles from '../Tiles'
import './home.css'

const RenderBoard = () => {
    const [playerOnePiecePositions, setPlayerOnePiecePositions] = useState(piecesPlayerOne)
    const [playerTwoPiecePositions, setPlayerTwoPiecePositions] = useState(piecesPlayerTwo)
    const [availableMoves, setAvailableMoves] = useState([])
    const [currentPieceId, setCurrentPieceId] = useState(null)
    const boardLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const changePiecePosition = (eventTargetId) => {
        if (availableMoves !== []) {
            availableMoves.map(move => {
                if (move === eventTargetId) {
                    const newPlayerOnePosition = [...playerOnePiecePositions]
                    newPlayerOnePosition[currentPieceId - 1].tilePosition = move
                    setPlayerOnePiecePositions(newPlayerOnePosition)
                    setAvailableMoves([])
                }
            })
        }
    }
    const getAvailableMoves = (individualPiece) => {
        let newAvailableMoves
        if (individualPiece.id < 9) {
            boardLetters.map((letter, i) => {
                if (individualPiece.tilePosition.includes(letter)) {
                    playerOnePiecePositions.map(position => {
                        if (position.tilePosition === individualPiece.tilePosition) {

                        }
                    })
                    newAvailableMoves = [
                        boardLetters[i - 1] + individualPiece.tilePosition[1]
                    ]
                    if (individualPiece.tilePosition.includes('g')) {
                        newAvailableMoves.push(boardLetters[i - 2] + individualPiece.tilePosition[1])
                    }
                    setAvailableMoves(newAvailableMoves)
                    setCurrentPieceId(individualPiece.id)
                }
            })
        }
    }
    const positionMap = (boardPosition) => {
        let playerPieces = [playerOnePiecePositions, playerTwoPiecePositions]
        return playerPieces = playerPieces.map(playerArray => {
            return playerArray.map(individualPiece => {
                if (individualPiece.tilePosition === boardPosition) {
                    let className
                    if (individualPiece.id < 17) {
                        className = 'playerOnePieces'
                    } else if (individualPiece.id > 16 && individualPiece.id < 34) {
                        className = 'playerTwoPieces'
                    }
                    return <img onClick={() => getAvailableMoves(individualPiece)} className={className} src={individualPiece.pieceName} alt="" key={individualPiece.id} />
                }
            })
        })
    }
    const renderBoard = () => {
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
                    }} key={piece.position} id={piece.position} className={tile}>{positionMap(piece.position)} hi</div>
                }
            }
        })
    }
    return (
        <div>{renderBoard()}</div>
    )
}

export default RenderBoard
