import inquirer from "inquirer";
import * as fs from "fs";
const licenses = [
  "Apache 2.0 License",
  "BSD 2-Clause License",
  "BSD 3-Clause License",
  "Attribution 4.0 International",
  "Attribution-ShareAlike 4.0 International",
  "Eclipse Public License 1.0",
  "GNU AGPL v3",
  "GNU GPL v2",
  "GNU GPL v3",
  "GNU LGPL v3",
  "IBM Public License Version 1.0",
  "The MIT License",
  "Mozilla Public License 2.0",
  "Open Database License",
  "The zlib/libpng License",
];

const licenseBadges = [
  '<a href="https://opensource.org/licenses/Apache-2.0"><img alt="Apache 2.0 License" src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" /></a>',
  '<a href="https://opensource.org/licenses/BSD-2-Clause"><img alt="BSD 2-Clause License src="https://img.shields.io/badge/License-BSD%202--Clause-orange.svg" /></a>',
  '<a href="https://opensource.org/licenses/BSD-3-Clause"><img alt="BSD 3-Clause License" src="https://img.shields.io/badge/License-BSD%203--Clause-blue.svg" /></a>',
  '<a href="https://creativecommons.org/licenses/by/4.0/"><img alt="Attribution 4.0 International" src="https://licensebuttons.net/l/by/4.0/80x15.png" /></a>',
  '<a href="https://creativecommons.org/licenses/by-sa/4.0/"><img alt="Attribution-ShareAlike 4.0 International" src="https://licensebuttons.net/l/by-sa/4.0/80x15.png" /></a>',
  '<a href="https://opensource.org/licenses/EPL-1.0"><img alt="Eclipse Public License 1.0" src="https://img.shields.io/badge/License-EPL%201.0-red.svg" /></a>',
  '<a href="https://www.gnu.org/licenses/agpl-3.0"><img alt="GNU AGPL v3" src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" /></a>',
  '<a href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html"><img alt="GNU GPL v2" src="https://img.shields.io/badge/License-GPL%20v2-blue.svg" /></a>',
  '<a href="https://www.gnu.org/licenses/gpl-3.0"><img alt="GNU GPL v3" src="https://img.shields.io/badge/License-GPL%20v3-blue.svg" /></a>',
  '<a href="https://www.gnu.org/licenses/lgpl-3.0"><img alt="GNU LGPL v3" src="https://img.shields.io/badge/License-LGPL%20v3-blue.svg" /></a>',
  '<a href="https://opensource.org/licenses/IPL-1.0"><img alt="IBM Public License Version 1.0" src="https://img.shields.io/badge/License-IPL%201.0-blue.svg" /></a>',
  '<a href="https://opensource.org/licenses/MIT"><img alt="The MIT License" src="https://img.shields.io/badge/License-MIT-yellow.svg" /></a>',
  '<a href="https://opensource.org/licenses/MPL-2.0"><img alt="Mozilla Public License 2.0" src="https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg" /></a>',
  '<a href="https://opendatacommons.org/licenses/odbl/"><img alt="Open Database License" src="https://img.shields.io/badge/License-ODbL-brightgreen.svg" /></a>',
  '<a href="https://opensource.org/licenses/Zlib"><img alt="The zlib/libpng License" src="https://img.shields.io/badge/License-Zlib-lightgrey.svg" /></a>',
];

const findBadge = (license) => {
  const findLicenseIndex = licenses.indexOf(license);
  const foundBadge = licenseBadges[findLicenseIndex];
  return foundBadge;
};

const generateREADME = (data, badge) => {
  let readmeList = [
    `${"<h1 id='description'>"}${data.name} ${badge}${"</h1>"}`,
    `${data.description}`,
    `${"<strong>"}Link:${"</strong>"} ${"<a href=https://"}${data.link}${">Github Link</a>"}`,
    `${"<img src="}./images/${data.image} alt="Project Screenshot"${" />"}`,
    `${"<h2 id='usage'>"} Usage${"</h2><br />"} ${data.usage}`,
    `${"<h2 id='credits'>"} Credits${"</h2><br />"} ${data.credits}`,
    `${"<h2 id='license'>"} License${"</h2><br />"} ${data.license}`,
    `${"<h2 id='questions'>"} Questions${"</h2><br />"} Who is the project's host?${"<br />"}It's ${data.username}; link to their profile: 
    ${'<a href="https://www.github.com/'}${data.username}${'">Link</a><br />'} And their email: ${data.email}`,
  ];
  const optionalElements = [
    `${"<h2 id='installation'>"} Installation${"</h2><br />"}${data.installGuide}`,
    `${"<h2 id='features'>"} Features${"</h2><br />"}${data.features}`,
    `${"<h2 id='contribute'>"} How to Contribute${"</h2><br />"}${data.contributions}`,
    `${"<h2 id='tests'>"} Tests${"</h2><br />"}${data.tests}`,
  ];
  let tableOfContents = [
    `${"<h3>Table of Contents</h3><ol>"}`,
    `${'<li><a href="#description"><span>Description</span></a></li>'}`,
    `${'<li><a href="#usage"><span>Usage</span></a></li>'}`,
    `${'<li><a href="#credits"><span>Credits</span></a></li>'}`,
    `${'<li><a href="#license"><span>License</span></a></li>'}`,
    `${'<li><a href="#questions"><span>Questions</span></a></li>'}`,
  ];

  if (data.hasInstallation) {
    readmeList.splice(4, 0, optionalElements[0]);
    tableOfContents.splice(2, 0, `${'<li><a href="#installation"><span>Installation</span></a></li>'}`);
  }
  if (data.hasFeatures) {
    readmeList.push(optionalElements[1]);
    tableOfContents.push(`${'<li><a href="#features"><span>Features</span></a></li>'}`);
  }
  if (data.hasContributions) {
    readmeList.push(optionalElements[2]);
    tableOfContents.push(`${'<li><a href="#contribute"><span>How to Contribute</span></a></li>'}`);
  }
  if (data.hasTests) {
    readmeList.push(optionalElements[3]);
    tableOfContents.push(`${'<li><a href="#tests"><span>Tests</span></a></li>'}`);
  }
  if (tableOfContents.length > 5) {
    tableOfContents.push(`${"</ol>"}`);
    readmeList.splice(4, 0, tableOfContents.join(""));
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
      message: "What is the project's Git Repository link? (Everything after the https://)",
      name: "link",
    },
    {
      type: "input",
      message: "What's your Github username?",
      name: "username",
    },
    {
      type: "input",
      message: "Please enter your email address.",
      name: "email",
    },
    {
      type: "input",
      message: "Please link a screenshot for this project. (Just the file name)",
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
      message: "Who will you credit for helping you with the project's development?",
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
      message: "Are there any particular ways that other people can contribute to this project?",
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
    const badgeIndex = findBadge(responses.license);

    fs.writeFile("README.md", generateREADME(responses, badgeIndex), (error) => {
      error ? console.error(error) : console.log("README Generated! Make sure to double check this file for final edits.");
    });
  });
