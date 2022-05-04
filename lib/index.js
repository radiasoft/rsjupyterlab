import { ILauncher } from '@jupyterlab/launcher';
import { LabIcon } from '@jupyterlab/ui-components';
import { Widget } from '@lumino/widgets';
import slackIconStr from '../style/slack.svg';
import slackLogo from '../style/slack_logo.svg';


console.log(slackIconStr);

const icon = new LabIcon({
  name: 'launcher:slack-icon',
  svgstr: slackIconStr,
  id: 'icon-id'
});

const logo = new LabIcon({
  name: 'slack_logo',
  svgstr: slackLogo,
  id: 'logo-id'
});

class ExampleWidget extends Widget {
  constructor() {
    super();
    this.id = 'simple-widget-example';
    // this.title.label = 'Sirepo Support';
    this.title.icon = logo;
  }
}


async function getUrlWithUID(Url) {
  fetch(Url, {
    method: 'GET',
  })
    .then(data => data.text())
    .then(data => {
      console.log(data);
      console.log(JSON.parse(data.match(/{(.*)}/)[0]));
      window.location.assign(JSON.parse(data.match(/{(.*)}/)[0]).slackUri);
    })
    .catch(e => console.log(e));
}

export default [
  {
    id: 'rsjupyterlab',
    autoStart: true,
    requires: [ILauncher],
    activate: function (app, launcher) {

      const { commands, shell } = app;
      const command = 'jlab-examples:slack-launcher';

      commands.addCommand(command, {
        label: 'Sirepo Slack',
        caption: 'Visit Sirepo Slack boi',
        icon: logo,
        execute: (args) => {
          console.log('go to sirepo slack');
          getUrlWithUID('http://v.radia.run:8080/auth-state')
        },
      });

      launcher.add({
        command,
        category: 'Other',
        rank: 1,
      });

      const widget = new ExampleWidget();
      var n = document.createElement('div');
      n.innerHTML = `
                        <div style="background: white; padding: 1em; margin: 1em; justify-content: center;">
                         ${slackIconStr}
                          <br>
                           <a href="https://www.slack.com">
                                  <button class="slk slkInp"> Visit Sirepo Slack </button>
                                </a>
                        </div>
                      `;
      widget.node.appendChild(n);
      widget.id = 'simple-widget-example';
      console.log('widget.node: ', widget.node);
      widget.node.classList.add('slack-logo');
      shell.add(widget, 'left', {rank: 4});

    },
  }
];
