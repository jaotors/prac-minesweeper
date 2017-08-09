import React from 'react'
import Cell from './cell'

const styles = {
  grid: {
    fontSize: '0',
    margin: '20px 0'
  }
}
 
export default class Grid extends React.Component {
  render() {
    const cells = this.props.cells.map((row, y) => {
      return (
        <div key={y}>
          {row.map(
            cell => {
              return (
                <Cell {...cell} gameover={this.props.gameover} onClick={() => this.props.onClickCell(cell)}/>
              )}
          )}
        </div>
      )
    })

    return <div style={styles.grid}>{cells}</div>
  }
}
