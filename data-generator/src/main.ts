import axios from "axios";
import CustomData from "./custom-data";
const faker = require("faker");

const sendData = async <T>(data: T) => {
  try {
    const response = await axios.post("http://localhost:3005/process", data);
    console.log("Data sent successfully:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    } else {
      console.error("Error:", error);
    }
  }
};

sendData<CustomData>({
  data: faker.random.word(),
});
