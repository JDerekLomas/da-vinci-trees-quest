import { createReadStream, writeFileSync, existsSync, mkdirSync, rmSync } from 'fs';
import { parse } from 'csv-parse';
import path from 'path';
import { fileURLToPath } from 'url';

// Define the structure of your glossary entries
interface GlossaryEntry {
  [key: string]: string;
}

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define input and output paths
const inputPath = path.join(__dirname, 'glossary', 'glossary.csv');
const outputPath = path.join('src', 'assets', 'glossary');
const outputFilePath = path.join(outputPath, 'glossary.json');

// Define classname for glossary
const glossaryStyle = 'font-bold text-[#0055B2]';

// Function to convert string to camelCase
const toCamelCase = (str: string): string => {
  // Handle special characters and spaces
  return (
    str
      .toLowerCase()
      // Replace any non-alphanumeric characters with spaces
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      // Split into words
      .split(' ')
      // Remove empty strings
      .filter((word) => word.length > 0)
      // Convert to camelCase
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join('')
  );
};

// Delete existing glossary.json if it exists
if (existsSync(outputPath)) {
  console.log('Deleting existing glossary.json...');
  rmSync(outputPath, { recursive: true, force: true });
}

const records: GlossaryEntry[] = [];

// Create the parser with transformed headers
const parser = parse({
  columns: (headers: string[]) => headers.map(toCamelCase),
  skip_empty_lines: true,
  trim: true,
});

// Set up error handling for the stream
const handleError = (error: Error): void => {
  console.error('Error converting CSV to JSON:', error.message);
  process.exit(1);
};

// To wrap the first occurrence
const wrapTermInDefinition = (term: string, definition: string): string => {
  const regex = new RegExp(`(${term})`, 'i');
  return definition.replace(regex, `<span class="${glossaryStyle}">$1</span>`);
};

const createOutputFolderIfNotExist = (): void => {
  const outputFolder = outputPath;
  console.log("Creating output folder if it doesn't exist:", outputFolder);
  if (!existsSync(outputFolder)) {
    mkdirSync(outputFolder, { recursive: true });
  }
};

// Process the CSV file
createReadStream(inputPath)
  .on('error', handleError)
  .pipe(parser)
  .on('data', (data: GlossaryEntry) => {
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
      // Write the JSON file with pretty formatting
      writeFileSync(outputFilePath, JSON.stringify(records, null, 2));
      console.log(`Successfully converted glossary.csv to glossary.json`);
      console.log(`Total entries: ${records.length}`);

      // Log the first entry to show the camelCase structure
      if (records.length > 0) {
        console.log('Sample entry structure:', Object.keys(records[0]).join(', '));
      }
    } catch (error) {
      handleError(error as Error);
    }
  });
