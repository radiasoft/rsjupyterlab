import { ILauncher } from '@jupyterlab/launcher';
import { LabIcon } from '@jupyterlab/ui-components';
import { Widget } from '@lumino/widgets';
import slackIconStr from '../style/slack.svg';
import slackLogo from '../style/slack_logo.svg';


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

class SlackWidget extends Widget {
    constructor() {
        super();
        this.id = 'slack-widget';
        this.title.icon = logo;
        this.node.classList.add('slack-logo');
    }
}

function getSlackUrlWithUid() {
  // POSIT: sirepo.simulation_db.SCHEMA_COMMON.route.authState
  return fetch('/auth-state', {
    method: 'GET',
  })
    .then(data => data.text())
    .then(data => {
        return JSON.parse(data.match(/{(.*)}/)[0]).slackUri;
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
        caption: 'Join Sirepo Slack',
        icon: logo,
        execute: (args) => {
          getSlackUrlWithUid().then(url => window.open(url, "_blank"));
        },
      });

      launcher.add({
        command,
        category: 'Other',
        rank: 1,
      });

      const widget = new SlackWidget();
      getSlackUrlWithUid().then(url => {
        var n = document.createElement('div');
        n.innerHTML = `
                    <div style="background: white; padding: 1em; margin: 1em; justify-content: center;">
                      ${slackIconStr}
                      <br>
                      <a href="${url}" target="_blank">
                        <button class="slack-link">Join Sirepo Slack</button>
                      </a>
                    </div>
                    `;
        widget.node.appendChild(n);
        shell.add(widget, 'left', {rank: 4});
      });
    },
  }
];
