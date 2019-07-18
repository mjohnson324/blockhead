/* global beforeEach test describe expect */

const Tile = require("../game_objects/tile");

let tile;

beforeEach(() => {
    tile = new Tile({ x: 0, y: 0, type: "n" });
});

test("Tile initializes with options", () => {
    expect(tile.xPos).toEqual(0);
    expect(tile.yPos).toEqual(0);
    expect(tile.type).toEqual("none");
});

test("Tiles are assigned the correct type", () => {
    const noType = tile.typeReference("n");
    const startType = tile.typeReference("s");
    const bridgeType = tile.typeReference("b");
    expect(noType).toEqual("none");
    expect(startType).toEqual("start");
    expect(bridgeType).toEqual("bridge");
});

describe("Tile activation", () => {
    let bridgeTile;
    beforeEach(() => {
        bridgeTile = new Tile({ x: 0, y: 0, type: "b", active: false });
    });

    test("Tiles default to active state", () => {
        expect(tile.active).toBeTruthy();
        expect(bridgeTile.active).toBeFalsy();
    });

    test("The active state of bridge tiles can be toggled", () => {
        bridgeTile.toggleActive();
        tile.toggleActive();
        expect(bridgeTile.active).toBeTruthy();
        expect(tile.active).toBeTruthy();
    });
});
