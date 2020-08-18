import {knobs} from '../knobs.js';

function pauseToggle(inputMap){
    if(inputMap["p"] || inputMap["P"])
        if(knobs.state === "play")
            knobs.state = "pause";
    if(inputMap["Escape"])
        if(knobs.state === "pause")
                knobs.state = "play";
    console.log(knobs.state)
}

export {pauseToggle}