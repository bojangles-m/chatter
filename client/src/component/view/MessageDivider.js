import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Config from '../../../config';

const MessageDivider = ({ timestamp, display }) => {
    return (
        display && (
            <div className="message-divider">
                <span>{moment(timestamp).calendar(null, Config.app.dateFormat)}</span>
            </div>
        )
    );
};

const propTypes = {
    /**
     * Date in timestamp
     */
    timestamp: PropTypes.number,

    /**
     * Make date visible or hidden
     */
    display: PropTypes.bool,
};

const defaultProps = {
    timestamp: 0,
    display: false,
};

MessageDivider.propTypes = propTypes;
MessageDivider.defaultProps = defaultProps;

export default MessageDivider;
