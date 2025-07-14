const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/player", async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.post("/player", (req, res) => {
  if (req.body.text == 1) {
    let csvRecordsArray = req.body.player.split(/\r\n|\n/);
    for (let i = 0; i < csvRecordsArray.length; i++) {
      let line = csvRecordsArray[i].split(",");
      player = new Player({
        uniqueID: line[0],
        name: line[2],
        age: line[4],
        club: line[3],
        price: line[5],
        heading: line[6],
        corners: line[7],
        crossing: line[8],
        tackling: line[9],
        finishing: line[10],
        dribling: line[11],
        longThrows: line[12],
        freeKick: line[13],
        marking: line[14],
        penalties: line[15],
        passing: line[16],
        firstTouch: line[17],
        longShots: line[18],
        technique: line[19],
        agression: line[20],
        antecipation: line[21],
        bravery: line[22],
        composure: line[23],
        concentration: line[24],
        decisions: line[25],
        determination: line[26],
        flair: line[27],
        workRate: line[28],
        leadership: line[29],
        positioning: line[30],
        offBall: line[31],
        teamWork: line[32],
        vision: line[33],
        acceleration: line[34],
        agility: line[35],
        naturalFitness: line[36],
        balance: line[37],
        strength: line[38],
        jumpingReach: line[39],
        stamina: line[40],
        pace: line[41],
      });
      player.ratings = playerRating(player);
      if (player.ratings.length >= 1) {
        player
          .save(player)
          .then((data) => { })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    res.send("Finished Import");
  } else {
    const player = new Player({
      name: req.body.name,
      age: req.body.age,
      uniqueID: req.body.uniqueID,
      name: req.body.name,
      age: req.body.age,
      club: req.body.club,
      price: req.body.price,
      heading: req.body.heading,
      corners: req.body.corners,
      crossing: req.body.crossing,
      tackling: req.body.tackling,
      finishing: req.body.finishing,
      dribling: req.body.dribling,
      longThrows: req.body.longThrows,
      freeKick: req.body.freeKick,
      marking: req.body.marking,
      penalties: req.body.penalties,
      passing: req.body.passing,
      firstTouch: req.body.firstTouch,
      longShots: req.body.longShots,
      technique: req.body.technique,
      agression: req.body.agression,
      antecipation: req.body.antecipation,
      bravery: req.body.bravery,
      composure: req.body.composure,
      concentration: req.body.concentration,
      decisions: req.body.decisions,
      determination: req.body.determination,
      flair: req.body.flair,
      workRate: req.body.workRate,
      leadership: req.body.leadership,
      positioning: req.body.positioning,
      offBall: req.body.offBall,
      teamWork: req.body.teamWork,
      vision: req.body.vision,
      acceleration: req.body.acceleration,
      agility: req.body.agility,
      naturalFitness: req.body.naturalFitness,
      balance: req.body.balance,
      strength: req.body.strength,
      jumpingReach: req.body.jumpingReach,
      stamina: req.body.stamina,
      pace: req.body.pace,
      ratings: null,
    });
    player.ratings = playerRating(player);
    console.log(player.ratings);
    if (player.ratings.length >= 1) {
      player
        .save(player)
        .then((data) => { })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});

router.delete("/player/:_id", (req, res) => {
  const id = req.params._id;
  Player.findByIdAndDelete(id).then((data) => {
    if (!data) {
      res.status(404).send({ message: "Player Not Found" });
    } else {
      res.send({ message: "player deleted" });
    }
  });
});

let MIN_RATING = 12

function fullBackRating(player) {
  let crossing = player.crossing * 0.08
  let dribling = player.dribling * 0.08
  let firstTouch = player.firstTouch * 0.05
  let passing = player.passing * 0.05
  let tackling = player.tackling * 0.03
  let technique = player.technique * 0.05
  let antecipation = player.antecipation * 0.03
  let composure = player.composure * 0.04
  let decisions = player.decisions * 0.06
  let flair = player.flair * 0.07
  let offBall = player.offBall * 0.06
  let teamWork = player.teamWork * 0.06
  let workRate = player.workRate * 0.08
  let acceleration = player.acceleration * 0.07
  let agility = player.agility * 0.03
  let balance = player.balance * 0.03
  let pace = player.pace * 0.05
  let stamina = player.stamina * 0.07
  return stamina + pace + balance + agility + acceleration + workRate + teamWork + offBall + flair + decisions
    + composure + antecipation + technique + tackling + passing + firstTouch + dribling + crossing;
}

function centerBackRating(player) {
  let heading = player.heading * 0.08
  let marking = player.marking * 0.1
  let firstTouch = player.firstTouch * 0.05
  let passing = player.passing * 0.08
  let tackling = player.tackling * 0.1
  let technique = player.technique * 0.05
  let antecipation = player.antecipation * 0.03
  let composure = player.composure * 0.07
  let decisions = player.decisions * 0.05
  let aggression = player.agression * 0.05
  let bravery = player.bravery * 0.05
  let concentration = player.concentration * 0.04
  let positioning = player.positioning * 0.06
  let vision = player.vision * 0.03
  let jumpingReach = player.jumpingReach * 0.05
  let pace = player.pace * 0.04
  let strength = player.strength * 0.07
  return heading + pace + marking + aggression + bravery + concentration + positioning + vision + decisions +
    composure + antecipation + technique + tackling + passing + firstTouch + jumpingReach + strength;
}

function halfBackRating(player) {
  let heading = player.heading * 0.04
  let marking = player.marking * 0.1
  let passing = player.passing * 0.06
  let tackling = player.tackling * 0.1
  let aggression = player.agression * 0.05
  let antecipation = player.antecipation * 0.07
  let bravery = player.bravery * 0.04
  let composure = player.composure * 0.06
  let concentration = player.concentration * 0.08
  let decisions = player.decisions * 0.05
  let positioning = player.positioning * 0.09
  let workRate = player.workRate * 0.07
  let teamWork = player.teamWork * 0.06
  let stamina = player.stamina * 0.07
  let strength = player.strength * 0.06
  return heading + workRate + marking + aggression + bravery + concentration + positioning
    + teamWork + decisions + composure + antecipation + stamina + tackling + passing + strength;
}

function playMakerRating(player) {
  let firstTouch = player.firstTouch * 0.11
  let passing = player.passing * 0.13
  let technique = player.technique * 0.11
  let antecipation = player.antecipation * 0.07
  let composure = player.composure * 0.08
  let decisions = player.decisions * 0.1
  let offBall = player.offBall * 0.05
  let workRate = player.workRate * 0.04
  let teamWork = player.teamWork * 0.1
  let vision = player.vision * 0.13
  let balance = player.balance * 0.08
  return firstTouch + passing + technique + antecipation + composure
    + decisions + offBall + workRate + teamWork + vision + balance;
}

function b2bRating(player) {
  let dribling = player.dribling * 0.04
  let finishing = player.finishing * 0.03
  let firstTouch = player.firstTouch * 0.05
  let longshots = player.longShots * 0.02
  let passing = player.passing * 0.1
  let tackling = player.tackling * 0.1
  let technique = player.technique * 0.03
  let aggression = player.agression * 0.04
  let antecipation = player.antecipation * 0.04
  let composure = player.composure * 0.04
  let decisions = player.decisions * 0.06
  let offBall = player.offBall * 0.05
  let positioning = player.positioning * 0.04
  let workRate = player.workRate * 0.08
  let teamWork = player.teamWork * 0.08
  let acceleration = player.acceleration * 0.03
  let balance = player.balance * 0.02
  let pace = player.pace * 0.03
  let stamina = player.stamina * 0.07
  let strength = player.strength * 0.04
  return firstTouch + passing + technique + antecipation + composure + decisions + offBall + workRate + teamWork + dribling +
    balance + finishing + longshots + tackling + aggression + positioning + acceleration + pace + stamina + strength;
}

function centerMidAttackingRating(player) {
  let dribling = player.dribling * 0.1
  let finishing = player.finishing * 0.04
  let firstTouch = player.firstTouch * 0.06
  let longshots = player.longShots * 0.02
  let passing = player.passing * 0.1
  let technique = player.technique * 0.1
  let antecipation = player.antecipation * 0.04
  let composure = player.composure * 0.04
  let decisions = player.decisions * 0.07
  let flair = player.flair * 0.06
  let offBall = player.offBall * 0.08
  let workRate = player.workRate * 0.07
  let vision = player.vision * 0.08
  let acceleration = player.acceleration * 0.05
  let balance = player.balance * 0.04
  let stamina = player.stamina * 0.05
  return firstTouch + passing + technique + antecipation + composure + decisions + offBall +
    workRate + flair + dribling + balance + finishing + longshots + vision + acceleration + stamina;
}

function insideForwardRating(player) {
  let dribling = player.dribling * 0.0875
  let finishing = player.finishing * 0.0875
  let firstTouch = player.firstTouch * 0.0875
  let longshots = player.longShots * 0.05
  let passing = player.passing * 0.05
  let technique = player.technique * 0.0875
  let antecipation = player.antecipation * 0.05
  let composure = player.composure * 0.05
  let flair = player.flair * 0.05
  let offBall = player.offBall * 0.0875
  let acceleration = player.acceleration * 0.0875
  let agility = player.agility * 0.0875
  let balance = player.balance * 0.0875
  let pace = player.pace * 0.05
  return firstTouch + passing + technique + antecipation + composure + agility
    + offBall + pace + flair + dribling + balance + finishing + longshots + acceleration;
}

function wingerRating(player) {
  let crossing = player.crossing * 0.12
  let dribling = player.dribling * 0.12
  let firstTouch = player.firstTouch * 0.06
  let passing = player.passing * 0.06
  let technique = player.technique * 0.11
  let antecipation = player.antecipation * 0.06
  let flair = player.flair * 0.07
  let offBall = player.offBall * 0.11
  let acceleration = player.acceleration * 0.12
  let agility = player.agility * 0.05
  let pace = player.pace * 0.12
  return firstTouch + passing + technique + antecipation
    + crossing + agility + offBall + pace + flair + dribling + acceleration;
}

function strikerRating(player) {
  let dribling = player.dribling * 0.0875
  let finishing = player.finishing * 0.0875
  let firstTouch = player.firstTouch * 0.0875
  let passing = player.passing * 0.0375
  let technique = player.technique * 0.0875
  let antecipation = player.antecipation * 0.0375
  let composure = player.composure * 0.0875
  let decisions = player.decisions * 0.0375
  let offBall = player.offBall * 0.0875
  let workRate = player.workRate * 0.0375
  let acceleration = player.acceleration * 0.0875
  let agility = player.agility * 0.0375
  let balance = player.balance * 0.0375
  let pace = player.pace * 0.0375
  let strength = player.strength * 0.0375
  return firstTouch + passing + technique + antecipation + strength + agility + offBall
    + pace + balance + dribling + acceleration + workRate + decisions + composure + finishing;
}

function completeStrikerRating(player) {
  let dribling = player.dribling * 0.068
  let finishing = player.finishing * 0.068
  let firstTouch = player.firstTouch * 0.068
  let heading = player.heading * 0.068
  let longShots = player.longShots * 0.03
  let passing = player.passing * 0.03
  let technique = player.technique * 0.068
  let antecipation = player.antecipation * 0.068
  let composure = player.composure * 0.068
  let decisions = player.decisions * 0.03
  let offBall = player.offBall * 0.068
  let teamWork = player.teamWork * 0.03
  let vision = player.vision * 0.03
  let workRate = player.workRate * 0.03
  let acceleration = player.acceleration * 0.068
  let agility = player.agility * 0.068
  let balance = player.balance * 0.03
  let jumpingReach = player.jumpingReach * 0.03
  let pace = player.pace * 0.03
  let stamina = player.stamina * 0.03
  let strength = player.strength * 0.068
  return firstTouch + passing + technique + antecipation + finishing + agility + offBall + pace + heading + dribling
    + acceleration + longShots + composure + decisions + teamWork + vision + workRate + balance + jumpingReach + stamina + strength;
}

function completeStats(player) {
  let heading = player.heading
  let crossing = player.crossing
  let tackling = player.tackling
  let dribling = player.dribling
  let finishing = player.finishing
  let firstTouch = player.firstTouch
  let marking = player.marking
  let passing = player.passing
  let technique = player.technique

  let aggression = player.agression
  let antecipation = player.antecipation
  let bravery = player.bravery
  let composure = player.composure
  let concentration = player.concentration
  let flair = player.flair
  let decisions = player.decisions
  let offBall = player.offBall
  let positioning = player.positioning
  let workRate = player.workRate
  let teamWork = player.teamWork
  let vision = player.vision

  let acceleration = player.acceleration
  let agility = player.agility
  let naturalFitness = player.naturalFitness
  let balance = player.balance
  let pace = player.pace
  let stamina = player.stamina
  let strength = player.strength
  let jumpingReach = player.jumpingReach

  let totalStats = heading + crossing + dribling + finishing + tackling + firstTouch +
    passing + technique + antecipation + composure + marking + bravery +
    decisions + offBall + workRate + teamWork + balance + concentration +
    aggression + positioning + acceleration + pace +
    stamina + strength + flair + vision + agility + naturalFitness + jumpingReach;
  return totalStats
}

function playerRating(player) {
  let ratings = new Map();
  let array = []
  if (fullBackRating(player) >= MIN_RATING) {
    ratings.set('WingBack', fullBackRating(player).toFixed(3))
  }
  if (centerBackRating(player) >= MIN_RATING) {
    ratings.set("Centerback", centerBackRating(player).toFixed(3))
  }
  if (halfBackRating(player) >= MIN_RATING) {
    ratings.set("HalfBack", halfBackRating(player).toFixed(3))
  }
  if (playMakerRating(player) >= MIN_RATING) {
    ratings.set("Playmaker", playMakerRating(player).toFixed(3))
  }
  if (b2bRating(player) >= MIN_RATING) {
    ratings.set("B2B", b2bRating(player).toFixed(3))
  }
  if (centerMidAttackingRating(player) >= MIN_RATING) {
    ratings.set("Attacking Mid", centerMidAttackingRating(player).toFixed(3))
  }
  if (insideForwardRating(player) >= MIN_RATING) {
    ratings.set("Inside Forward", insideForwardRating(player).toFixed(3))
  }
  if (wingerRating(player) >= MIN_RATING) {
    ratings.set("Winger", wingerRating(player).toFixed(3))
  }
  if (strikerRating(player) >= MIN_RATING) {
    ratings.set("Striker", strikerRating(player).toFixed(3))
  }
  if (completeStrikerRating(player) >= MIN_RATING) {
    ratings.set("Complete Striker", completeStrikerRating(player).toFixed(3))
  }
  if (completeStats(player) >= 300) {
    ratings.set("Total Stats", completeStats(player))
  }
  const ratingsSorted = new Map([...ratings].sort((a, b) => b[1] - a[1]));
  for (let [key, value] of ratingsSorted) {
    array.push(key + " --> " + value)
  }
  if (array[0]) {
    player.bestRating = Number.parseFloat(array[0].substring(array[0].lastIndexOf(">") + 2))
    console.log('BestRating = ' + player.bestRating)
  }
  return array
}

module.exports = router;
