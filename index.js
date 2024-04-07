import inquirer from "inquirer";
import * as fs from "fs";
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

const generateREADME = (data) => {
  let readmeList = [
    `${"<h1>"} ${data.name}${"</h1>"}`,
    `${data.description}`,
    `${"<strong>"}Link:${"</strong>"} ${"<a href=https://"}${
      data.link
    }${">Project Image</a>"}`,
    `${"<img src="}./images/${data.image}${" />"}`,
    `${"<h2>"} Usage${"</h2><br />"} ${data.usage}`,
    `${"<h2>"} Credits${"</h2><br />"} ${data.credits}`,
    `${"<h2>"} License${"</h2><br />"} ${data.license}`,
  ];
  const optionalElements = [
    `${"<h2>"} Installation${"</h2><br />"}${data.installGuide}`,
    `${"<h2>"} Features${"</h2><br />"}${data.features}`,
    `${"<h2>"} How to Contribute${"</h2><br />"}${data.contributions}`,
    `${"<h2>"} Tests${"</h2><br />"}${data.tests}`,
  ];

  if (data.hasInstallation) {
    readmeList.splice(3, 0, optionalElements[0]);
  }
  if (data.hasFeatures) {
    readmeList.push(optionalElements[1]);
  }
  if (data.hasContributions) {
    readmeList.push(optionalElements[2]);
  }
  if (data.hasTests) {
    readmeList.push(optionalElements[3]);
  }
  return readmeList.join(`${"<br />"}`);
};

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your project's name?",
      name: "name",
    },
    {
      type: "input",
      message:
        "What is the project's Git Repository link? (Everything after the https://)",
      name: "link",
    },
    {
      type: "input",
      message:
        "Please link a screenshot for this project. (Just the file name)",
      name: "image",
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
      type: "input",
      message:
        "Who will you credit for helping you with the project's development?",
      name: "credits",
    },
    {
      type: "list",
      message: "What is project's license?",
      name: "license",
      choices: licenses,
    },
    {
      type: "confirm",
      message: "Does your project have a lot of features you'd like to list?",
      name: "hasFeatures",
    },
    {
      type: "input",
      message: "List your features now.",
      name: "features",
      when(answers) {
        return answers.hasFeatures;
      },
    },
    {
      type: "confirm",
      message:
        "Are there any particular ways that other people can contribute to this project?",
      name: "hasContributions",
    },
    {
      type: "input",
      message: "How can they contribute?",
      name: "contributions",
      when(answers) {
        return answers.hasContributions;
      },
    },
    {
      type: "confirm",
      message: "Are there any ways to test aspects of this project?",
      name: "hasTests",
    },
    {
      type: "input",
      message: "What are these tests?",
      name: "tests",
      when(answers) {
        return answers.hasTests;
      },
    },
  ])
  .then((responses) => {
    fs.writeFile("README.md", generateREADME(responses), (error) => {
      error
        ? console.error(error)
        : console.log(
            "README Generated! Make sure to double check this file for final edits."
          );
    });
  });
