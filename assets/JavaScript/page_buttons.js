class PageButtons {
  constructor() {
    this.toggleImage = this.toggleImage.bind(this);

    this.activateTutorialImages();
    this.activateDirections();
  }

  activateTutorialImages() {
    const imageIds = ['falling', 'goal', 'move', 'transform'];
    imageIds.forEach(id => {
      let button = document.getElementById(`${id}-button`);
      let displayImage = document.getElementById(`${id}`);
      button.addEventListener("click", () => {
        this.toggleImage(displayImage);
      });
    });
  }

  activateDirections() {
    const button = document.getElementById('direct-button');
    const display = document.getElementById('direct');
    button.addEventListener("click", () => {
      this.toggleDirections(display);
    });
  }

  toggleImage(image) {
    image.className === "hidden" ?
      image.className = "show" : image.className = "hidden";
  }

  toggleDirections(directions) {
    directions.className === "hidden" ?
      directions.className = "display" : directions.className = "hidden";
  }
}

module.exports = PageButtons;
