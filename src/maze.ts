const canvas = document.querySelector<HTMLCanvasElement>("#can")!
console.log(canvas)
const ctx = canvas.getContext('2d')!

const size = 800
const rows = 10
const cols = 10
const grid: MazeCell[][] = []
const stack = []
const gridColor = "#000000"
let current

class MazeCell {
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.visited = false
    // TODO add walls
  }
  x; y; visited

  draw() {
    let x = (this.x * size) / cols
    let y = (this.y * size) / rows
    ctx.strokeStyle = gridColor
    // ctx.fillStyle = gridColor
    // ctx.lineWidth = 2

    // N
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + size / cols, y)
    ctx.stroke()
    
    // S
    ctx.beginPath()
    ctx.moveTo(x, y + size / rows)
    ctx.lineTo(x + size / cols, y + size / rows)
    ctx.stroke()

    // E
    ctx.beginPath()
    ctx.moveTo(x + size / cols, y)
    ctx.lineTo(x + size / cols, y + size / rows)
    ctx.stroke()

    // W
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x, y + size / rows)
    ctx.stroke()
  }
}

function generateMaze() {
  // insert into Map
  let rows = 10
  let cols = 10
  for (let x = 0; x < rows; x++) {
    let row = []
    for (let y = 0; y < cols; y++) {
      let cell = new MazeCell(x, y)
      row.push(cell)
      cell.draw()
    }
    grid.push(row)
  }
}

generateMaze()
