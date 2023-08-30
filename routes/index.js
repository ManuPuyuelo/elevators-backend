const express = require("express");
const router = express.Router();
const ElevatorStatus = require("./models/elevatorStatus");
const ElevatorAction = require("./models/elevatorAction");

// Route pour enregistrer une action de l'ascenseur
router.post("/elevatoractions", (req, res) => {
  const { elevatorNumber, floor, actionType } = req.body;

  const newAction = new ElevatorAction({ elevatorNumber, floor, actionType });
  newAction
    .save()
    .then(() => {
      res.status(200).json({ message: "Action enregistrée avec succès." });
    })
    .catch((error) => {
      res.status(500).json({
        error: "Une erreur est survenue lors de l'enregistrement de l'action.",
      });
    });
});

// Route pour recuperer l'étage actuel des ascenseurs
router.get("/elevatorstatus", (req, res) => {
  ElevatorStatus.find({})
    .then((status) => {
      res.json({ result: true, status: status });
    })
    .catch((error) => {
      res.status(500).json({
        error:
          "Une erreur est survenue lors de la récupération de l'étage actuel des ascenseurs.",
      });
    });
});

// Route pour mettre à jour l'étage actuel des ascenseurs
router.put("/:elevatorNumber/current-floor", (req, res) => {
  const elevatorNumber = req.params.elevatorNumber;
  const { currentFloor } = req.body;

  ElevatorStatus.findOne({ elevatorNumber })
    .then((status) => {
      status.currentFloor = currentFloor;
      return status.save();
    })
    .then(() => {
      res.status(200).json({ message: "Étage actuel mis à jour avec succès." });
    })
    .catch((error) => {
      res.status(500).json({
        error:
          "Une erreur est survenue lors de la mise à jour de l'étage actuel.",
      });
    });
});

module.exports = router;
