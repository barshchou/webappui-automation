const { exec } = require("child_process");
const envUrls = require("./env.urls");

const _envs = {
  DEV: "url=dev",
  STAGE: "url=staging",
  PROD: "url=prod"
}

/**
 * Parses second argument we send to the `start.local.js` script
 * and extracts specific argument that matches `argName`.
 * 
 * Used for retrieving specific args which can be manipulated further.
 * 
 * @param {string} _args String of arguments we send to setup script (`"url=prod,test=test"`, for example)
 * @param {string} argName Name of the argument we want to retrieve (`customEnv`, for example)
 * @returns 
 */
function _findArg(_args, argName){
  let arg;
  arg = _args.split(",").find(elem => elem.includes(argName));
  console.log("arg is "+ arg);
  if(arg == undefined){
    return;
  }
  else{
    console.log(arg.split(" ").find(elem => elem.startsWith(argName)));
    return arg.split(" ").find(elem => elem.startsWith(argName));
  }       
}

/**
 * Executes specific command using `exec` function from `child_process` module
 * and pipes output from this process to main nodejs process.
 * @see https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback
 * @param {string} command 
 * @param {Function} cb 
 */
function _exec(command,cb) {   
    exec(command, function(err,stdout,stderr){
        if(err) {
          cb(stderr);
        } else {
          cb(stdout);
       }
   }).stdout.pipe(process.stdout);
}

/**
 * Mutates command to format where all the CLI arg and npm script's value will be inlined 
 * 
 * Example input:
 * ```shell
 * node .\start.local.js "cy:open" "url=prod,test=test"
 * ```
 * 
 * Example output:
 * ```shell
 * npx cypress open --env url=prod,test=test --config baseUrl=https://app.boweryvaluation.com
 * ```
 * @param {*} command 
 * @param {*} args 
 * @returns 
 */
function _mutateCommand(command, args){
    if(args != undefined || args == ""){
      command = command.concat(` --env ${args}`)

      console.log(args);

      let customEnv = "";
      let url = "";

      customEnv = _findArg(args,"customEnv");
      url = _findArg(args,"url");

      console.log("\n"+"Env is: "+url);
      console.log("Custom url is:"+customEnv+"\n");
      
      if(customEnv != undefined){
        customEnv = customEnv.replace("customEnv=","").replace(/["']/g, "");
        command = command.concat(` --config baseUrl=${customEnv}`)
        return command;
      }
      else if(url != undefined){
        switch(true){
          case (url == _envs.DEV):
            command = command.concat(` --config baseUrl=${envUrls.DEV}`);
            break;
          case (url == _envs.STAGE):
            command = command.concat(` --config baseUrl=${envUrls.STAGING}`);
            break;
          case (url == _envs.PROD):
            command = command.concat(` --config baseUrl=${envUrls.PROD}`);
            break;
        }        
        console.log(command);
        return command;
      }
    }
    throw new Error("Invalid args!");
}

module.exports = {_exec, _mutateCommand};