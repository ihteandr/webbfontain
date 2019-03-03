// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './button.styles.scss';

type Props = {
    onClick?: (any) => *,
    size: string,
    children: any,
    disabled: boolean
};

type ButtonProps = {
    disabled: boolean,
    onClick?: (any) => *,
}
export function Button(props: Props) {
    const buttonProps: ButtonProps = {
        disabled: props.disabled,
    };
    if (props.onClick && !buttonProps.disabled) {
        buttonProps.onClick = props.onClick;
    }
    return (
        <button type="button" {...buttonProps} className={`button ${props.size}`}>
            {props.children}
        </button>
    );
}
Button.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,
};

Button.defaultProps = {
    disabled: false,
    size: 'medium',
};

