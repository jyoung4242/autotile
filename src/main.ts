import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import { Engine, DisplayMode, TileMap, Vector, PointerButton } from "excalibur";
import { model, template } from "./UI";
import { dirtSprite, grassSpritestheet, loader } from "./assets/resources";
import { AutoTiler } from "./autoTile";

// Load the Peasy UI
await UI.create(document.body, model, template).attached;

// Flags that are setup for controlling the mouse click/drag
let clickholdLeft = false;
let clickholdRight = false;

// Setup Excalibur Engine
const game = new Engine({
  width: 800, // the width of the canvas
  height: 600, // the height of the canvas
  canvasElementId: "cnv", // the DOM canvas element ID, if you are providing your own
  displayMode: DisplayMode.Fixed, // the display mode
});

// Define Tilemap
let tilemap = new TileMap({
  rows: 25,
  columns: 25,
  tileWidth: 16,
  tileHeight: 16,
});

// Setup Tilemap tiles for solid walls
for (let tile of tilemap.tiles) {
  tile.data.set("solid", true);
}

// Start the game
await game.start(loader);

// This enables the HUD layer to render
model.isLoaded = true;

// Setup autoTiler
export let autoTiler = new AutoTiler(tilemap, dirtSprite, grassSpritestheet);
tilemap = autoTiler.draw();

// Event listeners for mouse click/drag
tilemap.on("pointerdown", event => {
  event.nativeEvent.preventDefault();
  if (event.button == PointerButton.Middle) {
    logTileData(event);
  } else if (event.button == PointerButton.Left) {
    clickholdLeft = true;
    drawOnMap(event);
  } else if (event.button == PointerButton.Right) {
    clickholdRight = true;
    unDrawOnMap(event);
  }
});
tilemap.on("pointermove", event => {
  if (clickholdLeft) drawOnMap(event);
  if (clickholdRight) unDrawOnMap(event);
});
tilemap.on("pointerup", event => {
  if (event.button == PointerButton.Left) clickholdLeft = false;
  if (event.button == PointerButton.Right) clickholdRight = false;
});

// Add tilemap to scene
game.add(tilemap);
// Set camera position (centered on the tilemap)
game.currentScene.camera.pos = new Vector(175, 200);

// map draw function, sets a tile to not be solid
function drawOnMap(event: any) {
  //get tile index based on world coordinates of event
  const coords = event.worldPos;
  //coords is a vector, determine the x and y tile coordinates based on vector
  const x = Math.floor(coords.x / 16);
  const y = Math.floor(coords.y / 16);
  const index = y * 25 + x;
  // set the tile to be solid
  const myTile = tilemap.tiles[index].data.set("solid", false);
  autoTiler.updateMap(tilemap);
  tilemap = autoTiler.draw();
  tilemap.flagTilesDirty();
}

// Debug function, not needed in production
function logTileData(event: any) {
  const coords = event.worldPos;
  const x = Math.floor(coords.x / 16);
  const y = Math.floor(coords.y / 16);
  const index = y * 25 + x;
  console.log("Bitmask for index: ", index, " is:  ", autoTiler.readBitmask(index));
}

// this is the function that resets the tiles to be solid
function unDrawOnMap(event: any) {
  //get tile index based on world coordinates of event
  const coords = event.worldPos;
  //coords is a vector, determine the x and y tile coordinates based on vector
  const x = Math.floor(coords.x / 16);
  const y = Math.floor(coords.y / 16);
  const index = y * 25 + x;
  const myTile = tilemap.tiles[index].data.set("solid", true);
  autoTiler.updateMap(tilemap);
  tilemap = autoTiler.draw();
  tilemap.flagTilesDirty();
}

// Reset the tilemap data and redraw
export function resetTilemap() {
  for (let tile of tilemap.tiles) {
    tile.data.set("solid", true);
  }
  autoTiler.updateMap(tilemap);
  tilemap = autoTiler.draw();
  tilemap.flagTilesDirty();
}
