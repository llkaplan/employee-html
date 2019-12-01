const inquirer = require('inquirer');
const fs = require('fs');
const jest = require('jest');
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");

let managers = [];
let interns = [];
let engineers = [];
let employeesAll = [managers, interns, engineers];
let engineerCounter = 0;

var employeeAmount = 1;



/*managers.forEach()
const markup = `
<div class="card employee-card">
    <div class="card-header">
        <h2 class="card-title">Name: ${employeeName} </h2>
        <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>Title: ${employeeName}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID: {{ id }}</li>
            <li class="list-group-item">Email: <a href="mailto:{{ email }}">{{ email }}</a></li>
            <li class="list-group-item">Office number: {{ officeNumber }}</li>
        </ul>
    </div>
</div>
`;

document.body.innerHTML = markup;
*/


const questions = [
    {
        name: 'employeeName',
        message: "What is the employee's name?",
        default: 'Write in the name here please',
    },
    {
        name: 'idNumber',
        message: 'What is there ID number?',
        default: 'id here',
    },
    {
        type: 'list',
        message: 'What is the employee type?',
        name: 'employeeType',
        choices: ["Engineer", "Intern", "Manager"],
    },
    {
        type: 'list',
        message: 'Do you want to add an employees?',
        name: 'continue',
        choices: ["yes", "no"],
    },
];

let creatingFiles = () => {
        fs.writeFile("engineers.html", engineers, function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("Engineer file successful!");

        });
        fs.writeFile("interns.html", interns, function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("Intern file successful!");

        });
        fs.writeFile("managers.html", managers, function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("Managers file successful!");

        });

}

let addingEngineer = (answers) => {
    engineers.push(answers);
    inquirer
        .prompt([
            {
                type: 'name',
                name: 'username',
                message: "What is their github username",
                default: 'Write here please',
            },
            questions[3],
        ])
        .then(answer => {
            engineers[engineerCounter].username = answer.username;
            engineerCounter++;
            console.log(answer)
            if (answer.continue === 'yes') {
                employeeAmount++;
            } else {
                creatingFiles();
                employeesAll();
            }
        })
};




for (i = 0; i < employeeAmount; i++) {

    inquirer
        .prompt([
            questions[0],
            questions[1],
            questions[2],
        ])
        .then(answers => {
            if (answers.employeeType === 'Engineer') {
                addingEngineer(answers);

            } else if (answers.employeeType === 'Intern') {
                interns.push(answers);
                inquirer
                    .prompt([
                        questions[3],
                    ])
                    .then(q3Answer => {
                        if (q3Answer === 'yes') {
                            employeeAmount++;
                        } else {
                            creatingFiles();
                        }
                    })

            } else if (answers.employeeType === 'Manager') {
                managers.push(answers);
                inquirer
                    .prompt([
                        questions[3],
                    ])
                    .then(q3Answer => {
                        if (q3Answer === 'yes') {
                            employeeAmount++;
                        } else {
                            creatingFiles();
                        }
                    })

            } 
        });


}