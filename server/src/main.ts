import express from "express";
import { QueueFactory } from "./pipeline/QueueFactory";
import { Pipeline } from "./pipeline/Pipeline";
import {
  toLowercaseWithSpacesAsync as toLowercaseWithSpacesAsync,
  toUpperCaseSync,
} from "./filters/filters";
import { CustomData } from "./custom-data/CustomData";
require("dotenv").config();

const app = express();
app.use(express.json());
const port = 3005;

const queueFactory = QueueFactory.getQueueFactory<CustomData>;

const pipeline = new Pipeline<CustomData>(
  [toLowercaseWithSpacesAsync, toUpperCaseSync],
  queueFactory
);

app.post("/process", (req, res) => {
  const inputData: CustomData = req.body;

  pipeline.once("finalOutput", (output) => {
    console.log(`Pipeline completado: ${output.data}`);
  });

  pipeline.once("errorInFilter", (error, data) => {
    console.error(`Error en el filtro: ${error}, Datos: ${data.data}`);
  });

  pipeline.processInput(inputData);
  res.status(200).json({ message: "Comenzando procesamiento" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
