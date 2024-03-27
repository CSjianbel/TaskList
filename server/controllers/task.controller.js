import db from "../models/index.js";

const Task = db.tasks;

const createTask = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({
        message: "Missing parameter: {name}",
      });
    }

    const task = await Task.create({ name: req.body.name });
    res.status(200).send(task);
  } catch (err) {
    console.error(`Failed to create task ${err}`);
  }
};

const getTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(400).send({
        message: `Cannot find task with id: ${id}`,
      });
    }

    return res.status(200).send(task);
  } catch (err) {
    console.error(`Failed to get task ${err}`);
  }
};

const listTasks = async (req, res) => {
  try {
  } catch (err) {
    console.error(`Failed to list tasks ${err}`);
  }
};
// create a task
// update task_name
// update task_status
// get a task
// list tasks
// drop a task
