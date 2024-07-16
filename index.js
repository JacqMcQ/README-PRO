const inquirer = require("inquirer");
const fs = require("fs");
const path = require('path');

const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?'
    },
    {
        type: 'input',
        name: 'screenshot',
        message: 'Provide the path to a JPEG screenshot of your project (leave empty if not available):'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description including motivation, what you built, what problem it solves, and what you learned.'
    },
    {
        type: 'input',
        name: 'tableOfContents',
        message: '(Optional) Provide a table of contents for larger projects.'
    },
    {
        type: 'input',
        name: 'install',
        message: 'Install - What are the steps required to install your project?'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Usage - Provide instructions and examples of use.'
    },
    {
        type: 'input',
        name: 'credits',
        message: 'Credits - Provide a list of collaborators, tutorials, and sources used.'
    },
    {
        type: 'input',
        name: 'badges',
        message: 'Badges - Provide any badges you want to include (e.g., build status, version, license):'
    }
];
function writeToFile(fileName, data) {
    const filePath = path.join(__dirname, fileName);

    let markdownContent = `
# ${data.title}

## Description
${data.description}

`;

    markdownContent += `## Table of Contents\n`;
    if (data.tableOfContents) {
        const tocItems = data.tableOfContents.split(',').map(item => item.trim());
        tocItems.forEach(item => {
            if (item !== '') {
                const anchorLink = item.toLowerCase().replace(/\s+/g, '-');
                markdownContent += `  - [${item}](#${anchorLink})\n`;
            }
        });
    } else {
        markdownContent += `  - Not provided\n`;
    }

    markdownContent += `\n`;

    if (data.install) {
        markdownContent += `## Install\n${data.install}\n\n`;
    }

    if (data.usage) {
        markdownContent += `## Usage\n${data.usage}\n\n`;
    }

    if (data.credits) {
        markdownContent += `## Credits\n${data.credits}\n\n`;
    }

    if (data.badges) {
        markdownContent += `## Badges\n${data.badges}\n\n`;
    }

    fs.writeFile(filePath, markdownContent, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
        }
    });
}

function init() {
    inquirer
        .prompt(questions)
        .then(answers => {
            writeToFile('README.md', answers);
        })
        .catch(error => {
            console.error('Error occurred during user input:', error);
        });
}
init();