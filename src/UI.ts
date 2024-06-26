import { resetTilemap } from "./main";
import { autoTiler } from "./main";
import {
  dirtSprite,
  grassSpritestheet,
  loader,
  Resources,
  snowSprite,
  snowSpritestheet,
  stoneSprite,
  stoneSpritestheet,
} from "./assets/resources";

export const model = {
  selectBase: undefined as HTMLSelectElement | undefined,
  selectTileset: undefined as HTMLSelectElement | undefined,
  isLoaded: false,
  reset: (e: any, m: any) => {
    resetTilemap();
  },
  updateBaseTile: (e: any, m: any, o: any, a: any, b: any) => {
    switch (m.selectBase.value) {
      case "stone":
        autoTiler.setBaseTiles(stoneSprite);
        autoTiler.draw();
        break;
      case "dirt":
        autoTiler.setBaseTiles(dirtSprite);
        autoTiler.draw();
        break;
      case "snow":
        autoTiler.setBaseTiles(snowSprite);
        autoTiler.draw();
        break;
    }
  },
  updateTileset: (e: any, m: any, o: any, a: any, b: any) => {
    switch (m.selectTileset.value) {
      case "grass":
        autoTiler.setTileset(grassSpritestheet);
        autoTiler.draw();
        break;
      case "rock":
        autoTiler.setTileset(stoneSpritestheet);
        autoTiler.draw();
        break;
      case "snow":
        autoTiler.setTileset(snowSpritestheet);
        autoTiler.draw();
    }
  },
};
export const template = `
<style> 
    canvas{ 
        position: fixed; 
        top:50%; 
        left:50%; 
        transform: translate(-50% , -50%); 
    }
    hud-layer{
        width: 800px;
        height: 600px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
    }
    button{
        padding: 5px;
        margin: 5px;
        border-radius: 5px;
        background-color: #ccc;
        border: 1px solid #000;
        cursor: pointer;
        font-size: 24px;
        color: #0000ff;
    }
    select {
        padding: 5px;
        font-size: 24px;
        margin: 5px;
        border-radius: 5px;
        background-color: #ccc;
        color: #0000ff;
      }
    label{
        font-size: 24px;
        color: #0000ff;
    }
    .HUD{
        display: flex;
        justify-content: center;
        gap: 10px;
        width: 100%;
        margin-top: 10px;
        align-items: center;
        pointer-events: auto;
    }
</style> 
<div> 
    <canvas id='cnv'> </canvas> 
    <hud-layer \${===isLoaded}>
        <div class="HUD">
            <button \${click@=>reset} title="Reset Tilemap">Reset</button>
            <label>Select a top layer</label>
            <select \${==>selectTileset} \${change@=>updateTileset}>
                <option value="grass">Grass</option>
                <option value="rock">Rock</option>
                <option value="snow">Snow</option>
            </select>
            <label>Select a Ground Layer</label>
            <select \${==>selectBase} \${change@=>updateBaseTile}>
                <option value="dirt">Dirt</option>
                <option value="stone">Stone</option>
                <option value="snow">Snow</option>
            </select>
        </div>
    </hud-layer>
</div>`;
