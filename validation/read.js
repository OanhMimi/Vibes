const {check} = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateReadInput = [
    check('bookTitle')
        .exists({checkFalsy: true})
        .isLength({min:1,max:50})
        .withMessage('Minimum 1 characters, maximum 50 characters'),

    check('bookAuthorLastName')
        .exists({checkFalsy:true})
        .isLength({min:1,max:50})
        .withMessage('Minimum 1 characters, maximum 50 characters'),

    check('bookAuthorFirstName')
        .exists({checkFalsy:true})
        .isLength({min:1,max:50})
        .withMessage('Minimum 1 characters, maximum 50 characters'),
    
    check('bookCompletion')
        .isBoolean()
        .withMessage('please check whether or not you have completed the book'),

    handleValidationErrors
]

module.exports = validateReadInput;
