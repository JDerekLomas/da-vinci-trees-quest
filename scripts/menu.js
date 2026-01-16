#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import readline from 'readline';
import chalk from 'chalk';
import inquirer from 'inquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const gameDataDir = path.join(__dirname, '..', 'src', 'GAME_DATA');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const scripts = packageJson.scripts || {};
const args = process.argv.slice(2);

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function formatGameName(gameId) {
  return gameId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function createAbbreviation(scriptName) {
  const gamePart = scriptName.includes(':') ? scriptName.split(':')[1] : scriptName;
  return gamePart.split(/[-: ]+/).map(word => word.charAt(0)).join('');
}

function scoreMatch(pattern, scriptName) {
  const gamePart = scriptName.includes(':') ? scriptName.split(':')[1] : scriptName;
  const gamePartLower = gamePart.toLowerCase();
  const patternLower = pattern.toLowerCase();
  
  //direct
  if (scriptName === pattern) return 100;
  
  //substring
  if (scriptName.includes(pattern)) return 90;
  if (gamePartLower.includes(patternLower)) return 85;
  
  //abbrv
  const abbr = createAbbreviation(scriptName);
  if (abbr === patternLower) return 80;
  
  //prefix
  const scriptLower = scriptName.toLowerCase();
  if (scriptLower.startsWith(patternLower)) return 70;
  
  //partial abbrv
  if (abbr.startsWith(patternLower)) return 60;
  
  //partial word
  const words = gamePartLower.split(/[-: ]+/);
  for (const word of words) {
    if (word.startsWith(patternLower.slice(0, 1))) {
      let matchCount = 1;
      for (let i = 1; i < patternLower.length && i < word.length; i++) {
        if (word[i] === patternLower[i]) matchCount++;
      }
      if (matchCount >= Math.min(2, patternLower.length)) {
        return 55 + (matchCount / patternLower.length * 5);
      }
    }
  }
  
  //letter seq
  let partialLetterMatch = true;
  let lastIndex = -1;
  
  for (const char of patternLower) {
    const nextIndex = gamePartLower.indexOf(char, lastIndex + 1);
    if (nextIndex === -1) {
      partialLetterMatch = false;
      break;
    }
    lastIndex = nextIndex;
  }
  
  if (partialLetterMatch) {
    const density = patternLower.length / (lastIndex + 1 - gamePartLower.indexOf(patternLower[0]));
    return 45 + (density * 5);
  }
  
  //fuzzy
  let matchedChars = 0;
  lastIndex = -1;
  
  for (const char of patternLower) {
    const index = scriptLower.indexOf(char, lastIndex + 1);
    if (index > -1) {
      lastIndex = index;
      matchedChars++;
    }
  }
  
  if (matchedChars === patternLower.length) {
    return 40 + (matchedChars / scriptLower.length) * 10;
  }
  
  return 0;
}

function findBestMatches(patterns) {
  const scriptNames = Object.keys(scripts);
  
  if (patterns.length === 1) {
    const pattern = patterns[0];
    const scoredScripts = scriptNames.map(scriptName => {
      const score = scoreMatch(pattern, scriptName);
      return [scriptName, score];
    });
    
    return scoredScripts
      .filter(([_, score]) => score > 0)
      .sort((a, b) => b[1] - a[1]);
  }
  
  const [commandType, specificPattern] = patterns;
  
  const filteredScripts = scriptNames.filter(scriptName => {
    return scriptName.startsWith(`${commandType}:`) || scriptName === commandType;
  });
  
  if (filteredScripts.length === 0) return [];
  
  if (specificPattern) {
    return filteredScripts
      .map(scriptName => {
        const specificPart = scriptName.includes(':') ? scriptName.split(':')[1] : scriptName;
        const score = scoreMatch(specificPattern, specificPart);
        return [scriptName, score];
      })
      .filter(([_, score]) => score > 0)
      .sort((a, b) => b[1] - a[1]);
  }
  
  return filteredScripts.map(scriptName => [scriptName, 50]);
}

// ==========================================
// SCRIPT EXECUTION FUNCTIONS
// ==========================================

function executeNpmScript(scriptName, extraArgs = []) {
  const npmCommand = `npm run ${scriptName} ${extraArgs.join(' ')}`.trim();
  console.log(chalk.cyan(`\nExecuting: ${npmCommand}\n`));
  
  const child = exec(npmCommand, { stdio: 'inherit', shell: true });
  child.stdout?.pipe(process.stdout);
  child.stderr?.pipe(process.stderr);
  
  child.on('exit', (code) => {
    process.exit(code || 0);
  });
}
async function showMainMenu() {
  console.clear();
  console.log(chalk.bold.green('┌────────────────────────────────────────┐'));
  console.log(chalk.bold.green('│       QUESTS INTERACTIVE MENU          │'));
  console.log(chalk.bold.green('└────────────────────────────────────────┘'));

  const scriptGroups = getScriptGroups();
  const availableGames = getAvailableGames();
  // Menu structure
  const choices = [
    { 
      name: chalk.yellow.bold('▶ Start a Quest'), 
      value: 'start-quest' 
    },
    { 
      name: chalk.magenta.bold('🔨 Build Options'), 
      value: 'build-options' 
    },
    { 
      name: chalk.cyan.bold('🚀 Deploy Options'), 
      value: 'deploy-options' 
    },
    new inquirer.Separator(chalk.gray('────────────────────────────────')),
    { 
      name: chalk.blue.bold('ℹ️ Show Available Quests'), 
      value: 'show-quests' 
    },
    { 
      name: chalk.red.bold('✖ Exit'), 
      value: 'exit' 
    }
  ];

  const mainMenuAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: choices,
      pageSize: 10
    }
  ]);  switch (mainMenuAnswer.action) {
    case 'start-quest':
      await startQuestMenu(availableGames);
      break;
    case 'build-options':
      await buildOptionsMenu(scriptGroups);
      break;
    case 'deploy-options':
      await deployOptionsMenu(scriptGroups, availableGames);
      break;
    case 'show-quests':
      await showQuestsList(availableGames);
      break;
    case 'exit':
      console.log(chalk.green('Goodbye! 👋'));
      process.exit(0);
      break;
  }
}

