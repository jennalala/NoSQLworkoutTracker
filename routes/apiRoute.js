const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .then((foundWorkouts) => {
      res.json(foundWorkouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Route to find a workout
router.get("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(req.params.id)
    .then((foundWorkouts) => {
      res.json(foundWorkouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises:duration" },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((stats) => {
      res.json(stats);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Create new workout
router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((newWorkout) => {
      res.json(newWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Route to add exercise to current workout
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then((updateWorkout) => {
      res.json(updateWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Route to delete a workout
router.delete("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndDelete(req.params.id)
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;