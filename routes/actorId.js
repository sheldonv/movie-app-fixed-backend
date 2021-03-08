const express = require('express');
const actorRouter = express.Router();
const request = require('request');
const apiKey = 'a770c05458ba7641214d3596643d0d67';

actorRouter.get('/:actorId', (req, res, next) => {
    const actorId = req.params.actorId;
    console.log(actorId)
    request.get({
        uri: `https://api.themoviedb.org/3/person/${actorId}?`,
        qs: {
            api_key: 'a770c05458ba7641214d3596643d0d67',
            language: 'en-US',
            append_to_response: 'changes,combined_credits,external_ids,images,tagged_images,translation,latest,popular'
        }
    }).pipe(res);
})

module.exports = actorRouter;

