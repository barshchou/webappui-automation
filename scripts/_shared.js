const { exec } = require("child_process");
const envUrls = require("./env.urls");

const _envs = {
  DEV: "url=dev",
  STAGE: "url=staging",
  PROD: "url=prod"
}

function _findArg(_args, argName){
  let arg;
  arg = _args.split(",").find(elem => elem.includes(argName));
  if(arg == undefined){
    return;
  }
  else{
    return arg.split(" ").find(elem => elem.startsWith(argName));
  }       
}

function _exec(command,cb) {   
    exec(command, function(err,stdout,stderr){
        if(err) {
          cb(stderr);
        } else {
          cb(stdout);
       }
   }).stdout.pipe(process.stdout);
}

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
        return command;
      }
    }
    throw new Error("Invalid args!");
}

module.exports = {_exec, _mutateCommand};