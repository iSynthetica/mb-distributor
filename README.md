# Milkbox Funnels Distributor

```shell script
serverless deploy --stage development --deploymentbucket milkbox-cloudformation-templates --assetsbucket assets-dev.milkbox.dev -v
```

## Travis env variables
### Staging
- AWS_ACCESS_KEY_ID_MBDIST_STAGING
- AWS_SECRET_ACCESS_KEY_MBDIST_STAGING
- AWS_BUCKET_MBDIST_ASSETS_STAGING - assets AWS bucket name
- AWS_BUCKET_MBDIST_DEST_STAGING - destination AWS bucket name
- AWS_ACCESS_KEY_ID_MBDIST_DEST_STAGING
- AWS_SECRET_ACCESS_KEY_MBDIST_DEST_STAGING
- GOOGLE_BUCKET_MBDIST_DEST_STAGING - destination GC bucket name

### Production
- AWS_ACCESS_KEY_ID_MBDIST_PROD
- AWS_SECRET_ACCESS_KEY_MBDIST_PROD
- AWS_BUCKET_MBDIST_ASSETS_PROD - assets AWS bucket name
- AWS_BUCKET_MBDIST_DEST_PROD - destination AWS bucket name
- AWS_ACCESS_KEY_ID_MBDIST_DEST_PROD
- AWS_SECRET_ACCESS_KEY_MBDIST_DEST_PROD
- GOOGLE_BUCKET_MBDIST_DEST_PROD - destination GC bucket name

### Encrypt destination credentials
1. Install Travis
    ```shell script
    sudo gem install travis
    ```
2. Login to Travis
    ```shell script
    travis login --com
    ```
3. Input Github credentials
#### Google storage


### Encrypt credential file (Ubuntu)

4. Encrypt files for staging
    ```shell script
    travis encrypt-file integration/google/credentials.json integration/google/credentials.json.enc
    ```
5. Add decription command to before_install: from result, it would be something like this
    ```shell script
    openssl aes-256-cbc -K $encrypted_<some_key>_key -iv $encrypted_<some_key>_iv -in integration/google/credentials.json.enc -out integration/google/credentials-staging.json -d
    ```
    Make sure to add integration/google/credentials.json.enc to the git repository.
    Make sure not to add integration/google/credentials.json to the git repository.
    Commit all changes to your .travis.yml.

```shell script
travis encrypt-file help/key-development.json dependencies/nodejs/key-development.json.enc
```