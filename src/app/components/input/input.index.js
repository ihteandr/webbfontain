// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './input.styles.scss';


type Props = {
    size: string,
    onChange?: (e: any) => *,
    onKeyUp?: (e: any) => *,
};

export function Input(props: Props) {
    const inputProps = {};
    if (props.onChange) {
        inputProps.onChange = props.onChange;
    }
    if (props.onKeyUp) {
        inputProps.onKeyUp = props.onKeyUp;
    }
    return (
        <input {...inputProps} className={`input ${props.size}`} />
    );
}

Input.propTypes = {
    size: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

Input.defaultProps = {
    size: 'medium',
};

