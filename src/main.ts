const canvas = document.querySelector<HTMLCanvasElement>("#game-window")!
const ctx = canvas.getContext("2d")!

function main() {
  drawGrid();
  registerPopUP();
}

function registerPopUP() {
  const key = "KeyC"
  const modal =  document.querySelector<HTMLDetailsElement>(".rules-modal details")
  if (!modal) {
    return
  }

  document.addEventListener("keydown", (ev) => {
    if (ev.code !== key) {
      return
    }

    modal.open = true
  })

  document.addEventListener("keyup", (ev) => {
    if (ev.code !== key) {
      return
    }

    modal.open = false
  })
}

function drawGrid() {
  const boxWidth = canvas.width = 600
  const boxHeight = canvas.height = 600

  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, boxWidth, boxHeight)

  const xCount = 12;
  const yCount = 12;

  const tileWidth = boxWidth / xCount;
  const tileHeight = boxHeight / yCount;
  const color = "0x000000"

  ctx.strokeStyle = color

  for (let i = 0; i < xCount; i += 1) {
    for (let j = 0; j < yCount; j += 1) {
      ctx.strokeRect(i * tileWidth, j * tileHeight, tileWidth, tileHeight)
    }
  }
}

main()
