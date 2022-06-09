const { exec } = require("child_process");
const envUrls = require("./env.urls");

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
      let url = "";

      customEnv = args.split(",").find(elem => elem.startsWith("customEnv="));
      url = args.split(",").find(elem => elem.includes("url="))
      .split(" ").find(elem => elem.startsWith("url="));

      console.log("\n"+"Env is: "+url);
      console.log("Custom url is:"+customEnv+"\n");
      
      if(customEnv != undefined){
        customEnv = customEnv.replace("customEnv=","").replace(/["']/g, "");
        command = command.concat(` --config baseUrl=${customEnv}`)
        return command;
      }
      else if(url != undefined){
        switch(true){
          case (url == "url=dev"):
            command = command.concat(` --config baseUrl=${envUrls.DEV}`);
            break;
          case (url == "url=staging"):
            command = command.concat(` --config baseUrl=${envUrls.STAGING}`);
            break;
          case (url == "url=prod"):
            command = command.concat(` --config baseUrl=${envUrls.PROD}`);
            break;
        }        
        return command;
      }
    }
    throw new Error("Invalid args!");
}

module.exports = {_exec, _mutateCommand};