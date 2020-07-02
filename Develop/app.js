const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const employeeQuestions = [
  {
    type: "input",
    message: "What is your name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your id?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your email?",
    name: "email",
  },
  {
    type: "list",
    message: "Choose the title most specific to your role?",
    name: "role",
    choices: ["Engineer", "Intern", "Manager"],
  },
];

function createEngineer(employeeAnswers) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your github username?",
        name: "github",
      },
    ])
    .then((answers) => {
      const employee = new Engineer(
        employeeAnswers.name,
        employeeAnswers.id,
        employeeAnswers.email,
        answers.github
      );
      employees.push(employee);
      start();
    });
}
function createIntern(employeeAnswers) {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name of your school?",
        name: "school",
      },
    ])
    .then((answers) => {
      const employee = new Intern(
        employeeAnswers.name,
        employeeAnswers.id,
        employeeAnswers.email,
        answers.school
      );
      employees.push(employee);
     
      start();
    });
  
}
function createManager(employeeAnswers) {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is your Office Number?",
        name: "officeNumber",
      },
    ])
    .then((answers) => {
      const employee = new Manager(
        employeeAnswers.name,
        employeeAnswers.id,
        employeeAnswers.email,
        answers.officeNumber
      );
      employees.push(employee);
     
      start();
    });
}

function createTeam() {
  inquirer.prompt(employeeQuestions).then((answers) => {
    //if answers.role ==== Employee then create new Employee using Employee Class?
    if (answers.role === "Engineer") {
      createEngineer(answers);
    } else if (answers.role === "Intern") {
      createIntern(answers);
    } else {
      createManager(answers);
    }

    //console.log(employee);
    //if answers.role ==== Engineer then create new Engineer using Engineer Class?
  });
}

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to create team or exit?",
        name: "mainChoice",
        choices: ["Team", "Exit"],
      },
    ])
    .then((answer) => {
      if (answer.mainChoice === "Team") {
        createTeam();
      } else {
        console.log(JSON.stringify(employees, null, 2));
        fs.writeFileSync(outputPath, render(employees), "utf-8");
      }
    })
    .catch((err) => {
      throw err;
    });
  // ask user what would you like to do
  //   [add to team, exit]
  // if add to team -> call create team
  // else exit.
}

start();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
