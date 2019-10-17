'use strict';
// var task = require('./lib/task');

module.exports = {
  load () {
    // execute when package loaded
  },

  unload () {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'open' () {
      // open entry panel registered in package.json
      Editor.Panel.open('bacon2-game');
    },
    'say-hello' () {
      Editor.log('Hello World!');
      // send ipc message to panel
      Editor.Ipc.sendToPanel('bacon2-game', 'bacon2:hello');
    },
    'clicked' () {
      Editor.log('Button clicked!');
    },
    'export' () {
      Editor.log('导出配置: ' + Editor.project.path);
      var task = require('./lib/task');
      task.exportFile();
    }
  },
};