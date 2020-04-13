require('dotenv').config();
var fs = require('fs');

const APP_NAME = 'Milkbox Funnels Distributor';
if (process.env.environment.endsWith("-dev"))
    process.env.environment = "staging";

var config = `
module.exports = {
    app:{
        name: '${APP_NAME}'
    },
    
    env: '${process.env.environment}',
    
    credentials: {
        aws: {
            region: 'us-east-1',
            bucket: '${process.env.awsBucket}',
            accessKeyId: '${process.env.accessKeyId}',
            secretAccessKey: '${process.env.secretAccessKey}'
        },
        google: {
            bucket: '${process.env.googleBucket}'
        }
    }
}
`;

fs.writeFileSync(__dirname + '/../dependencies/nodejs/config.js', config);