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

  onClickCell(cell) {
    const { rows, columns, mines } = LEVELS[this.state.level]
    const gameover = (cell.isMine) ? true : false
    const cells = this.state.cells.map(cel => {
      return (
        cel.reduce((container, c) => {
          if(c.key === cell.key) {
            c.status = `open`
          }
          return container.concat(c)
        },[])
      )
    })

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
    /*
     * TODO handle click of cell
     *      - open if close
     *      - open ALL nearby cells if there are no nearby mines, until there's a number.
     *      - display game over if the cell is a mine and restrict clicking the grid
     */
  }

  render() {
    return (
      <div className="container">
        <h1>Minesweeper</h1>

        <Grid
          cells={this.state.cells}
          gameover={this.state.gameover}
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
