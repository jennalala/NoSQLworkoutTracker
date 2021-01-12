const router = require("express").Router();
const path = require('path')
const fs = require("fs");

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'))
})
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'))
})
router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use(apiRoute);
app.use(htmlRoute);

module.exports = router;
