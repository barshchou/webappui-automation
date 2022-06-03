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

function _mutateCommand(command, args){
    if(args != undefined || args == ""){
      command = command.concat(` ${args}`)
      let customEnv = "";
      customEnv =  args.split(",").find(elem => elem.startsWith("customEnv="))
      if(customEnv != undefined){
        customEnv = customEnv.replace("customEnv=","").replace(/["']/g, "");
        command = command.concat(` --config baseUrl=${customEnv}`)
      }
    }
    return command
}

module.exports = {_exec, _mutateCommand};