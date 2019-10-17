let task = require(Editor.url('packages://bacon2-game/lib/task.js'));

// panel/index.js, this filename needs to match the one registered in package.json
Editor.Panel.extend({
  // css style for panel
  style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

  // html template for panel
  template: `
    <h2>bacon2</h2>
    <hr />
    <div>State: <span id="label">--</span></div>
    <hr />
    <ui-button id="export">导出配置</ui-button>
  `,

  // element and variable binding
  $: {
    export: '#export',
    label: '#label',
  },

  // method executed when template and styles are successfully loaded and initialized
  ready () {
    this.$export.addEventListener('confirm', () => {
      // Editor.Ipc.sendToMain('bacon2:clicked');
      task.exportFile();
    });
  },

  // register your ipc messages here
  messages: {
    'bacon2:hello' (event) {
      this.$label.innerText = 'Hello!';
    }
  }
});