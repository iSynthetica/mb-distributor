const {
    getSourceObject,
    copyBucketObjectsAws,
    copyBucketObjectsGoogle,
    getBucketObjects
} = require('/opt/nodejs/common');

exports.handler = async(event) => {
    console.log('Hello from distributor one two');

    let sourceObject = await getSourceObject(event);
    let copyToAws = await copyBucketObjectsAws(sourceObject);
    let copyToGoogle = await copyBucketObjectsGoogle(sourceObject);

    return "done";
}