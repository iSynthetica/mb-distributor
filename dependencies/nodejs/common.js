const config = require('/opt/nodejs//config');
const AWS = require('aws-sdk');
const {Storage} = require('@google-cloud/storage');

exports.validateParams = async (object, schema, allowUnknown = true) => {
    if (empty(schema)) {
        return object;
    }

    const {result, error} = schema.validate(object, { allowUnknown: allowUnknown, abortEarly: false });

    if (error) {
        let error_messages = [];

        error.details.forEach((error) => {
            error_messages.push({ message: error.message });
        });

        return Promise.reject({ statusCode: 400, messages: error_messages, isJoi: true });
    }

    return result; // We return the validated value with any type conversions and other modifiers applied
}

exports.getSourceObject = async (event) => {
    let bucket;
    let key;
    let copySource;

    let filesProcessed = event.Records.map( (record) => {
        bucket = record.s3.bucket.name;
        key = record.s3.object.key;
        copySource = `/${bucket}/${key}`;
    } );

    const s3 = new AWS.S3({
        region: config.credentials.aws.region
    });

    let params = {
        Bucket: bucket,
        Key: key
    };

    let result = await s3.getObject(params).promise();

    return {
        Body: result.Body,
        ContentType: result.ContentType,
        Key: key,
    };
}

exports.getBucketObjects = async () => {
    const s3 = new AWS.S3({
        accessKeyId: config.credentials.aws.accessKeyId,
        secretAccessKey: config.credentials.aws.secretAccessKey
    });

    var params = {
        Bucket: config.credentials.aws.bucket,
        MaxKeys: 2
    };

    return await s3.listObjects(params).promise();
}

exports.copyBucketObjectsAws = async (object) => {
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

exports.copyBucketObjectsGoogle = async (object) => {
    const storage = new Storage({keyFilename: "/opt/nodejs/key.json"});
    const bucketName = config.credentials.google.bucket;
    const bucket = storage.bucket(bucketName);

    let path = '/opt/nodejs/upload/low-polygonal-bear-head-vector_77345-1.jpg';
    let destination = 'account/123/funnel/low-polygonal-bear-head-vector_77345-1.jpg';

    return await bucket.upload(path, {
        destination: destination,
        resumable: false
    });
}