'use strict';

import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import validations from './validations';
import passwordStrengthCheck from 'zxcvbn';


import Popover from '../Popover.jsx';

/**
 * Properties:
 *
 * groupId          :   ID for the container
 * groupClass       :   Class to be applied to the container
 *
 * lavelText        :   Content for the label
 *
 * id               :   ID for the Password field
 * className        :   Class to be applied for the password field
 * placeholder      :   Input placeholder
 *
 * enableUnmask     :   Should unmask the password input while being typed? {Boolean}
 * unmaskTime       :   Number of Ms to wait to mask the password {Number}
 *
 *
 * States:
 *
 * value            :   Current value
 * error            :   Any error in the password? {Boolean}
 *
 */

module.exports = React.createClass({
    propTypes: {
        type: React.PropTypes.oneOf(['email', 'number', 'text'])
    },

    getDefaultProps: function() {
        return {
            unmaskTime: 1000,
            showMeter: true,
            required: true,
            minScore: 1,
            strengthWords: ['Weak', 'Okay', 'Good', 'Strong', 'Great']
        };
    },

    getInitialState: function() {
        return {
            value: '',
            type: 'password'
        };
    },

    onChange: function(event) {
        this.setState({
                            value: event.target.value,
                            error: false,
                            errors: null
                        });

        if (this.props.showMeter) {
            var score = passwordStrengthCheck(event.target.value).score || 0;
            this.setState( {score: score} );
        }

        if (this.props.enableUnmask) {
            this.setState({type: 'text'});
            this.maskPassword();
        }
    },


    validate: function( /* event */) {
        var errors = validations.validate(this.state.value, this.props.validations);
        this.setState({
            error: (errors.length > 0),
            errors: errors
        });
    },

    maskPassword: function() {
        this.setState({type: 'password'});
    },

    componentWillMount: function() {
        this.maskPassword = _.debounce(this.maskPassword, this.props.unmaskTime);
    },

    getValidationErrors: function() {
        let propValidations = this.props.validations;
        let errorTexts = [];

        if (this.state.errors && this.state.errors.length > 0) {

            this.state.errors.map(function (failedRule) {
                let failedValidation = _.find( propValidations, function(validation) {
                    return validation.rule === failedRule;
                });
                errorTexts.push( <li key={failedValidation.rule}>{failedValidation.errorText} </li> );
            });

            let cssClasses = classNames({'single': (errorTexts.length === 1)});
            let errorMarkup = <ul className={cssClasses}>{errorTexts}</ul>;
            return (
                <Popover
                    content={errorMarkup}
                    isError={true}
                    className={classNames('error', {'show': this.state.showError})}
                    placement='bottom'
                    data-container={'#' + this.props.id}
                    data-selector={'#' + this.props.id}
                    data-placement='bottom'
                ></Popover>
            );

        }
    },


    onBlur: function(event){
        this.validate(event);
        this.setState({showError: false});
    },

    onFocus: function(){
        this.setState({showError: this.state.error});
    },

    render: function() {
        let groupClass = classNames( 'form-group has-feedback',
                                     this.props.groupClass,
                                     { 'has-error': this.state.error }
                                    );

        return (
            <div className={groupClass} id={this.props.groupId}>

                <label
                    className='control-label'
                    htmlFor={this.props.id}
                >{this.props.labelText}</label>

                <input
                    type={this.state.type}
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    className={classNames('form-control', this.props.className)}
                    value={this.state.value}
                    maxLength={this.props.maxLength}
                    required={this.props.required}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                ></input>


                {this.renderPasswordScoreMeter()}

                <p className='error'>
                    {this.getValidationErrors()}
                </p>
            </div>
        );
    },

    renderPasswordScoreMeter: function renderPasswordScoreMeter() {
        if (this.props.showMeter) {
            return (
                <div className='pwd-strength'>
                    <span
                        style={this.getMeterStyle(this.state.score)}
                        className='pwd-meter'
                    ></span>
                    <span
                        className='pwd-strength-words'
                        style={this.getStrengthWordsStyle()}
                    >{this.props.strengthWords[this.state.score]}</span>
                </div>
            );
        }

    },

    /******* STYLES ********/

    // TODO : Move this to components stylesheet
    getMeterStyle: function getMeterStyle(score) {
        let width = this.state.value === '' ? 0 : 24 * score + 4;

        let statusColor = '#5CE592';
        let statusInactiveColor = '#FC6F6F';

        return {
            width: this.props.showMeter ? width + '%' : '100%',
            maxWidth: '85%',
            opacity: this.props.showMeter ? width * .01 + .5 : '1',
            background: (this.state.score >= this.props.minScore) ? statusColor : statusInactiveColor,
            height: 5,
            transition: 'all 400ms linear',
            display: 'inline-block',
            marginRight: '1%'
        };
    },

    getStrengthWordsStyle: function() {
        return {
            fontSize: '0.8em',
            display: (this.state.value.length <= 0) ? 'none' : 'inline-block'
        };
    }
});
