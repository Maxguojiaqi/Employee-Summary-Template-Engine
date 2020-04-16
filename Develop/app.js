const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require('util')

// turn callback function into a promise function
const writeFilePromise = util.promisify(fs.writeFile)

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



async function teamInfoRecorder(){

    let teamMemberNum = await inquirer.prompt([{
        message: 'How many member in the team?',
        name: 'teamMemberNum'
        }])

    let {teamMemberNum : teamNum} = teamMemberNum
    console.log(teamNum)
    let teamObjs = []
    for (let i = 0; i< teamNum; i++)
    {
        let employeeGeneralQuestion = await inquirer.prompt([
            { type: 'list', 
              name: 'employeeType', 
              message: `Please choose team member ${i+1}'s role`, 
              choices: ['Manager','Engineer','Intern']
            },
            { message:`Please enter team member ${i+1}'s Name`,
              name: 'employeeName'  
            },
            { message:`Please enter team member ${i+1}'s ID`,
              name: 'employeeID'  
            },
            { message:`Please enter team member ${i+1}'s Email`,
              name: 'employeeEmail'  
            }])
        
        console.log(employeeGeneralQuestion.employeeType)

        let {employeeName,employeeID,employeeEmail} = employeeGeneralQuestion

        switch(employeeGeneralQuestion.employeeType){
            case 'Manager': 
                let employeeManagerQuestion = await inquirer.prompt([{
                    message: `Enter Office ID for team member ${i+1}`,
                    name: 'officeID'
                    }])
                let {officeID} = employeeManagerQuestion
                let newManager = new Manager(employeeName,employeeID,employeeEmail,officeID)
                teamObjs.push(newManager)
                break;
            case 'Engineer': 
                let employeeEngineerQuestion = await inquirer.prompt([{
                    message: `Enter GitHub username for team member ${i+1}`,
                    name: 'githubUserName'
                    }])
                let {githubUserName} = employeeEngineerQuestion
                let newEngineer = new Engineer(employeeName,employeeID,employeeEmail,githubUserName)
                teamObjs.push(newEngineer)
                break;
            case 'Intern': 
                let employeeInternQuestion = await inquirer.prompt([{
                    message: `Enter school name for team member ${i+1}`,
                    name: 'schoolName'
                    }])
                let {schoolName} = employeeInternQuestion
                let newIntern = new Intern(employeeName,employeeID,employeeEmail,schoolName)
                teamObjs.push(newIntern)
                break;
            }
    }

    let htmlTemplate = render(teamObjs)
    console.log(outputPath)
    // create file folder if not exist
    if (!fs.existsSync(outputPath)){
        fs.mkdirSync(outputPath);
    }
    await writeFilePromise(outputPath,htmlTemplate)
}
teamInfoRecorder()
// let teamMemberArray = teamInfoRecorder()
// teamMemberArray.forEach(element => {
//     console.log(element)
// });




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
