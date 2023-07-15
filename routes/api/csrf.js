const express = require('express');
const router = express.Router();

const {isProduction} = require('../../config/keys');
  // In development, allow developers to gain access to the CSRF token to test
  // the server endpoints in Postman

if (!isProduction){
    router.get('/restore', function(req, res) {
        const csrfToken = req.csrfToken()
        res.cookie("CSRF-TOKEN", csrfToken);
        res.status(200).json({
            'CSRF-Token': csrfToken
        });
        console.log(csrfToken)
    });
}

module.exports = router;