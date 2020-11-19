const db = require("../models");
const images = require("./images");

const populateImages = async quizPage => {
  for (const option of quizPage.options) {
    const returnedImage = await db.image.findOne({
      where: {
        name: option.name
      }
    });
    option.image = Buffer.from(returnedImage.image).toString("base64");
    // encoding to base64 removes special characters, so we need to add them back in
    option.image = "data:image/jpeg;base64," + option.image;
  }
};

const ingredientOptions = [
  { name: "Olives", image: "" },
  { name: "Club soda", image: "" }
];

const getQuizQuestions = async () => {
  // load field, options (names) from files
  const quizPages = await images.load();

  // populate images from database
  for (quizPage of quizPages) {
    await populateImages(quizPage);
  }

  return quizPages;
  // return [
  //   {
  //     id: 1,
  //     title: "Pick Your Poison",
  //     field: "liquor",
  //     options: await getLiquorOptions(),
  //     submitText: "Drink Up!"
  //   },
  //   {
  //     id: 2,
  //     title: "What tastes?",
  //     field: "ingredient",
  //     options: ingredientOptions,
  //     submitText: "Get your recommendations"
  //   }
  // ];
};

// note to self: this is ES5 syntax. differs from export const.. and export default const.. in that it exports to top level module's exports, and the other two ARE ES6! ES6 ones are used in modern ES6 import { } from "" syntax, while ES5 is for const moduleName = require("")
module.exports = { ingredientOptions, getQuizQuestions };