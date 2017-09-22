class PageButtons {
  constructor() {
    this.activateButtons();
  }

  activateButtons() {
    this.directionButtons();
    this.fallButton();
    this.goalButton();
    this.moveButton();
    this.transformButton();
  }

  directionButtons () {
    const directions = document.getElementById('directions');
    const directionsDisplay = document.getElementById('direct');
    directionsDisplay.addEventListener("click", () => {
      this.toggleDirections(directions);
    });
  }

  fallButton() {
    const fallButton = document.getElementByClassName('falling');
    const fallImage = document.getElementByClassName('falling-hide');
    fallButton.addEventListener('click', () => {
      this.fallToggle(fallImage);
    });
  }

  goalButton() {
    const goalButton = document.getElementByClassName('goal');
    const goalImage = document.getElementByClassName('goal-hide');
    goalButton.addEventListener('click', () => {
      this.goalToggle(goalImage);
    });
  }

  moveButton() {
    const moveButton = document.getElementByClassName('move');
    const moveImage = document.getElementByClassName('move-hide');
    moveButton.addEventListener('click', () => {
      this.moveToggle(moveImage);
    });
  }

  transformButton() {
    const transformButton = document.getElementByClassName('transform');
    const transformImage = document.getElementByClassName('transform-hide');
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
    if (image.className === "move-hide") {
      image.className = "show";
    } else {
      image.className = "move-hide";
    }
  }

  transformToggle(image) {
    if (image.className === "transform-hide") {
      image.className = "show";
    } else {
      image.className = "transform-hide";
    }
  }

  fallToggle(image) {
    if (image.className === "fall-hide") {
      image.className = "show";
    } else {
      image.className = "fall-hide";
    }
  }

  goalToggle(image) {
    if (image.className === "goal-hide") {
      image.className = "show";
    } else {
      image.className = "goal-hide";
    }
  }
}

module.exports = PageButtons;
