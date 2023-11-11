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

  traverse(): MazeCell | -1 {
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
      return -1
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
  let cell = getRandomCell()
  if (cell !== -1) {
  travel(cell)
  }
}

function travel(cell: MazeCell | -1) {
  if (cell !== -1) {
    do {
      if (typeof cell !== 'number') {
        console.log(cell.key)
        cell = cell.traverse()
      }
    } while (cell !== -1)
    checkValid(stack)
    // TODO: handle maze generation from stack 
    let newCell = backTrack()
    if (newCell === -1) {
      drawMaze(stack)
      stack = []
      travel(getRandomCell())
      return
    }
    travel(newCell)
  }
}

function backTrack(): MazeCell | -1 {
  for (let i = stack.length - 2; i > 0; i--) {
    let cell = cells.get(generateKey(stack[i][0], stack[i][1]))
    let newCell
    if (cell) newCell = cell!.traverse()
    if (newCell && typeof newCell !== 'number') {
      return newCell
    }
  }
  return -1
}

function getRandomCell(): -1 | MazeCell {
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

function drawMaze(stack: number[][]) {
  const canvas = document.querySelector<HTMLCanvasElement>("#hehe")!
  const ctx = canvas.getContext("2d")!
  let boxWidth = 200
  let boxHeight = 200
  let boxPadding = 10
  let move = 0.5
  let tileSize = 50
  let color = "#0f00ff"
  


  // squares
  // if square at stack[i] is connected, paint it
    ctx.beginPath();

    for (let i = 0; i < stack.length - 1; i++) {
      ctx.beginPath()
      ctx.moveTo(stack[i][0] * 100, stack[i][1] * 100)
      ctx.lineTo(stack[i + 1][0] * 100, stack[i + 1][1] * 100)
      ctx.stroke()
      
  }

   ctx.strokeStyle = color
   ctx.stroke()

}
