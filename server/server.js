/* jshint esversion: 6 */

const express = require('express');
const fs = require('fs');
var myParser = require('body-parser');
const app = express();
app.use(myParser.urlencoded({extended : true}));
app.use(myParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = 8181;

let categories = [];
let highScores = [];
const MAX_HIGH_SCORES = 3;

function loadCategories() {
    let raw = fs.readFileSync('categories.json');
    categories = JSON.parse(raw).categories;
    console.log('Category data successfully loaded');
}

function isValidCategoryId(id) {
    return id && id >= 1 && id <= categories.length;
}

function isValidDifficulty(difficulty) {
    return difficulty && difficulty >= 1 && difficulty <= 5;
}

function getCategory(id) {
    return categories[id - 1];
}

function getClue(categoryId, difficulty) {
    let category = categories[categoryId - 1];
    return category.clues[difficulty - 1];
}

function isAnswerCorrect(clue, answer) {
    let found = false;
    clue.solutions.forEach(solution => {
        if (solution.toLowerCase().trim() === answer.toLowerCase().trim()) {
            found = true;
        }
    });
    return found;
}

function isString(val) {
    return typeof(val) === 'string';
}

function addScore(score) {
    if (highScores.length < MAX_HIGH_SCORES) {
        highScores.push(score);
        sortScores();
        return true;
    }

    if (score.score > highScores[highScores.length - 1]) {
        highScores.pop();
        highScores.push(score);
        sortScores();
        return true;
    }
    return false;
}

function sortScores() {
    highScores.sort((score1, score2) => {
        return score2.score - score1.score;
    });
}

function getNewCategories(used, round) {
    let size = 5 * round;
    let cats = [];
    while(used.length < size) {
        let categoryId = Math.floor(Math.random() * categories.length) + 1;
        if (!used.includes(categoryId)) {
            used.push(categoryId);
            cats.push({
                id: categoryId,
                title: categories[categoryId - 1].title
            });
        }
    }
    return cats;
}

function getDailyDouble(used) {
    let squareId;
    do {
        squareId = Math.floor(Math.random() * 25) + 1;
    } while (squareId === used);
    return squareId;
}

app.get('/api/newgame', (req, res) => {
    let game = {
        score: 0,
        round: 1,
        multiplier: 100,
        categories: [],
        dailyDoubles: [],
        usedCategories: [],
        numCategories: categories.length
    };
    game.categories = getNewCategories(game.usedCategories, game.round);
    game.dailyDoubles.push(getDailyDouble(0));
    game.dailyDoubles.push(getDailyDouble(game.dailyDoubles[0]));
    // console.log('Starting new game at ', req.connection.remoteAddress)
    res.status(200).send(game);
});

app.get('/api/category/count', (req, res) => {
    res.status(200).send({count: categories.length});
});

app.get('/api/category/:id', (req, res) => {
    let id = parseInt(req.params.id);
    if (!isValidCategoryId(id)) {
        res.status(400).send("Invalid category ID");
        return;
    }
    let category = categories[id - 1];
    res.status(200).send({id: category.id, title: category.title});
});

app.get('/api/clue', (req, res) => {
    if (!isValidCategoryId(req.query.id)) {
        res.status(400).send("Invalid category ID");
        return;
    } else if (!isValidDifficulty(req.query.difficulty)) {
        res.status(400).send("Invalid difficulty");
        return;
    }

    let category = getCategory(req.query.id);
    let clue = getClue(category.id, req.query.difficulty);
    let response = {
        categoryId: parseInt(req.query.id),
        category: category.title,
        clue: clue.clue,
        difficulty: clue.difficulty
    };

    res.status(200).send(response);
});

app.post('/api/answer', (req, res) => {
    if (!isValidCategoryId(req.body.categoryId)) {
        res.status(400).send("Invalid category ID");
        return;
    } else if (!isValidDifficulty(req.body.difficulty)) {
        res.status(400).send("Invalid difficulty");
        return;
    }

    let answer = req.body.answer;
    let category = getCategory(req.body.categoryId);
    let clue = getClue(req.body.categoryId, req.body.difficulty);
    let response = {
        categoryId: category.id,
        category: category.title,
        clue: clue.clue,
        difficulty: clue.difficulty,
        receivedAnswer: answer,
        isCorrect: false,
        correctAnswer: null
    };
    if (isAnswerCorrect(clue, answer)) {
        response.isCorrect = true;
    } else {
        response.correctAnswer = clue.solutions[0];
    }
    res.status(200).send(response);
});

app.get('/api/scores', (req, res) => {
    res.status(200).send({highScores: highScores});
});

app.post('/api/scores', (req, res) => {
    if (!req.body.player || !isString(req.body.player) || 
        !req.body.score || isNaN(req.body.score)) {
        res.status(400).send("Scores must include name and score");
    }
    let added = addScore({player: req.body.player, score: parseInt(req.body.score)});
    res.status(200).send({added: added});
});

app.listen(port, () => {
    console.log(`Desktop server app listening on port ${port}!`);
    loadCategories();
});