//quest selection menu
async function startQuestMenu(games) {
  console.clear();
  console.log(chalk.bold.yellow('┌────────────────────────────────────────┐'));
  console.log(chalk.bold.yellow('│             START A QUEST              │'));
  console.log(chalk.bold.yellow('└────────────────────────────────────────┘'));
  
  if (games.length === 0) {
    console.log(chalk.red('No quests found in the GAME_DATA directory.'));
    await promptReturn();
    return;
  }

  const gameChoices = games.map(game => ({
    name: `${chalk.green(game.name)} ${chalk.gray(`(${game.id})`)}`,
    value: game.id
  }));
  
  gameChoices.push(new inquirer.Separator());
  gameChoices.push({ name: chalk.blue('◀ Back to Main Menu'), value: 'back' });

  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'gameId',
      message: 'Select a quest to start:',
      choices: gameChoices,
      pageSize: 15
    }
  ]);

  if (answer.gameId === 'back') {
    await showMainMenu();
  } else {
    const scriptName = `start:${answer.gameId}`;
    if (scripts[scriptName]) {
      executeNpmScript(scriptName);
    } else {
      console.log(chalk.yellow(`\nStarting quest using generic command with game ID: ${answer.gameId}`));
      executeNpmScript('start', [answer.gameId]);
    }
  }
}

//build options menu
async function buildOptionsMenu(scriptGroups) {
  console.clear();
  console.log(chalk.bold.magenta('┌────────────────────────────────────────┐'));
  console.log(chalk.bold.magenta('│            BUILD OPTIONS               │'));
  console.log(chalk.bold.magenta('└────────────────────────────────────────┘'));

  const buildChoices = [];
  
  buildChoices.push({ name: chalk.green('Build All'), value: 'build' });
  buildChoices.push({ name: chalk.yellow('Build Glossary'), value: 'build:glossary' });

  if (scriptGroups.build) {
    const scormScripts = scriptGroups.build.filter(script => script.id.startsWith('build:scorm'));
    if (scormScripts.length > 0) {
      buildChoices.push(new inquirer.Separator(chalk.gray('─── SCORM Builds ───')));
      
      buildChoices.push({
        name: chalk.cyan('Build SCORM (select game)'),
        value: 'build:scorm:select'
      });
    }
  }
  
  buildChoices.push(new inquirer.Separator());
  buildChoices.push({ name: chalk.blue('◀ Back to Main Menu'), value: 'back' });

  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'buildOption',
      message: 'Select a build option:',
      choices: buildChoices,
      pageSize: 10
    }
  ]);

  if (answer.buildOption === 'back') {
    await showMainMenu();
    return;
  } else if (answer.buildOption === 'build:scorm:select') {
    await buildScormMenu(scriptGroups.build);
    return;
  }
  
  executeNpmScript(answer.buildOption);
}

