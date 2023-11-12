const canvas = document.querySelector<HTMLCanvasElement>("#can")!
canvas.style.background = "black"
console.log(canvas)
const ctx = canvas.getContext('2d')!

const size = 600
const rows = 50
const cols = 50
const grid: MazeCell[][] = []
const stack: MazeCell[] = []

const markedColor = "#FF00F0"
const cellColor = "#00FF00"

class MazeCell {
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.visited = false
    this.walls = { T: true, B: true, L: true, R: true }
  }
  x; y; visited; walls

  draw() {
    let x = (this.x * size) / cols
    let y = (this.y * size) / rows
     ctx.strokeStyle = cellColor
    // ctx.fillStyle = gridColor
    // ctx.lineWidth = 2

    if (this.visited) this.mark()

    if (this.walls.T) {
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + size / cols, y)
      ctx.stroke()
    }

    if (this.walls.B) {
      ctx.beginPath()
      ctx.moveTo(x, y + size / rows)
      ctx.lineTo(x + size / cols, y + size / rows)
      ctx.stroke()
    }

    if (this.walls.R) {
      ctx.beginPath()
      ctx.moveTo(x + size / cols, y)
      ctx.lineTo(x + size / cols, y + size / rows)
      ctx.stroke()
    }

    if (this.walls.L) {
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x, y + size / rows)
      ctx.stroke()
    }
  }

  getNeighbor(): MazeCell | undefined {
    let neighbors = []
    if (this.x > 0) {
      let neighbor = grid[this.x - 1][this.y]
      !neighbor.visited && neighbors.push(neighbor)
    }
    if (this.x < rows - 1) {
      let neighbor = grid[this.x + 1][this.y]
      !neighbor.visited && neighbors.push(neighbor)
    }
    if (this.y > 0) {
      let neighbor = grid[this.x][this.y - 1]
      !neighbor.visited && neighbors.push(neighbor)
    }
    if (this.y < cols - 1) {
      let neighbor = grid[this.x][this.y + 1]
      !neighbor.visited && neighbors.push(neighbor)
    }
    if (neighbors.length) return neighbors[(getRandomInt(neighbors.length - 1))]
    return undefined
  }

  mark() {
    const markedSize = size / cols
    let row = this.x * size / cols + 1
    let col = this.y * size / cols + 1
    ctx.fillStyle = markedColor
    ctx.fillRect(row, col, markedSize, markedSize)
  }

  removeWall(neigbor: MazeCell) {
    let xDif = this.x - neigbor.x
    let yDif = this.y - neigbor.y

    if (xDif === 1) {
      this.walls.L = false
      neigbor.walls.R = false
    } else if (xDif === -1) {
      this.walls.R = false
      neigbor.walls.L = false
    }

    if (yDif === 1) {
      this.walls.T = false
      neigbor.walls.B = false
    }
    else if (yDif === -1) {
      this.walls.T = false
      neigbor.walls.B = false
    }
  }
}
let current: MazeCell
function generateGrid() {
  // insert into Map
  for (let x = 0; x < rows; x++) {
    let row = []
    for (let y = 0; y < cols; y++) {
      let cell = new MazeCell(x, y)
      row.push(cell)
      // cell.draw()
    }
    grid.push(row)
  }
  current = grid[0][0]
}

function traverseGrid() {
  current.visited = true

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].draw()
    }
  }


  let next = current.getNeighbor()
  if (next) {
    next.visited = true
    stack.push(current)
    current.mark()
    current.removeWall(next)
    current = next
  }
  else if (stack.length) {
    let cell = stack.pop()!
    current = cell
    current.mark()
  }
  if (!stack.length) { return }

  window.requestAnimationFrame(() => {
    traverseGrid()
  })
}

function getRandomInt(max: number) {
  max = Math.floor(max)
  return Math.floor(Math.random() * (max + 1))
}

generateGrid()
traverseGrid()

