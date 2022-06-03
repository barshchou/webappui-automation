const { exec } = require("child_process");

function _exec(command,cb) {   
    exec(command, function(err,stdout,stderr){
        if(err) {
          cb(stderr);
        } else {
          cb(stdout);
       }
   }).stdout.pipe(process.stdout);
}

function _mutateCommand(command, args, commandKey){
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
    return command
}

module.exports = {_exec, _mutateCommand};