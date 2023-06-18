# MLBStats
A UI that display sortable player stats (league leaders) and lets users search for both active ane retired players.

Public access: https://dzp4lvirzyla7.cloudfront.net/stats (I didn't pay for a domain name - this was given to me by AWS)

Queries this unofficial API for player data:
API: https://appac.github.io/mlb-data-api-docs/

Hosted on an S3 bucket. Uses a cloudfront distribution to serve the static files over HTTPS and to interface with Angular routing

Developed with Angular2 and Primefaces PrimeNG (an angular UI library) 

Deployment:
- ng build
- Delete files from S3 bucket
- create invalidation on cloudfront to clear cache (/*)
- Upload files to S3 bucket
