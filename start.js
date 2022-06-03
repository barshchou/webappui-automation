/* eslint-disable no-console */
const { exec } = require("child_process");
const fs = require("fs");

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

console.log(command);
if(args != undefined || args == ""){
  command = command.concat(` ${args}`)
  console.log(command+"\n");
  let customEnv = "";
  customEnv =  args.split(",").find(elem => elem.startsWith("customEnv="))
  if(customEnv != undefined){
    customEnv = customEnv.replace("customEnv=","").replace(/["']/g, "");
    command = command.concat(` --config baseUrl=${customEnv}`)
  }
  console.log(customEnv+"\n");
  console.log(command);
}
if(commandKey.startsWith("cy:") || commandKey.startsWith("currents:")){
  console.log(command);
}

console.log(command);
console.log(args)
exec(command, function(err,stdout,stderr){
    if(err) {
      return stderr;
    } else {
      return stdout;
   }
}).stdout.pipe(process.stdout)