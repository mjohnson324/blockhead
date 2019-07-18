/* global beforeEach test describe expect */

const Block = require("../game_objects/block");
// The numbers associated with the block width and height are arbitrary.
// I found 30 to be a good default width and height for the block;
// not too big, not too small for the screen.

describe("Block helper functions", () => {
    let block;
    beforeEach(() => {
        block = new Block(30, { width: 60, height: 30 });
    });

    test("block dimensions can be checked at will", () => {
        expect(block.dimensions()).toEqual({ width: 60, height: 30 });
    });

    describe("positioning", () => {
        beforeEach(() => {
            block.setPosition({xPos: 0, yPos: 0 });
        });

        test("block position can be checked at will", () => {
            expect(block.position()).toEqual({ xPos: 0, yPos: 0 });
        });

        test("block changes position incrementally", () => {
            block.changePosition(1, 1);
            expect(block.position()).toEqual({ xPos: 30, yPos: 30 });
        });

        test("Block defaults to square when position is reset", () => {
            const testProperties = { xPos: 60, yPos: 60, width: 30, height: 30 };
            const newPosition = { xPos: 60, yPos: 60 };
            block.resetBlock(newPosition);
            expect(block.properties()).toEqual(testProperties);
        });
    });
});

describe("Square blocks becoming rectangular", () => {
    let block;
    let position;
    beforeEach(() => {
        block = new Block(30, { width: 30, height: 30 });
        block.setPosition({ xPos: 0, yPos: 0 });
    });

    test("Square block transforms correctly when expanding right", () => {
        position = { xPos: 30, yPos: 0 };
        block.transformBlock(1, 0);
        expect(block.position()).toEqual(position);
        expect(block.width).toBeGreaterThan(block.height);
    });

    test("Square block transforms correctly when expanding left", () => {
        position = { xPos: -60, yPos: 0 };
        block.transformBlock(-1, 0);
        expect(block.position()).toEqual(position);
        expect(block.width).toBeGreaterThan(block.height);
    });

    test("Square block transforms correctly when expanding upward", () => {
        position = { xPos: 0, yPos: -60 };
        block.transformBlock(0, -1);
        expect(block.position()).toEqual(position);
        expect(block.height).toBeGreaterThan(block.width);
    });

    test("Square block transforms correctly when expanding downward", () => {
        position = { xPos: 0, yPos: 30 };
        block.transformBlock(0, 1);
        expect(block.position()).toEqual(position);
        expect(block.height).toBeGreaterThan(block.width);
    });
});

describe("Wide rectangular blocks", () => {
    let wideBlock;
    beforeEach(() => {
        wideBlock = new Block(30, { width: 60, height: 30 });
        wideBlock.setPosition({xPos: 0, yPos: 0 });
    });

    describe("Moving without changing shape", () => {
        const wideBlockSize = { width: 60, height: 30 };
        test("Wide block retains shape when moving up", () => {
            wideBlock.transformBlock(0, 1);
            expect(wideBlock.dimensions()).toEqual(wideBlockSize);
        });

        test("Wide block retains shape when moving down", () => {
            wideBlock.transformBlock(0, -1);
            expect(wideBlock.dimensions()).toEqual(wideBlockSize);
        });
    });

    describe("Horizontal contractions", () => {
        const squareBlockSize = { width: 30, height: 30 };
        test("Wide block transforms correctly when contracting right", () => {
            const rightShift = { xPos: 60, yPos: 0 };
            wideBlock.transformBlock(1, 0);
            expect(wideBlock.dimensions()).toEqual(squareBlockSize);
            expect(wideBlock.position()).toEqual(rightShift);
        });

        test("Wide block transforms correctly when contracting left", () => {
            const leftShift = { xPos: -30, yPos: 0 };
            wideBlock.transformBlock(-1, 0);
            expect(wideBlock.dimensions()).toEqual(squareBlockSize);
            expect(wideBlock.position()).toEqual(leftShift);
        });
    });
});

describe("Tall rectangular blocks", () => {
    let tallBlock;
    beforeEach(() => {
        tallBlock = new Block(30, { width: 30, height: 60 });
        tallBlock.setPosition({ xPos: 0, yPos: 0 });
    });

    describe("Moving without changing shape", () => {
        const tallBlockSize = { width: 30, height: 60 };
        test("Tall block retains shape when moving left", () => {
            tallBlock.transformBlock(1, 0);
            expect(tallBlock.dimensions()).toEqual(tallBlockSize);
        });

        test("Tall block retains shape when moving right", () => {
            tallBlock.transformBlock(-1, 0);
            expect(tallBlock.dimensions()).toEqual(tallBlockSize);
        });
    });

    describe("Vertical contractions", () => {
        const squareBlockSize = { width: 30, height: 30 };
        test("Tall block transforms correctly when contracting upward", () => {
            const upShift = { xPos: 0, yPos: -30 };
            tallBlock.transformBlock(0, -1);
            expect(tallBlock.dimensions()).toEqual(squareBlockSize);
            expect(tallBlock.position()).toEqual(upShift);
        });

        test("Tall block transforms correctly when contracting downward", () => {
            const downShift = { xPos: 0, yPos: 60 };
            tallBlock.transformBlock(0, 1);
            expect(tallBlock.dimensions()).toEqual(squareBlockSize);
            expect(tallBlock.position()).toEqual(downShift);
        });
    });
});
