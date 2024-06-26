import * as ex from "excalibur";

import dirtTile from "./dirttile.png";
import snowTile from "./snowtile.png";
import stonetile from "./stonetile.png";
import grasstileset from "./grasstileset.png";
import snowtileset from "./snowtileset.png";
import rockytileset from "./rockytileset.png";

export const Resources = {
  DirtTile: new ex.ImageSource(dirtTile),
  SnowTile: new ex.ImageSource(snowTile),
  StoneTile: new ex.ImageSource(stonetile),
  GrassTileset: new ex.ImageSource(grasstileset),
  SnowTileset: new ex.ImageSource(snowtileset),
  RockyTileset: new ex.ImageSource(rockytileset),
} as const;

export const grassSpritestheet = ex.SpriteSheet.fromImageSource({
  image: Resources.GrassTileset,
  grid: {
    rows: 7,
    columns: 7,
    spriteWidth: 16,
    spriteHeight: 16,
  },
});

export const snowSpritestheet = ex.SpriteSheet.fromImageSource({
  image: Resources.SnowTileset,
  grid: {
    rows: 7,
    columns: 7,
    spriteWidth: 16,
    spriteHeight: 16,
  },
});

export const stoneSpritestheet = ex.SpriteSheet.fromImageSource({
  image: Resources.RockyTileset,
  grid: {
    rows: 7,
    columns: 7,
    spriteWidth: 16,
    spriteHeight: 16,
  },
});

export const dirtSprite = Resources.DirtTile.toSprite();
export const snowSprite = Resources.SnowTile.toSprite();
export const stoneSprite = Resources.StoneTile.toSprite();

export const loader = new ex.Loader();

for (let res of Object.values(Resources)) {
  loader.addResource(res);
}
