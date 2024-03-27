import db from "../models/index.js";

const Task = db.tasks;

const create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Missing parameter: {name}",
      });
    }

    const task = await Task.create({
      name: name,
      UserId: req.user.id,
    });

    res.status(200).json({ task });
  } catch (err) {
    const message = `Failed to create task ${err}`;
    console.error(message);
    res.status(400).json({
      message: message,
    });
  }
};

const get = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(400).json({
        message: "No task exists with provided id",
      });
    }

    if (task.UserId !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    res.status(200).json({ task });
  } catch (err) {
    const message = `Failed to get task ${err}`;
    console.error(message);
    res.status(400).json({
      message: message,
    });
  }
};

const list = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: {
        UserId: req.user.id,
      },
    });

    res.status(200).json({ tasks });
  } catch (err) {
    const message = `Failed to list tasks ${err}`;
    console.error(message);
    res.status(400).json({
      message: message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id, name, status } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Missing parameter: {name}",
      });
    }

    if (!status) {
      return res.status(400).json({
        message: "Missing parameter: {status}",
      });
    }

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(400).json({
        message: "No task exists with provided id",
      });
    }

    if (task.UserId !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    await task.update({
      name: name,
      status: status,
    });

    const updatedTask = await Task.findByPk(id);

    res.status(200).json({ updatedTask });
  } catch (err) {
    const message = `Failed to update task ${err}`;
    console.error(message);
    res.status(400).json({
      message: message,
    });
  }
};

const drop = async (req, res) => {
  try {
    const { id } = req.params;

    await Task.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "Successfully deleted task.",
    });
  } catch (err) {
    const message = `Failed to delete task ${err}`;
    console.error(message);
    res.status(400).json({
      message: message,
    });
  }
};

const TaskController = { create, get, list, update, drop };
export default TaskController;
