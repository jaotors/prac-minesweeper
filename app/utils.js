/**
 * generates random mine coordinates
 */
function getRandomCoordinates(...param) {
  const [rowCount, columnCount, mines] = param
  const x = Math.floor(Math.random() * (rowCount-1))
  const y = Math.floor(Math.random() * (columnCount-1))

  const randomMine = `${x},${y}`

  if(!(mines.some(coord => coord !== randomMine))) {
    return randomMine
  }
  return getRandomCoordinates(rowCount, columnCount, mines)
}

export const generateMines = (rowCount, columnCount, mineCount) => {
  const mines = []
  /*
   * TODO create a method to generate an array of random
   * coordinates with uniform distribution e.g. ['0,1', '10,9', ...]
   */
  for(let i = 0; i < mineCount; i++) {
    const coordinates = getRandomCoordinates(rowCount, columnCount, mines)
    console.log(coordinates)
    mines.push(coordinates)
  }
  return mines
}

/**
 * generates cells with with mines
 */
function getNearbyMines(...param) {
  const [isMine, x, y, rowCount, columnCount, mines] = param
  let nearby = 0
  if(!isMine) {
    let tempX = x
    let tempY = y

    tempX -= 2
    tempY -= 1

    for(let i = 0; i < 3; i++) {
      tempX++
      for(let j = 0; j < 3; j++) {
        mines.map(mine => {
          if((tempX > -1 || tempY > -1) || (tempX < columnCount || tempY < columnCount)) {
            if(`${tempX},${tempY}` === mine) {
              nearby++
            }
          }
          tempY++
        })
      }
    }
  }

  return nearby
}

export const generateCells = (rowCount, columnCount, mines) => {
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
  const cells = []
  const arrX = []

  for(let x = 0; x < rowCount; x++) {
    for(let y = 0; y < columnCount; y++) {
      const key = `${x},${y}`
      const isMine = mines.some(mine => mine === key)
      const nearby = getNearbyMines(isMine, x, y, rowCount, columnCount, mines)
      const status = `close`
      arrX.push({key, isMine, nearby, status})
    }
    cells.push(arrX)
  }

  return cells
}

/**
 * returns the neighboring cells
 */
export const getNearbies = (cells, row, col) => {
  const nearbies = []

  /*
   * TODO create a method to get the nearby cells
   */

  return nearbies
}
