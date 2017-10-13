var path=require("path");
var fs=require('fs');
var config={
    entry:["_base.css","source"],
    output:"animate.css",
    minoutput:"animate.min.css"
}

var writepath=path.resolve(__dirname,config.output);
var minwritepath=path.resolve(__dirname,config.minoutput);
function exists(path){
    return fs.existsSync(path) || path.existsSync(path);
}
function isFile(path){
    return exists(path) && fs.statSync(path).isFile();
}
function isDir(path){
    return exists(path) && fs.statSync(path).isDirectory();
}
function isCssFile(file){
    return /\S+\.css$/.test(file);
}
function appendFile(file){
    var recent=path.resolve(__dirname,file);
    if(isFile(recent)){
        var data=fs.readFileSync(recent, 'utf8');
        var mindata=data.replace(/\s/g,"");
        fs.appendFileSync(writepath,data);
        fs.appendFileSync(minwritepath,mindata);
    }
}
function merge(toppath){
        if(isDir(toppath)){
           var files= fs.readdirSync(toppath);
            for(var i=0;i<files.length;i++){
                var p=toppath+"/"+files[i];
                if(isCssFile(files[i])){
                    appendFile(p)
                }else if(isDir(p)){
                    merge(p)
                }

            }
        }else if(isCssFile(toppath)){
            appendFile(toppath)
        }
}
function run(config){
    fs.writeFileSync(config.output,"");
    fs.writeFileSync(config.minoutput,"");
    config.entry.forEach(function(file){
        merge(file);
    })
}

run(config);






