const fs = require('fs');
const path = require('path');

function readFilesAndFolders(directory, depth, outputFile) {
    const files = fs.readdirSync(directory);
    fs.appendFileSync(outputFile, `${'  '.repeat(depth)}DIR: ${path.basename(directory)}\n`);

    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            readFilesAndFolders(filePath, depth + 1, outputFile); 
        } else {
            fs.appendFileSync(outputFile, `${'  '.repeat(depth + 1)}FILE: ${file}\n`); 
        }
    });
}

const scriptDirectory = __dirname;  
const outputFile = path.join(scriptDirectory, 'output.txt');

fs.writeFileSync(outputFile, '');

readFilesAndFolders(scriptDirectory, 0, outputFile);

console.log('File has been written');