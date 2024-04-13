var express = require("express");
var router = express.Router();

class character {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
    }
}

const waldo = new character("waldo", [59, 65], [34, 45])
const odlaw = new character("odlaw", [8, 13], [32, 42])
const wizzard = new character("wizzard", [25, 30], [32, 42])

let matches = []
let characterFound = []

router.post("/check", function(req, res, next) {
    let name = req.body.name;
    let x = req.body.currentX;
    let y = req.body.currentY;



    const is_range = (cord, range) =>   cord >= range[0] && cord <= range[1];

    [waldo, odlaw, wizzard].forEach(character => {
        if (character.name === name && is_range(x, character.x) && is_range(y, character.y)) {
            if (!characterFound.includes(character.name)) {
                matches.push(character);
                characterFound.push(character.name);
            }
        }
    });

    if (matches.length > 0) {
        res.json({ success: true, characters: matches});
    } else {
        res.json({ success: false, message: "No matching character found." });
    }

    console.log(matches)
})



module.exports = router;
