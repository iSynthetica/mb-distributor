const {
    getSourceObject,
    copyBucketObject
} = require('/opt/nodejs/common');

exports.handler = async(event) => {
    let sourceObject = await getSourceObject(event);
    let result = await copyBucketObject(sourceObject);

    return "done";
}