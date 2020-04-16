const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

// render all the information into a singele html file
const render = employees => {
  const htmlManager = [];
  const htmlEngineer = [];
  const htmlIntern = [];

  htmlManager.push(employees
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => renderManager(manager))
  );
  htmlEngineer.push(employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );
  htmlIntern.push(employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
  );

  htmlObj = {
    manager : htmlManager.join(""),
    engineer : htmlEngineer.join(""),
    intern : htmlIntern.join("")
  }

  return renderMain(htmlObj);

};
// render manager info
const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  return template;
};
// render engineer info
const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
};
// render intern info
const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};
// put all the info into single html file and return the html template
const renderMain = htmlObj => {
  let template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  template = replacePlaceholders(template, "manager", htmlObj.manager)
  template = replacePlaceholders(template, "engineer", htmlObj.engineer)
  template = replacePlaceholders(template, "intern", htmlObj.intern)

  return template;
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
