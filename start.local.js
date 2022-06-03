/* eslint-disable no-console */
const fs = require("fs");
const { _exec, _mutateCommand } = require("./scripts/_shared");

let packageJson = fs.readFileSync("package.json", {encoding:"utf-8"});
  
/**
 * @type {string}
 */
let commandKey = `${process.argv[process.argv.length-2]}`;
let args = `${process.argv[process.argv.length-1]}`

/**
 * @type {string}
 */
let command = JSON.parse(packageJson).scripts[commandKey]


command = _mutateCommand(command, args);

console.log("Command: "+command+"\n");
_exec(command, (result)=>{
    console.log(result);
})