import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const HeaderSender = ({ name, numOfUnreadMessages, stylePrefix }) => (
    <div className={classNames(stylePrefix)} data-testid="header-sender">
        <div>
            {name} ({numOfUnreadMessages} new messages)
        </div>
    </div>
);

const propTypes = {
    /**
     * @default 'header-sender'
     */
    stylePrefix: PropTypes.string,

    /**
     * Name of the user
     */
    name: PropTypes.string,

    /**
     * The number of unread messages
     */
    numOfUnreadMessages: PropTypes.number,
};

const defaultProps = {
    stylePrefix: 'header-sender',
    numOfUnreadMessages: 0,
};

HeaderSender.defaultProps = defaultProps;
HeaderSender.propTypes = propTypes;

export default HeaderSender;
