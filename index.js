const bitbar = require('bitbar');
const serverUtils = require('cbiServerUtils');
const _ = require('lodash');

const { getManyServers } = serverUtils;

const { sep: Separator } = bitbar;

const DEFAULT_ENVS = ['dev', 'prod'];
const DEFAULT_SERVERS = ['api', 'cbi-site', 'test-runner'];

const setupSshActions = (envs, servers) =>
  getManyServers(envs, servers)
    .then((serverMap = {}) =>
      Object.keys(serverMap).map(server => ({
        text: server,
        submenu: envs.map(env => ({
          text: `${env} servers`,
          submenu: serverMap[server][env].map(ip => ({
            text: `ssh to ${ip}`,
            bash: 'ssh',
            param1: ip,
            terminal: true
          }))
        }))
      }))
    )
    .catch(err => {
      console.log('ERRRRROR');
      return null;
    });

setupSshActions(DEFAULT_ENVS, DEFAULT_SERVERS)
  .then(sshStuff => {
    const aboveTheFold = {
      text: 'SSH',
      color: bitbar.darkMode ? 'white' : 'red',
      dropdown: false
    };
    return bitbar([
      aboveTheFold,
      Separator,
      { text: 'SSH To Servers', size: '15' },
      ...sshStuff
    ]);
  })
  .catch(console.log);
