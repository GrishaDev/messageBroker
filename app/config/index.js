const env = require('env-var');
require('./dotenv');

module.exports = {
    env: env.get('env').default('dev').asString(),
    webPort: env.get('PORT').required().asIntPositive(),
}