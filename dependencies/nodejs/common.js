const config = require('/opt/nodejs//config');
const AWS = require('aws-sdk');
const {Storage} = require('@google-cloud/storage');
const fs = require('fs');
const os = require('os');
const path = require('path');
const uuidv4 = require('uuid/v4');

exports.getSourceObject = async (event) => {
    let bucket;
    let key;

    let filesProcessed = event.Records.map( (record) => {
        bucket = record.s3.bucket.name;
        key = record.s3.object.key;
    } );

    const s3 = new AWS.S3({
        region: config.credentials.aws.region
    });

    let result = await s3.getObject({
        Bucket: bucket,
        Key: key
    }).promise();

    return {
        Body: result.Body,
        ContentType: result.ContentType,
        Key: key,
    };
}

exports.copyBucketObject = async (object) => {
    let promises = [];

    promises.push(new Promise((resolve, reject) => {
        exports.copyBucketObjectAws(object);
        exports.copyBucketObjectGoogle(object);
    }));

    return Promise.all(promises);
}

exports.copyBucketObjectAws = async (object) => {
    const s3 = new AWS.S3({
        accessKeyId: config.credentials.aws.accessKeyId,
        secretAccessKey: config.credentials.aws.secretAccessKey
    });

    let Bucket = config.credentials.aws.bucket;
    let Body = object.Body;
    let Key = object.Key;
    let ContentType = object.ContentType;

    let params = {
        Body: Body,
        Bucket: Bucket,
        Key: Key,
        ContentType: ContentType,
    }

    return await s3.putObject(params).promise();
}

exports.copyBucketObjectGoogle = async (object) => {
    const storage = new Storage({keyFilename: "/opt/nodejs/key.json"});
    const bucketName = config.credentials.google.bucket;
    const bucket = storage.bucket(bucketName);

    let filename = path.basename('/' + object.Key);
    let filePath = os.tmpdir() + '/' + uuidv4() + '-' + filename;
    fs.writeFileSync(filePath, object.Body.toString());
    let destination = object.Key;

    let result =  await bucket.upload(filePath, {
        destination: destination,
        resumable: false
    });

    fs.unlinkSync(filePath);

    return result;
}