'use strict';

const express = require('express');
const aws = require('aws-sdk');
const s3 = new aws.S3();
// Constants
const PORT = 80;

// App
const app = express();
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/list', (req, res) => {
    s3.listBuckets({}, (err, data) => {
        if (err) {
            console.log(`Caught error ${err}.`);
            res.status(500).send('Error listing S3 buckets');
        } else {
            console.log('S3 Buckets:', data.Buckets);
            res.json(data.Buckets.map(bucket => bucket.Name));
        }
    });
    // s3.headBucket({ Bucket: "acl1" }, function (err, data) {
    //     if (err) {
    //         console.log(`Caught error ${err}.`);
    //     }
    //     else {
    //         console.log(data);
    //     }
    // });
});

app.listen(PORT, () => {
    console.log(`Running on http://0.0.0.0:${PORT}`);
});