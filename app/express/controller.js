const { insertMessage, subscribeToTopic, unsubscribeFromTopic, listenToChange } = require('../broker');
const { HttpError } = require ('../utils/Error');

class Controller {
    static async publishMessage(req, res) {
        const { message, topic } = req.body;
        insertMessage(message, topic);
        return res.send('successful message');
    }

    static async subscribe(req, res) {
        const { clientId, topic } = req.body;
        subscribeToTopic(clientId, topic);
        res.send('successful subscribe');
    }

    static async unsubscribe(req, res) {
        const { clientId, topic } = req.body;
        unsubscribeFromTopic(clientId, topic);
        res.send('successful unsubscribe');
    }

    static async listen(req, res) {
        const { clientId } = req.body;
        if(!clientId) throw new HttpError(400, 'specify clientId!');
        listenToChange(clientId, (message) => {
            console.log('message in controller');
            console.log(message);
            res.send(message);
        });
    }
}

module.exports = Controller