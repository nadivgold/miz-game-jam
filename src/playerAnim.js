import {knobs} from "./knobs.js"
import { playerTextureSwitcher } from "./textureAnimPlayer.js";


function animPlayer(player, scene){
        if(knobs.explosion.enabled){
            switch(knobs.playerAnimFrame){
                case 1:
                    knobs.playerAnimFrame = 2;
                    return playerTextureSwitcher("player","https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/player1.png", 1, true, scene);
                case 2: 
                    knobs.playerAnimFrame = 3;
                    return playerTextureSwitcher("player","https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/player2.png", 1, true, scene);
                case 3: 
                    knobs.playerAnimFrame = 1;
                    return playerTextureSwitcher("player","https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/player3.png", 1, true, scene);
                default:
                    return playerTextureSwitcher("player","https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/player1.png", 1, true, scene);
            }
        } else {
            switch(knobs.playerAnimFrame){
                case 1:
                    knobs.playerAnimFrame = 2;
                    return playerTextureSwitcher("player","https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/exploded1.png", 1, true, scene);
                case 2: 
                    knobs.playerAnimFrame = 3;
                    return playerTextureSwitcher("player","https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/exploded2.png", 1, true, scene);
                case 3: 
                    knobs.playerAnimFrame = 1;
                    return playerTextureSwitcher("player","https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/exploded3.png", 1, true, scene);
                default:
                    return playerTextureSwitcher("player","https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/exploded1.png", 1, true, scene);
            }
        }
   
}


export { animPlayer }