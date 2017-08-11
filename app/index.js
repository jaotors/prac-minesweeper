import React from 'react'
import ReactDOM from 'react-dom'
import Grid from './grid'
import { generateMines, generateCells, getNearbies } from './utils'

const LEVELS = {
  beginner: {
    rows: 9,
    columns: 9,
    mines: 10
  }
}

const styles = {
  newGame: {
    fontSize: '20px',
    padding: '10px 25px',
    marginRight: '10px'
  },
  row: {
    display: 'flex',
    alignItems: 'center'
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cells: [], 
      level: 'beginner',
      gameover: false,
      winner: false,
    }
  }

  componentDidMount() {
    this.newGame()
  }

  newGame() {
    const { rows, columns, mines } = LEVELS[this.state.level]
    const minesList = generateMines(rows, columns, mines)
    const cells = generateCells(rows, columns, minesList)

    this.setState({
      cells,
      gameover: false
    })
  }

  openNearby(cell, cells) {
    const nearbies = getNearbies(cells, cell.x, cell.y)
    cells[cell.x][cell.y].status = `open`
    nearbies.map(nearby => {
      if(nearby.status === `close`) {
        if(nearby.nearby > 0) {
          cells[nearby.x][nearby.y].status = `open`
        } else {
          cells = this.openNearby(nearby, cells)
        }
      }
    })

    return cells
  }

  onClickCell(cell) {
    /*
     * TODO handle click of cell
     * done - open if close
     *      - open ALL nearby cells if there are no nearby mines, until there's a number.
     * done - display game over if the cell is a mine and restrict clicking the grid
     */
    const { rows, columns, mines } = LEVELS[this.state.level]
    const gameover = (cell.isMine) ? true : false
    let cells = this.state.cells

    cells[cell.x][cell.y].status = `open`
    if(cell.nearby === 0 && !cell.isMine ) {
      cells = this.openNearby(cell, cells)
    }

    const check = this.state.cells.reduce((container, cell) => {
      return container.concat(cell)
    }, []).filter(cell => {
      return cell.status === `open` && !cell.isMine
    })
    const tilesToBeat = (rows * columns) - mines
    const winner = check.length === tilesToBeat

    this.setState({
      cells,
      gameover,
      winner
    })
  }

  render() {
    return (
      <div className="container">
        <h1>Minesweeper</h1>

        <Grid
          cells={this.state.cells}
          gameover={this.state.gameover}
          winner={this.state.winner}
          onClickCell={cell => this.onClickCell(cell)}
        />

        <div style={styles.row} >
          <button
            style={styles.newGame}
            onClick={() => this.newGame()}
          >
            {'New Game'}
          </button>
          {(this.state.gameover) &&
              <h2>GAME OVER</h2> }
          {(this.state.winner) &&
              <h2>WINNER</h2> }
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
