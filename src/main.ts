const canvas = document.querySelector<HTMLCanvasElement>("#game-window")!

export const ctx = canvas.getContext('2d')!

const size = canvas.width = canvas.height = 500
const rows = 5
const cols = 5
let grid: MazeCell[][] = []
const stack: MazeCell[] = []

const markedColor = "#ffffff"
const cellColor = "#00FF00"
const playerColor = "#FF0000"
const finishCellColor = "#00FF00"
let current: MazeCell

let p: Player

class MazeCell {
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.visited = false
    this.walls = { T: true, B: true, L: true, R: true }
    this.color =  x == (cols - 1) && y === (rows - 1) ? finishCellColor : markedColor
    this.isGoal = false
  }
  x; y; visited; walls; color; isGoal

  draw() {
    let x = this.x * (size / cols)
    let y = this.y * (size / rows)
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
    ctx.fillStyle = this.color
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
      this.walls.B = false
      neigbor.walls.T = false
    }
  }
}

function generateGrid() {
  grid = []

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
}

function getRandomInt(max: number) {
  max = Math.floor(max)
  return Math.floor(Math.random() * (max + 1))
}



enum Directions  {T, B, R, L}
type Vector2 = {
  x: number
  y: number
}

class Player {
  constructor(x: number, y: number)  {
    this.x = x
    this.y = y
    this.color = playerColor
    this.draw()
    this.passed = []
  }
  x; y; color;  passed: MazeCell[]

  draw() {
    let cell = grid[this.x][this.y]
    cell.color = this.color
    cell.draw()
  }

  restart() {
    let cell = grid[this.x][this.y]
    this.passed.forEach(c => {
      c.color = markedColor
      c.draw()
    })
    cell.color = markedColor
    cell.draw()
    this.x = 0
    this.y = 0
    grid[0][0].color = playerColor
  }

  move(direction: Directions) {
    let cell = grid[this.x][this.y]
    let movement: Vector2 = {x: 0, y: 0}
    switch(direction) {
      case(Directions.T):
        if (!cell.walls.T && cell.y > 0) {
          movement.y--
        }
        break
      case(Directions.B):
        if (!cell.walls.B && cell.y < cols) {
          movement.y++
        }
        break
      case(Directions.R):
        if (!cell.walls.R &&cell.x < rows) {
          movement.x++
        }
        break
      case(Directions.L):
        if (!cell.walls.L && cell.x > 0) {
          movement.x--
        }
        break
      default:
        console.log('def')
    }
    this.x += movement.x
    this.y += movement.y
    cell.color = markedColor
    this.passed.push(cell)
    cell.draw()
    cell = grid[this.x][this.y]
    this.draw()
  }

  isFinished(): boolean {
    return this.x === (cols - 1) && this.y === (rows - 1)
  }
}


function checkFinished() {
  setTimeout(() => {
    if (p.isFinished()) {
      alert("WIN!!!")

      // TODO REDIRECT TO WIN PAGE
      return
    }

    checkFinished()
  }, 500)
}

function gameLoop() {
  window.addEventListener("keydown", (e) => {
    if (p.isFinished()) {
      return
    }

    if (e.key === 'w' || e.key === 'W') {
      p.move(Directions.T)
    }

    if (e.key === 's' || e.key === 'S') {
      p.move(Directions.B)
    }

    if (e.key === 'a' || e.key === 'A') {
      p.move(Directions.L)
    }

    if (e.key === 'd' || e.key === 'D') {
      p.move(Directions.R)
    }

    if (e.key === 'r') {
      p.restart()
    }

  })

  checkFinished()
}

function main() {
  generateGrid()

  do {
    traverseGrid()

  } while (stack.length)

  p = new Player(0, 0)

  gameLoop()
}

main()

