import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../assets/icons';

const HeaderReceiver = ({ name, stylePrefix }) => (
    <div className={classNames(stylePrefix)}>
        <Icon name="Avatar" width="30px" />
        <div className="user">
            <div className="name">{name}</div>
            <div className="action">User is typing ...</div>
        </div>
    </div>
);

const propTypes = {
    /**
     * @default 'header-receiver'
     */
    stylePrefix: PropTypes.string,

    /**
     * Name of the user who recives the message
     */
    name: PropTypes.string,
};

const defaultProps = {
    stylePrefix: 'header-receiver',
};

HeaderReceiver.propTypes = propTypes;
HeaderReceiver.defaultProps = defaultProps;

export default HeaderReceiver;
