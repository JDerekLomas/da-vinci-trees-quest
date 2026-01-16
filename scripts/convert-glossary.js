import { createReadStream, writeFileSync, existsSync, mkdirSync, rmSync } from 'fs';
import { parse } from 'csv-parse';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputPath = path.join(__dirname, 'glossary', 'glossary.csv');
const outputPath = path.join('src', 'assets', 'glossary');
const outputFilePath = path.join(outputPath, 'glossary.json');
const glossaryStyle = 'font-bold text-[#0055B2]';
const toCamelCase = (str) => {
    return (str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        .split(' ')
        .filter((word) => word.length > 0)
        .map((word, index) => {
        if (index === 0) {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
        .join(''));
};
if (existsSync(outputPath)) {
    console.log('Deleting existing glossary.json...');
    rmSync(outputPath, { recursive: true, force: true });
}
const records = [];
const parser = parse({
    columns: (headers) => headers.map(toCamelCase),
    skip_empty_lines: true,
    trim: true,
});
const handleError = (error) => {
    console.error('Error converting CSV to JSON:', error.message);
    process.exit(1);
};
const wrapTermInDefinition = (term, definition) => {
    const regex = new RegExp(`(${term})`, 'i');
    return definition.replace(regex, `<span class="${glossaryStyle}">$1</span>`);
};
const createOutputFolderIfNotExist = () => {
    const outputFolder = outputPath;
    console.log("Creating output folder if it doesn't exist:", outputFolder);
    if (!existsSync(outputFolder)) {
        mkdirSync(outputFolder, { recursive: true });
    }
};
createReadStream(inputPath)
    .on('error', handleError)
    .pipe(parser)
    .on('data', (data) => {
    if (data.englishTerm && data.englishDefinition) {
        data.englishDefinition = wrapTermInDefinition(data.englishTerm, data.englishDefinition);
    }
    if (data.spanishTerm && data.spanishDefinition) {
        data.spanishDefinition = wrapTermInDefinition(data.spanishTerm, data.spanishDefinition);
    }
    records.push(data);
})
    .on('error', handleError)
    .on('end', () => {
    try {
        createOutputFolderIfNotExist();
        writeFileSync(outputFilePath, JSON.stringify(records, null, 2));
        console.log(`Successfully converted glossary.csv to glossary.json`);
        console.log(`Total entries: ${records.length}`);
        if (records.length > 0) {
            console.log('Sample entry structure:', Object.keys(records[0]).join(', '));
        }
    }
    catch (error) {
        handleError(error);
    }
});
