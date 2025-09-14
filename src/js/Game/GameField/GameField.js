export default class GameField {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.mainElement = document.querySelector(".content");
  }

  create() {
    const container = document.createElement("div");
    container.classList.add("expelling-game");
    this.mainElement.append(container);

    for (let i = 1; i <= this.width * this.height; i++) {
      const cell = document.createElement("div");
      cell.id = `space${i}`;
      cell.classList.add("space");
      container.append(cell);
    }
  }

  getCell(index) {
    return document.getElementById(`space${index}`);
  }

  getRandomCellId(currentId) {
    let newId;
    do {
      newId = Math.floor(1 + Math.random() * this.width * this.height);
    } while (newId === currentId);
    return newId;
  }
}
