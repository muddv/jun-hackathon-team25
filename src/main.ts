import { makeMaze } from "./maze";

const canvas = document.querySelector<HTMLCanvasElement>("#hehe")!
const ctx = canvas.getContext("2d")!

function main() {
  drawGrid();
  makeMaze()
}

function drawGrid() {
  let boxWidth = 200
  let boxHeight = 200
  let boxPadding = 10
  let move = 0.5
  let tileSize = 50
  let color = "0x000000"
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
