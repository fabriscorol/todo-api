const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET /tasks : Récupérer la liste des tâches
router.get('/', async (req, res) => {
	try {
		const tasks = await Task.find();
		res.json(tasks);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// POST /tasks : Ajouter une nouvelle tâche
router.post('/', async (req, res) => {
  	const task = new Task({
		text: req.body.text
	});

	try {
		const newTask = await task.save();
		res.status(201).json(newTask);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// PUT /tasks/:id : Mettre à jour une tâche
router.put('/:id', async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);

		if (task == null) {
			return res.status(404).json({ message: 'Tâche non trouvée' });
		}

		if (req.body.text != null) {
			task.text = req.body.text;
		}

		if (req.body.completed != null) {
			task.completed = req.body.completed;
		}

		const updatedTask = await task.save();
		
		res.json(updatedTask);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// DELETE /tasks/:id : Supprimer une tâche
router.delete('/:id', async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);
		if (task == null) {
			return res.status(404).json({ message: 'Tâche non trouvée' });
		}

		await task.remove();
		res.json({ message: 'Tâche supprimée' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
