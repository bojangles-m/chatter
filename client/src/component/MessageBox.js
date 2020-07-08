import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { message } from '../lib/message';
import MessageDivider from './view/MessageDivider';
import _Chatter from '../lib/chatter';

const MessageBox = React.forwardRef(
    ({ text, status, type, timestamp, stylePrefix, onSatusChangeFire, parent, displayMessageDivider, id }, ref) => {
        const [msgStatus, setMsgStatus] = useState(message.status.RECEIVED);

        /**
         * Propagate scroll event to parent to be able to trigger
         * status change method when message is in the view
         */
        useEffect(() => {
            setMsgStatus(status);

            const node = ref.current;
            scrollStop(parent, () => onStatusChange(node));

            return () => {
                parent.removeEventListener('scroll', () => onStatusChange(node));
            };
        }, []);

        /**
         * Checks if the message is in the view and triggers
         * method to change status of the message
         * @param {Object} node
         */
        function onStatusChange(node) {
            const rectBounds = node.getBoundingClientRect();

            if (
                type === message.direction.IN &&
                status !== message.status.READ &&
                parent.offsetHeight - rectBounds.top + rectBounds.height > 0 &&
                rectBounds.top > 0
            ) {
                onSatusChangeFire(id, message.status.READ);
                setMsgStatus((status = message.status.READ));
            }
        }

        return (
            <div ref={ref} className={classNames(stylePrefix, 'clearfix')} data-testid="message-box">
                <MessageDivider timestamp={timestamp} display={displayMessageDivider} />
                <div className={classNames('message', type, msgStatus)}>
                    <div className="text">
                        {_Chatter.settings.idVisible && <span className="id">{id}</span>}
                        {text}
                    </div>
                    <div className="info">
                        <div className={classNames('date', 'tick')}>{moment(timestamp).format('HH:mm')}</div>
                    </div>
                </div>
            </div>
        );
    },
);

const scrollStop = function (node, callback) {
    // Make sure a valid callback was provided
    if (!callback || typeof callback !== 'function') return;

    let isScrolling;

    // Listen for scroll events
    node.addEventListener('scroll', (e) => {
        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(() => {
            // Run the callback
            callback();
        }, 66);
    });
};

const propTypes = {
    /**
     * @default 'message'
     */
    stylePrefix: PropTypes.string,

    /**
     * The visual variant of message about the reciver action
     *
     * @type {'send' | 'received' | 'read'}
     */
    status: PropTypes.string,

    /**
     * Was message sent or received
     *
     * @type {'in' | 'out'}
     */
    type: PropTypes.string,

    /**
     * Text of the message
     */
    text: PropTypes.string,

    /**
     * Creation of the Message
     */
    timestamp: PropTypes.number,

    /**
     * Show or hide message divider
     */
    displayMessageDivider: PropTypes.bool,

    /**
     * Method to change message status
     */
    onSatusChangeFire: PropTypes.func,

    /**
     * Parent object
     */
    parent: PropTypes.object,
};

const defaultProps = {
    text: '',
    stylePrefix: 'message-box',
    status: 'send',
    type: 'out',
    timestamp: 0,
    displayMessageDivider: false,
};

MessageBox.propTypes = propTypes;
MessageBox.defaultProps = defaultProps;

export default MessageBox;
