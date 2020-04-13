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



```shell script
travis encrypt-file help/key.json dependencies/nodejs/credentials-staging.json.enc
```