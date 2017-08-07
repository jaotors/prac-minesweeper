/**
 * generates random mine coordinates
 */
function getRandomCoordinates(rowCount, columnCount, mines) {
  const x = Math.floor(Math.random() * (0 - rowCount)) + 0
  const y = Math.floor(Math.random() * (0 - columnCount)) + 0

  const coordinates = `${x},${y}`

  if(mines.some(coord => coord !== coordinates)) {
    return coordinates
  }

  return getRandomCoordinates(rowCount, columnCount, mines)
}

export function generateMines(rowCount, columnCount, mineCount) {
  const mines = []
  /*
   * TODO create a method to generate an array of random
   * coordinates with uniform distribution e.g. ['0,1', '10,9', ...]
   */

  for(let i = 0; i < mineCount; i++) {
    const coordinates = getRandomCoordinates(rowCount, columnCount)
    mines.push(coordinates)
  }

  return mines
}

/**
 * generates cells with with mines
 */
export function generateCells(rowCount, columnCount, mines) {
  const cells = []

  /*
   * TODO create a method to generate an array of cells
   * with this structure:
    
    cells = [
      {x}: [
        {y}: {
          key,
          x,
          y,
          isMine,
          nearby,
          status
        }
      ]
    ]
    
    key = (string) identifier key
    x = (int) x position
    y = (int) y position
    isMine = (bool) is it a mine?
    nearby = (int) number of surrounding mines
    status = (string, open|close) by default, it should be closed

   */

  return cells
}

/**
 * returns the neighboring cells
 */
export function getNearbies(cells, row, col) {
  const nearbies = []

  /*
   * TODO create a method to get the nearby cells
   */

  return nearbies
}
