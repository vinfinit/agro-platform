# Agro Platform

Serverless react smart agriculture platform.

## How to run locally

### Configure _.env_

```bash
API_URL=http://localhost:3000
MONGODB_URI="MONGODB_URI"             # change to mongodb_uri
JWT_PRIVATE_KEY="JWT_PRIVATE_KEY"     # change to any string
```

### Configure _config.json_

The difference between _config.json_ and _.env_ is _config.json_ can be exposed to frontend but _.env_ is only for server.

Change the values to allow those service to be accessable from localhost. Current values are configured for agro-platfrom-prod.

P.S. it would be better to generate _config.json_ from secrets in CI/CD pipeline. Maybe will do it in next release.

```json
{
  "GMAP_API_KEY": "GMAP_API_KEY",
  "GOOGLE_IDENTITY_CLIENT_ID": "GOOGLE_IDENTITY_CLIENT_ID",
  "DEMO_CLUSTER": "cluster_id"
}
```

### Run server

```bash
npm i -g now
npm install
now dev
```
