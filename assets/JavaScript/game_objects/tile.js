class Tile {
    constructor(options) {
        this.xPos = options.x;
        this.yPos = options.y;
        this.type = this.typeReference(options.type);
        this.active = this.checkActiveStatus(options.active);
        this.relations = options.relations;
    }

    typeReference(type) {
        switch(type) {
        case "n":
            return "none";
        case "s":
            return "start";
        case "g":
            return "goal";
        case "c":
            return "collapsible";
        case "w":
            return "warp";
        case "a":
            return "activator";
        case "b":
            return "bridge";
        }
    }

    checkActiveStatus(status) {
        return status === undefined ? true : status;
    }

    toggleActive() {
        if (this.type === "bridge") {
            this.active = !this.active;
        }
    }
}

module.exports = Tile;
