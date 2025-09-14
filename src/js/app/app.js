import GoblinGame from "../Game/GoblinGame/GoblinGame";
import goblinImage from "../../img/goblin.png";

export default function startGame() {
  new GoblinGame({
    width: 4,
    height: 4,
    image: goblinImage,
    misses: 5,
  });
}

document.addEventListener("DOMContentLoaded", startGame);
