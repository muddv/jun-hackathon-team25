let lim = 6
let current
let cells = new Map<string, MazeCell>()
let stack: number[][] = []
let visited: number[][] = []

function generateKey(x: number, y: number) {
  return x.toString().concat(y.toString())
}

class MazeCell {
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.key = generateKey(this.x, this.y)
    if (this.x > 0) this.neighbors.push(generateKey(this.x - 1, this.y))
    if (this.x < lim) this.neighbors.push(generateKey(this.x + 1, this.y))
    if (this.y > 0) this.neighbors.push(generateKey(this.x, this.y - 1))
    if (this.x < lim) this.neighbors.push(generateKey(this.x, this.y + 1))
  }
  x
  y
  key
  visited = false
  neighbors: string[] = []

  traverse(): MazeCell | number {
    console.log('here')
    if (!this.visited) {
      cells.delete(this.key)
      stack.push([this.x, this.y])
      visited.push([this.x, this.y])
    }
    this.visited = true
    if (this.neighbors.length > 0) {
      let index = getRandomInt(this.neighbors.length - 1)
      current = cells.get(this.neighbors[index].toString())!
      if (!current || current.visited === true) {
        this.neighbors.splice(index, 1)
        return this.traverse()
      }
      else {
        return current
      }
    }
    else {
      return jump()
    }
  }
}

export function makeMaze() {
  // insert into Map
  let rows = 4
  let cols = 4
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let key = generateKey(row, col)
      cells.set(key, new MazeCell(row, col))
    }
  }
  travel()
}

function travel() {
  let key = '00'
  let cell: MazeCell | number = cells.get(key)!
  do {
    if (typeof cell !== 'number') {
      console.log(cell.key)
      cell = cell.traverse()
    }
  } while (cell !== -1)
  console.log('done')
  console.log(stack)
  console.log("remains: ", cell)
  checkValid(stack)
}

function jump(): number | MazeCell {
  if (cells.size < 1) return -1
  return getRandomMapItem(cells)
}
function getRandomMapItem(map: Map<any, any>) {
  return map.get([...map.keys()][Math.floor(Math.random() * map.size)])
}

function getRandomInt(max: number) {
  max = Math.floor(max)
  return Math.floor(Math.random() * (max + 1))
}

function checkValid(arr: number[][]) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = arr.length - 1; j > 0; j--) {
      if (i === j) {
        continue
      }
      if (arr[i][0] === arr[j][0] && arr[i][1] === arr[j][1]) {
        console.log("SAME ARR ELS: ", arr[i], arr[j], "at ", i, j)
        break
      }
    }
  }
  console.log("Arr valid")
}