//SCORM build menu
async function buildScormMenu(buildScripts) {
  console.clear();
  console.log(chalk.bold.cyan('┌────────────────────────────────────────┐'));
  console.log(chalk.bold.cyan('│            BUILD SCORM                 │'));
  console.log(chalk.bold.cyan('└────────────────────────────────────────┘'));

  const availableGames = getAvailableGames();
  
  const gameChoices = availableGames.map(game => ({
    name: `${chalk.green(game.name)} ${chalk.gray(`(${game.id})`)}`,
    value: game.id
  }));
  
  gameChoices.push(new inquirer.Separator());
  gameChoices.push({ name: chalk.blue('◀ Back to Build Menu'), value: 'back' });

  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'gameId',
      message: 'Select a quest to build SCORM package:',
      choices: gameChoices,
      pageSize: 15
    }
  ]);

  if (answer.gameId === 'back') {
    await buildOptionsMenu(getScriptGroups());
  } else {
    executeNpmScript('build:scorm', [answer.gameId]);
  }
}

//deployment options menu
async function deployOptionsMenu(scriptGroups, availableGames) {
  console.clear();
  console.log(chalk.bold.cyan('┌────────────────────────────────────────┐'));
  console.log(chalk.bold.cyan('│            DEPLOY OPTIONS              │'));
  console.log(chalk.bold.cyan('└────────────────────────────────────────┘'));

  const deployScripts = Object.keys(scripts).filter(scriptName => 
    scriptName.startsWith('deploy:') && scriptName !== 'deployS3'
  );

  if (deployScripts.length === 0) {
    console.log(chalk.yellow('No deployment scripts found in package.json.'));
    await promptReturn();
    return;
  }

  const deployChoices = [
    {
      name: chalk.cyan('Deploy a Quest'),
      value: 'deploy-quest'
    },
    new inquirer.Separator(),
    { name: chalk.blue('◀ Back to Main Menu'), value: 'back' }
  ];

  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'deployOption',
      message: 'Select a deployment option:',
      choices: deployChoices,
      pageSize: 10
    }
  ]);

  if (answer.deployOption === 'back') {
    await showMainMenu();
    return;
  } else if (answer.deployOption === 'deploy-quest') {
    await deployQuestMenu(availableGames);
    return;
  }
}

//quest deployment menu
async function deployQuestMenu(games) {
  console.clear();
  console.log(chalk.bold.cyan('┌────────────────────────────────────────┐'));
  console.log(chalk.bold.cyan('│             DEPLOY A QUEST             │'));
  console.log(chalk.bold.cyan('└────────────────────────────────────────┘'));
  
  if (games.length === 0) {
    console.log(chalk.red('No quests found in the GAME_DATA directory.'));
    await promptReturn();
    return;
  }

  const gameChoices = games.map(game => ({
    name: `${chalk.green(game.name)} ${chalk.gray(`(${game.id})`)}`,
    value: game.id
  }));
  
  gameChoices.push(new inquirer.Separator());
  gameChoices.push({ name: chalk.blue('◀ Back to Deploy Menu'), value: 'back' });

  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'gameId',
      message: 'Select a quest to deploy:',
      choices: gameChoices,
      pageSize: 15
    }
  ]);

  if (answer.gameId === 'back') {
    await deployOptionsMenu(getScriptGroups(), getAvailableGames());
  } else {
    const scriptName = `deploy:${answer.gameId}`;
    if (scripts[scriptName]) {
      console.log(chalk.cyan(`\nDeploying quest: ${answer.gameId}\n`));
      executeNpmScript(scriptName);
    } else {
      console.log(chalk.yellow(`\nNo specific deployment script found for ${answer.gameId}`));
      console.log(chalk.yellow(`Deploying using generic command with game ID: ${answer.gameId}`));
      executeNpmScript('deploy', [answer.gameId]);
    }
  }
}

//available quests
async function showQuestsList(games) {
  console.clear();
  console.log(chalk.bold.blue('┌────────────────────────────────────────┐'));
  console.log(chalk.bold.blue('│          AVAILABLE QUESTS              │'));
  console.log(chalk.bold.blue('└────────────────────────────────────────┘'));
  
  if (games.length === 0) {
    console.log(chalk.red('No quests found in the GAME_DATA directory.'));
  } else {
    console.log(chalk.yellow('Total quests available: ') + chalk.green(games.length) + '\n');
    
    const formattedList = games.map((game, index) => {
      const indexStr = (`${index + 1}.`).padEnd(4);
      const nameStr = chalk.green(game.name.padEnd(30));
      const idStr = chalk.gray(`(${game.id})`);
      return `${indexStr} ${nameStr} ${idStr}`;
    });
    
    const columnSize = 3;
    for (let i = 0; i < formattedList.length; i += columnSize) {
      const row = formattedList.slice(i, i + columnSize).join('   ');
      console.log(row);
    }
  }
  
  await promptReturn();
}

// Helper to return to previous menu
async function promptReturn() {
  console.log('\n');
  await inquirer.prompt([
    {
      type: 'input',
      name: 'return',
      message: chalk.blue('Press Enter to return to main menu...'),
    }
  ]);
  await showMainMenu();
}

