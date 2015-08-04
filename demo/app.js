var React = require('react');
var InputText = require('../src/components/Input/InputText.jsx');
var InputPassword = require('../src/components/Input/InputPassword.jsx');


var genericValidationRules = {
        email : [
            {
                rule: 'email',
                errorText: 'Please enter a valid email address.'
            }
        ],
        number: [
            {
                rule: 'required',
                errorText: 'This is a mandatory field'
            },
            {   rule: 'numberOnly',
                errorText: 'This field accepts only numbers'
            },
            {
                rule: 'minLength',
                expected: 2,
                errorText: 'Does not meet the minimum length criteria'
            },
            {
                rule: 'maxLength',
                expected: 5,
                errorText: 'Exceeds the max length'
            }
        ]
};


var DemoApp = React.createClass({
    render: function() {
        return (
            <div id='user-registration'>
                <h1>Registration</h1>

                {/* Email Address */}
                <InputText 
                    groupId='group-email-field'
                    groupClass='con1 con2'
                    labelText='Email Address?'
                    value='yoga@gmail.com'
                    placeholder='name@domain.tld'
                    className='c1 c2'
                    id='input-email'
                    type='email'
                    validations={genericValidationRules.email}
                ></InputText>

                {/* Number Field */}
                <InputText 
                    groupId='group-number-field'
                    groupClass='con1 con2'
                    labelText='Number?'
                    placeholder='9999'
                    className='c1 c2'
                    id='id-number'
                    type='text'
                    maxLength='6'
                    required='true'
                    validations={genericValidationRules.number}
                ></InputText>

                {/* Password */}
                <InputPassword
                    groupId='group-pwd-field'
                    groupClass='p1 p2'
                    labelText='Password ?'
                    placeholder='Password Placeholder'
                    id='pwd-test'
                    enableUnmask={true}
                    unmaskTime={2000}
                    showMeter={true}
                    minScore={1}
                    validations={[
                        {
                            rule: 'minLength',
                            expected: 6,
                            errorText: 'For your security, we expect a minimum of 6 character password'
                        }]
                    }
                ></InputPassword>

            </div>
        );
    }
});

React.render(<DemoApp />, document.getElementById('app-placeholder'));
