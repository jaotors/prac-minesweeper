import React from 'react'

export default class Cell extends React.Component {
  render() {
    const value = this.props.isMine ? 'X' : this.props.nearby
    const styles = this.createStyles()

    return (
      <button
        style={styles.cell}
        status={this.props.status}
        onClick={() => this.props.onClick()}
        disabled={(this.props.status === 'open' ? true : false) || (this.props.gameover) ? true : false}
      >
        {this.props.status === 'open' && !!value ? value : ''}
      </button>
    )
  }

  createStyles() {
    return {
      cell: {
        verticalAlign: 'top',
        width: '40px',
        height: '40px',
        fontSize: '14px',
        textAlign: 'center',
        outline: 'none',
        backgroundColor: this.props.status === 'open' ? '#eee' : '#ccc'
      }
    }
  }
}

Cell.propTypes = {
  isMine: React.PropTypes.bool,
  status: React.PropTypes.oneOf(['close', 'open']),
  onClick: React.PropTypes.func.isRequired
}

Cell.defaultProps = {
  status: 'close'
}
