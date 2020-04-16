const inquirer = require('inquirer')
// const fs = require('fs')
// const Render = require('./htmlRenderer')
// const Engineer = require('./Engineer')
// const Manager = require('./Manager')
// const Intern = require('./Intern')


async function teamInfoRecorder(){

    let teamMemberNum = await inquirer.prompt()[{
        message: 'How many member in your team?',
        name: 'teamMemberNum'
        }]

    let {teamNum} = teamMemberNum
    let teamInfos = []
    for (let i = 0; i< teamNum; i++)
    {
        let employeeType = await inquirer.prompt()[
            { type: 'list', 
              name: 'employeeType', 
              message: `Please choose team member ${i+1}'s role`, 
              choices: ['Manager','Engineer','Intern']
            }]
        
        console.log(employeeType.employeeType)
        // let employeeInfo = await inquirer.prompt([{
        //     message: 'Enter your GitHub username',
        //     name: 'username'
        //     },
        //     {
        //     message: 'Enter your Project title',
        //     name: 'title'
        //     },
        //     {
        //     message: 'Enter your Project Description',
        //     name: 'description'
        //     },
    
        //     {
        //     message: 'How to install:',
        //     name: 'installation'
        //     },
        //     {
        //     message: 'Enter your project usage',
        //     name: 'usage'
        //     },
        //     {
        //     message: 'Enter your project contributor',
        //     name: 'contributing'
        //     },
        //     {
        //     message: 'Enter your project test instruction',
        //     name: 'tests'
        //     }])
    
        // destruct the object to obtain all the variables 
        // let {username,title,description,installation,usage,contributing,tests} = answerObj
    }

}

teamInfoRecorder()