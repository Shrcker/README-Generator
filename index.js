const inquirer = require("inquirer");
const fs = require("fs");
const { error } = require("console");
const licenses = [
  "Academic Free License v3.0",
  "Apache license 2.0",
  "Artistic license 2.0",
  "Boost Software License 1.0",
  'BSD 2-clause "Simplified" license',
  'BSD 3-clause "New" or "Revised" license',
  "BSD 3-clause Clear license",
  'BSD 4-clause "Original" or "Old" license',
  "BSD Zero-Clause license",
  "Creative Commons license family",
  "Creative Commons Zero v1.0 Universal",
  "Creative Commons Attribution 4.0",
  "Creative Commons Attribution ShareAlike 4.0",
  "Do What The F*ck You Want To Public License",
  "Educational Community License v2.0",
  "Eclipse Public License 1.0",
  "Eclipse Public License 2.0",
  "European Union Public License 1.1",
  "GNU Affero General Public License v3.0",
  "GNU General Public License family",
  "GNU General Public License v2.0",
  "GNU General Public License v3.0",
  "GNU Lesser General Public License family",
  "GNU Lesser General Public License v2.1",
  "GNU Lesser General Public License v3.0",
  "ISC",
  "LaTeX Project Public License v1.3c",
  "Microsoft Public License",
  "MIT",
  "Mozilla Public License 2.0",
  "Open Software License 3.0",
  "PostgreSQL License",
  "SIL Open Font License 1.1",
  "University of Illinois/NCSA Open Source License",
  "The Unlicense",
  "zLib License",
];

let generateHTML = (data) =>
  `
# ${data.name}

## Description
  ${data.description}

## Installation
  ${data.installGuide}

## Usage
  ${data.usage}

## Credits
  ${data.credits}

## License
  ${data.license}
`;

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your project's name?",
      name: "name",
    },
    {
      type: "input",
      message: "Describe your project.",
      name: "description",
    },
    {
      type: "confirm",
      message: "Does this project need to be installed?",
      name: "hasInstallation",
    },
    {
      type: "input",
      message: "How would you install the project?",
      name: "installGuide",
      when(answers) {
        return answers.hasInstallation;
      },
    },
    {
      type: "input",
      message: "How would an end user use this project?",
      name: "usage",
    },
    {
      type: "confirm",
      message: "Would you like to credit anyone for the project's development?",
      name: "hasCredits",
    },
    {
      type: "input",
      message: "Who will you credit?",
      name: "credits",
      when(answers) {
        return answers.hasCredits;
      },
    },
    {
      type: "list",
      message: "What is project's license?",
      name: "license",
      choices: licenses,
    },
  ])
  .then((responses) => {
    if (responses.isInstalled) {
      generateHTML += ``;
    }

    fs.writeFile("README.md", generateHTML(responses), (error) => {
      error ? console.error(error) : console.log("README Generated!");
    });
  });
