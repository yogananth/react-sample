'use strict';

var React           =   require('react');
var classNames      =   require('classnames');
var validations     =   require('./validations');
var Popover         =   require('../Popover.jsx');
var _               =   require('lodash');

var InputText = React.createClass({

    getDefaultProps: function() {
        return {
            type: 'text'
        };
    },

    getInitialState: function() {
        return { value: this.props.value || undefined };
    },

    onChange: function(event) {
        this.setState( {
                            value: event.target.value,
                            error: false,
                            errors: null
                        } );
    },

    validate: function() {
        var errors = validations.validate(this.state.value, this.props.validations);
        this.setState({
            error: (errors.length > 0),
            errors: errors
        });
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
        console.log (this.refs);
    },

    render: function render() {
        var groupClass = classNames( 'form-group has-feedback',
                             this.props.groupClass,
                             { 'has-error': this.state.error }
                            );
        return (
            <div className={groupClass} id={this.props.groupId || 'c-' + this.props.id}>
                <label
                    className='control-label'
                    htmlFor={this.props.id}
                >{this.props.labelText}</label>

                <input
                    {...this.props}
                    ref={this.props.refElement}
                    type={this.props.type}
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    className={classNames('form-control', this.props.className)}
                    value={this.state.value}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                ></input>

                <p className='error'>
                    {this.getValidationErrors()}
                </p>

            </div>
        );
    }
});

module.exports = InputText;
