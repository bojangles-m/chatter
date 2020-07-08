import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Button = ({ children, label, onClick, className, bsPrefix, ...props }) => {
    const prefix = bsPrefix || 'btn';
    const classes = classNames(prefix, className);

    label = children || label;

    return (
        <button type="button" className={classes} onClick={onClick} {...props}>
            <span>{label}</span>
        </button>
    );
};

const propTypes = {
    /**
     * Sets the text for the button.
     */
    label: PropTypes.string,

    /**
     * A Callback fired when the button is clicked.
     */
    onClick: PropTypes.func,
};

const defaultProps = {
    label: 'Button',
};

Button.displayName = 'Button';
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
