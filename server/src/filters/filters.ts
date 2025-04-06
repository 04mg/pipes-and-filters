import { CustomData } from "../custom-data/CustomData";

export const toLowercaseWithSpacesAsync = async (
  input: CustomData
): Promise<CustomData> => {
  await randomDelay();

  triggerRandomError();

  let result: string = input.data.toLowerCase().split("").join(" ");
  console.log(
    `Filtro toLowercaseWithSpaces, input${JSON.stringify(
      input
    )}, output ${result}`
  );
  return { data: result };
};

export const toUpperCaseSync = (input: CustomData): CustomData => {
  let result: string = input.data.toUpperCase();
  console.log(
    `Filtro toUpperCaseSync, input${JSON.stringify(input)}, output ${result}`
  );
  return { data: result };
};

const randomDelay = async () => {
  const delay = Math.floor(Math.random() * 4000) + 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));
};

const triggerRandomError = () => {
  if (Math.random() > 0.5) {
    throw new Error("Random error in toLowercaseWithSpaces filter");
  }
};
