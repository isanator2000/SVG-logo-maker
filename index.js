const inquirer = require("inquirer");

const fs = require("fs");

const { Triangle, Square, Circle } = require("./lib/shapes");

function writeToFile(fileName, answers) {
  let svgString = "";
  svgString =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
  svgString += "<g>";
  svgString += `${answers.shape}`;

  let shapeChosen;
  if (answers.shape === "Triangle") {
    shapeChosen = new Triangle();
    svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
  } else if (answers.shape === "Square") {
    shapeChosen = new Square();
    svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
  } else {
    shapeChosen = new Circle();
    svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
  }

  svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
  svgString += "</g>";
  svgString += "</svg>";

  fs.writeFile(fileName, svgString, (err) => {
    err ? console.log(err) : console.log("Generated logo.svg");
  });
}

function promptUser() {
  inquirer
    .prompt([
      {
        type: "input",
        message:
          "What text would you like on your logo? (Up to three characters)",
        name: "text",
      },
      {
        type: "input",
        message:
          "Choose the text color (Use the color's name or HEX code)",
        name: "textColor",
      },
      {
        type: "list",
        message: "What shape would you like for your logo?",
        choices: ["Triangle", "Square", "Circle"],
        name: "shape",
      },
      {
        type: "input",
        message:
          "Choose the shape's color (Use the color's name or HEX code)",
        name: "shapeBackgroundColor",
      },
    ])
    .then((answers) => {
      if (answers.text.length > 3) {
        console.log("Enter a value of no more than 3 characters");
        promptUser();
      } else {
        writeToFile("logo.svg", answers);
      }
    });
}

promptUser();