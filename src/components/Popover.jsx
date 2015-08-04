'use strict';

// import React from 'react';
// import classNames from 'classnames';

var React = require('react');
var classNames = require('classnames');
require('./Popover.less');

var Popover = React.createClass({
    getDefaultProps: function() {
        return {
            placement: 'right'
        };
    },

    render: function() {
        let classes = classNames('popover', this.props.placement, this.props.className);

        return (
            <div
                role='tooltip'
                {...this.props}
                className={classes}
            >
                <div className='arrow' />
                <div className='popover-content'>
                    {this.props.content}
                </div>
            </div>
        );

    }
});


module.exports = Popover;
