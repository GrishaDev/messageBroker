
const { once, EventEmitter } = require('events');
const brokerObserver = new EventEmitter();

let brokerData = {};

const startBroker = () => {
    console.log('broker started and data is initiliazed(empty)');
}

const insertMessage = (message, topic) => {
    if (!topicExists(topic)) initTopic(topic);
    brokerData[topic].messages.push(message);
    brokerObserver.emit('newMessage', message, topic);
}

const subscribeToTopic = (clientId, topic) => {
    if (!topicExists(topic)) initTopic(topic);
    brokerData[topic].clients.push(clientId);
}

const unsubscribeFromTopic = (clientId, topic) => {
    if (!topicExists(topic)) throw Error('Unsubscribing from topic that doesnt exist');

    const index = brokerData[topic].clients.indexOf(clientId);
    if (index === -1) return;

    return brokerData[topic].clients.splice(index, 1);
}

const listenToChange = async (clientId, callback) => {
    const onMessage = (message, topic) => {
        console.log('new message!');
        console.log(message);
        if(brokerData[topic].clients.includes(clientId)) {
            brokerObserver.removeListener('newMessage', onMessage)
            callback(message)
        }
    };
    brokerObserver.on('newMessage', onMessage);
}

const topicExists = (topic) => brokerData[topic] ? true : false;
const initTopic = (topic) => brokerData[topic] = { messages: [], clients: [] };

module.exports = { startBroker, insertMessage, subscribeToTopic, unsubscribeFromTopic, listenToChange }
