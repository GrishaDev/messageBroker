const startApp = require('./express/server');
const { startBroker } = require ('./broker');

(async ()=> {
    startBroker();
    startApp();
})();