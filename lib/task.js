(function () {
    
    var getConfig = require(Editor.url('./getConfig'));
    
    function Task() { }
    
    Task.prototype.exportFile = function () {
        Editor.info('开始: 导出配置文件');
        try {
            getConfig();
            // var cwd = Editor.Package.packagePath('icecream-game');
            // var params = ['install'];
            // spawn(cwd, params, function () {
            //     Editor.success('完成: 导出配置文件');
            // });
        } catch (error) {
            Editor.error('错误: 导出配置文件: ' + error.name + ' - ' + error.message);
        }
    }

    var task = new Task();
    module.exports = task;
})();