async function main() {
  try {
    if (args.length > 0) {
      const scriptName = process.env.npm_lifecycle_event;
      
      if ((scriptName === 'start' || scriptName === 'deploy') && args.length > 0) {
        const gamePattern = args.join(' ');
        const patterns = [scriptName, gamePattern];
        processWithPatterns(patterns);
      } else {
        let patterns;
        if (args.length >= 2 && (args[0] === 'start' || args[0] === 'deploy')) {
          patterns = [args[0], args[1]];
        } else {
          patterns = args[0].split(' ');
        }
        
        processWithPatterns(patterns);
      }
    } else {
      await showMainMenu();
    }
  } catch (error) {
    console.error(chalk.red('An error occurred:'), error);
    process.exit(1);
  }
}

function processWithPatterns(patterns) {
  const matchedScripts = findBestMatches(patterns);
  
  if (matchedScripts.length === 0) {
    console.log(chalk.red(`No matching scripts found for '${patterns.join(' ')}'`));
    showAvailableScripts();
    process.exit(1);
  }
  
  if (matchedScripts.length === 1 || matchedScripts[0][1] > 60) {
    const [scriptName, score] = matchedScripts[0];
    console.log(chalk.green(`Running: ${scriptName}`));
    
    let extraArgs = [];
    const npmLifecycleEvent = process.env.npm_lifecycle_event;
    
    if (npmLifecycleEvent === 'start' || npmLifecycleEvent === 'deploy') {
      extraArgs = process.argv.slice(3);
    } else if (args.length >= 2 && (args[0] === 'start' || args[0] === 'deploy')) {
      extraArgs = args.slice(2);
    } else {
      extraArgs = args.slice(1);
    }
    
    executeNpmScript(scriptName, extraArgs);
  } else {
    console.log(chalk.yellow('Multiple matching scripts found:'));
    matchedScripts.forEach(([scriptName, score], index) => {
      console.log(chalk.cyan(`${index + 1}. ${scriptName}`));
    });
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question(chalk.yellow('Select a script to run (enter number or "q" to quit): '), answer => {
      rl.close();
      
      if (answer.toLowerCase() === 'q') {
        process.exit(0);
      }
      
      const index = parseInt(answer, 10) - 1;
      if (isNaN(index) || index < 0 || index >= matchedScripts.length) {
        console.log(chalk.red('Invalid selection'));
        process.exit(1);
      }
      
      const [scriptName, _] = matchedScripts[index];
      let extraArgs = [];
      
      const npmLifecycleEvent = process.env.npm_lifecycle_event;
      if (npmLifecycleEvent === 'start' || npmLifecycleEvent === 'deploy') {
        extraArgs = process.argv.slice(3);
      } else if (args.length >= 2 && (args[0] === 'start' || args[0] === 'deploy')) {
        extraArgs = args.slice(2);
      } else {
        extraArgs = args.slice(1);
      }
      
      console.log(chalk.green(`Running: ${scriptName}`));
      executeNpmScript(scriptName, extraArgs);
    });
  }
}

function showAvailableScripts() {
  console.log('\nAvailable scripts:');
  
  const scriptTypes = {};
  Object.keys(scripts).forEach(scriptName => {
    if (scriptName.includes(':')) {
      const [type, name] = scriptName.split(':');
      if (!scriptTypes[type]) {
        scriptTypes[type] = [];
      }
      
      const abbr = createAbbreviation(scriptName);
      scriptTypes[type].push({ name, abbr, fullName: scriptName });
    }
  });
  
  Object.keys(scriptTypes).sort().forEach(type => {
    console.log(`\n${type.toUpperCase()}:`);
    scriptTypes[type].sort((a, b) => a.name.localeCompare(b.name)).forEach(script => {
      console.log(`  - ${script.fullName} ${chalk.gray(`(${script.abbr})`)}`);
    });
  });
}

function getAvailableGames() {
  try {
    return fs.readdirSync(gameDataDir)
      .filter(dir => fs.statSync(path.join(gameDataDir, dir)).isDirectory())
      .map(gameId => {
        return {
          id: gameId,
          name: formatGameName(gameId),
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error(chalk.red('Error reading game directories:'), error.message);
    return [];
  }
}

function getScriptGroups() {
  const scriptGroups = {};
  
  Object.keys(scripts).forEach(scriptName => {
    if (scriptName.includes(':')) {
      const [type, game] = scriptName.split(':');
      if (!scriptGroups[type]) {
        scriptGroups[type] = [];
      }
      
      if (game) { 
        scriptGroups[type].push({
          id: scriptName,
          gameId: game,
          name: formatGameName(game)
        });
      }
    }
  });
  
  Object.keys(scriptGroups).forEach(groupName => {
    scriptGroups[groupName].sort((a, b) => a.name.localeCompare(b.name));
  });
  
  return scriptGroups;
}
main();
