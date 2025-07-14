const express = require("express");
const router = express.Router();

router.post("/sudoku", (req, res) => {
  Object.keys(req.body.text).forEach((key) => {
    newkey = key.substring(1);
    console.log(newkey, req.body.text[key]);
  });
  sudoku = req.body.text
  var matrix = [];
  for (var i = 0; i < 9; i++) {
    matrix[i] = [];
    for (var j = 0; j < 9; j++) {
        matrix[i][j] = 0;
      /* if(req.body.text.contains("a" + i.toString() + j.toString())){
          console.log (i.toString() + j.toString())
      } */
    }
  }
  console.log(matrix);
});

module.exports = router;
