class PageButtons {
  constructor() {
    this.activateButtons();
  }

  activateButtons() {
    this.directionButtons();
    this.fallButton();
    this.transformButton();
    this.goalButton();
    this.moveButton();
  }

  directionButtons () {
    const directionsButton = document.getElementById('direct-button');
    const directionsDisplay = document.getElementById('direct');
    directionsButton.addEventListener("click", () => {
      this.toggleDirections(directionsDisplay);
    });
  }

  fallButton() {
    const fallButton = document.getElementById('falling-button');
    const fallImage = document.getElementById('falling');
    fallButton.addEventListener('click', () => {
      this.fallToggle(fallImage);
    });
  }

  goalButton() {
    const goalButton = document.getElementById('goal-button');
    const goalImage = document.getElementById('goal');
    goalButton.addEventListener('click', () => {
      this.goalToggle(goalImage);
    });
  }

  moveButton() {
    const moveButton = document.getElementById('move-button');
    const moveImage = document.getElementById('move');
    moveButton.addEventListener('click', () => {
      this.moveToggle(moveImage);
    });
  }

  transformButton() {
    const transformButton = document.getElementById('transform-button');
    const transformImage = document.getElementById('transform');
    transformButton.addEventListener('click', () => {
      this.transformToggle(transformImage);
    });
  }

  toggleDirections(directions) {
    if (directions.className === "hidden") {
      directions.className = "display";
    } else {
      directions.className = "hidden";
    }
  }

  moveToggle(image) {
    if (image.className === "hidden") {
      image.className = "show";
    } else {
      image.className = "hidden";
    }
  }

  transformToggle(image) {
    if (image.className === "hidden") {
      image.className = "show";
    } else {
      image.className = "hidden";
    }
  }

  fallToggle(image) {
    if (image.className === "hidden") {
      image.className = "show";
    } else {
      image.className = "hidden";
    }
  }

  goalToggle(image) {
    if (image.className === "hidden") {
      image.className = "show";
    } else {
      image.className = "hidden";
    }
  }
}

module.exports = PageButtons;
