import React from 'react'
import ReactDOM from 'react-dom'
import Grid from './grid'
import utils from './utils'

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
    padding: '10px 25px'
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      cells: [], 
      level: 'beginner' 
    }
  }

  componentDidMount() {
    this.newGame()
  }

  newGame() {
    const { rows, columns, mines } = LEVELS[this.state.level]
    const minesList = utils.generateMines(rows, columns, mines)
    const cells = utils.generateCells(rows, columns, minesList)

    this.setState({ cells })
  }

  onClickCell(cell) {
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
          onClickCell={cell => this.onClickCell(cell)}
        />

        <button
          style={styles.newGame}
          onClick={() => this.newGame()}
        >
          {'New Game'}
        </button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
