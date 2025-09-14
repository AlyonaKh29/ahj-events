import GameField from "../GameField/GameField";

export default class GoblinGame {
  constructor(options) {
    this.width = options.width;
    this.height = options.height;
    this.currentCellId = null;
    this.character = null;
    this.intervalId = null;
    this.imageSrc = options.image;
    this.handleClick = this.handleClick.bind(this);
    this.characterClicked = false;
    this.hits = document.querySelector(".hits");
    this.misses = document.querySelector(".misses");
    this.maxMisses = options.misses;
    this.first = true;

    this.gameField = new GameField(this.width, this.height);
    this.gameField.create();
    this.createCharacter();
    this.character.addEventListener("click", this.handleClick);
    this.startMoving();
  }

  createCharacter() {
    // Создание персонажа.
    this.character = document.createElement("img");
    this.character.src = this.imageSrc;
    this.character.classList.add("character");
  }

  moveCharacter() {
    /** Удаление персонажа из текущей ячейки и перемещение в другую.
     *
     * Если это первое появление персонажа, то промах не засчитывается.*/
    if (this.character.parentNode) this.character.remove();
    if (!this.characterClicked && !this.first) {
      this.misses.textContent = Number(this.misses.textContent) + 1;
    }
    this.checkCounter();
    this.characterClicked = false;
    this.currentCellId = this.gameField.getRandomCellId(this.currentCellId);
    const newCell = this.gameField.getCell(this.currentCellId);
    newCell.append(this.character);
    if (this.first) this.first = false;
  }

  startMoving() {
    // Начало автоматического перемещения персонажа.
    this.intervalId = setInterval(() => {
      this.character.classList.remove("hidden");
      setTimeout(() => {
        this.character.classList.add("hidden");
      }, 1000);
      this.moveCharacter();
    }, 2000);
  }

  stopMoving() {
    // Остановка перемещения, обнуление счетчиков.
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      if (this.character.parentNode) this.character.remove();
      this.hits.textContent = 0;
      this.misses.textContent = 0;
      this.currentCellId = null;
      this.characterClicked = false;
      this.first = true;
    }
  }

  handleClick() {
    // Обработка попадания. Нельзя ударить по персонажу больше 1 раза.
    if (this.characterClicked) return;
    this.characterClicked = true;
    this.hits.textContent = Number(this.hits.textContent) + 1;
    this.checkCounter();
  }

  checkCounter() {
    // Подсчет промахов.
    if (Number(this.misses.textContent) === this.maxMisses) {
      setTimeout(() => {
        this.gameOver();
      }, 10);
    }
  }

  gameOver() {
    alert("Вы проиграли. Начнём сначала?");
    this.stopMoving();
    this.startMoving();
  }
}
