'use strict';

var exportables = {

    validate: function validate(curValue, validationRules) {
        var errors          = [];
        var thisObj         = this;

        validationRules.map(function validateRule(validation) {
            switch (validation.rule) {
                case 'required':
                    // if ( !(thisComponent.state.value) || thisComponent.state.value === '' ) {
                    if ( !curValue || curValue === '' ) {
                        errors.push('required');
                    }
                    break;
                case 'email':
                    if (!thisObj.isValidEmail(curValue)) {
                        errors.push(validation.rule);
                    }
                    break;
                case 'numberOnly':
                    if (!thisObj.isNumber(curValue)) {
                        errors.push(validation.rule);
                    }
                    break;
                case 'minLength':
                    if (!curValue || (curValue.length < validation.expected)) {
                        errors.push(validation.rule);
                    }
                    break;
                case 'maxLength':
                    if (curValue && (curValue.length > validation.expected)) {
                        errors.push(validation.rule);
                    }
                    break;
            }
        });

        return errors;
    },

    isValidEmail: function isValidEmail(email) {
        var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return regex.test(email);
    },

    isNumber: function isNumber(val) {
        var regex = /^[0-9]*$/;
        return regex.test(val);
    }
};

module.exports = exportables;
