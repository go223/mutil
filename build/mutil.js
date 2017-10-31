let path = require('path');
let fs = require('fs');
let HtmlWebpackPlugin = require('html-webpack-plugin');

//缓存多页面模块列表
let moduleList;
//模块根目录
let moduleRootPath = './src/module';

//获取js入口数组
exports.getEntries = function getEntries () {
    //缓存js入口数组
    var entries = {};
    //初始化模块列表
    this.getModuleList();
    //变量模块列表
    moduleList.forEach(function(module) {
        if (module.moduleID != '' && module.moduleJS != '') {
            entries[module.moduleID] = module.moduleJS;
        }
    });
    console.log('============================entries================================')
    console.log(entries);
    return entries;
}

//获取多页面模块列表
exports.getModuleList = function getModuleList () {
    if (moduleList) {
        return moduleList;
    } else {
        moduleList = new Array();
        readDirSync(moduleRootPath,'');
        console.log('============================moduleList===============================')
        console.log(moduleList);
        return moduleList;
    }
}

//获取dev页面的模板集合
exports.getDevHtmlWebpackPluginList = function getDevHtmlWebpackPluginList () {
    //缓存dev的html模板
    var devHtmlWebpackPluginList = [];
    //获取多页面模板集合
    var moduleList = this.getModuleList();
    //遍历生成的html模板
    moduleList.forEach(function(mod) {
        var conf = {
            filename:mod.moduleID+'.html',
            template:mod.moduleHTML,
            chunks:[mod.moduleID],
            inject:true
        }
        //添加HtmlWebpackPlugin对象
        devHtmlWebpackPluginList.push(new HtmlWebpackPlugin(conf))
    });
    console.log('==========================devHtmlWebpackPluginList================================')
    console.log(devHtmlWebpackPluginList);
    return devHtmlWebpackPluginList;
}

//获取prod的html模板集合
exports.getProdHtmlWebpackPluginList = function getProdHtmlWebpackPluginList () {
    //缓存prod的html模板
    var prodHtmlWebpackPluginList = [];
    //获取多页面的模块集合
    var moduleList = this.getModuleList();
    //遍历html模板
    moduleList.forEach(function(mod) {
        var conf = {
            filename:mod.moduleID + '.html',
            template:mod.moduleHTML,
            inject:true,
            minify:{
                removeComments:true,
                collapseWhitespace:false,
                removeAttributeQuotes:true
            },
            chunksSortMode:'dependency',
            chunks:['manifest','vendor',mod.moduleID]
        }

        prodHtmlWebpackPluginList.push(new HtmlWebpackPlugin(conf));
    });
    console.log('==========================prodHtmlWebpackPluginList===================================')
    console.log(prodHtmlWebpackPluginList)
    return prodHtmlWebpackPluginList;
}

//遍历目录，整理多页面模块
function readDirSync (path,moduleName) {
    //缓存模块对象
    var module = {
        moduleID:'',
        moduleHTML:'',
        moduleJS:''
    };
    //获取当前模块ID
    var moduleID = path.replace(moduleRootPath+'/','');
    if (path == moduleRootPath) {
        moduleID = '';
    }
    module.moduleID = moduleID;
    //获取目录下的所有文件及文件夹
    var pa = fs.readdirSync(path);
    pa.forEach(function (ele,index) {
        var info = fs.statSync(path+'/'+ele);
        if (info.isDirectory()) {
            readDirSync(path+'/'+ele,ele);
        } else {
            //判断当前模块的html是否存在
            if (moduleName+'.html' == ele) {
                module.moduleHTML = path+'/'+ele;
            }
            //判断当前模块的js是否存在
            if (moduleName+'.js' == ele) {
                module.moduleJS = path+'/'+ele;
            }
        }
    });
    if ((module.moduleID != '' && module.moduleHTML != '') || (module.moduleID != '' && module.moduleJS != '')) {
        moduleList.push(module);
    }
}