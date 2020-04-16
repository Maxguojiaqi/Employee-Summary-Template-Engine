//require all the packages 
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require('util')
const render = require("./lib/htmlRenderer");

// turn callback function into a promise function
const writeFilePromise = util.promisify(fs.writeFile)
// declare output path
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// create function gather the info from user
async function teamInfoRecorder(){

    // get the number of the member in the team
    let teamMemberNum = await inquirer.prompt([{
        message: 'How many member in the team? (please enter in number)',
        name: 'teamMemberNum'
        }])
    console.log('________________________________________________________')
    let {teamMemberNum : teamNum} = teamMemberNum
    let teamObjs = []
    console.log(parseInt(teamNum))
    for (let i = 0; i< parseInt(teamNum); i++)
    {   
        // get each member's role
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

        let {employeeName,employeeID,employeeEmail} = employeeGeneralQuestion
        
        // depending on the role, ask more questions
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
        console.log('________________________________________________________')
    }

    let htmlTemplate = render(teamObjs)
    console.log("HTML output to: "+ outputPath)
    // create file folder if not exist
    if (!fs.existsSync(outputPath)){
        fs.mkdirSync(outputPath);
    }
    await writeFilePromise(outputPath,htmlTemplate)
}
teamInfoRecorder()