const canvas1 = document.querySelector<HTMLCanvasElement>("#canvas")!
const ctx1 = canvas1.getContext("2d")!

function main() {
  // drawGrid();
  generateMaze()
}

function drawGrid() {
  let boxWidth = 900
  let boxHeight = 900
  let boxPadding = 10
  let move = 0.5
  let tileSize = 50
  let color = "#0ff000"
 
  for (let x = 0; x <= boxWidth; x += tileSize) {
    ctx.moveTo(move + x + boxPadding, boxPadding)
    ctx.lineTo(move + x + boxPadding, boxHeight + boxPadding)
  }

  for (let x = 0; x <= boxHeight; x += tileSize) {
    ctx.moveTo(boxPadding, move + x + boxPadding)
    ctx.lineTo(boxWidth + boxPadding, move + x + boxPadding)
  }

  ctx.strokeStyle = color
  ctx.stroke()
}

main()
