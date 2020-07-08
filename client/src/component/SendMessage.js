import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SendMessage = ({ sendMessage }) => {
    const [msg, setMsg] = useState('');

    return (
        <div className={classNames('send-message')} data-testid="send-message">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(msg);
                    setMsg('');
                }}
            >
                <input
                    className={classNames('text')}
                    name="text"
                    placeholder="Send Message..."
                    type="text"
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                />
            </form>
        </div>
    );
};

const propTypes = {
    /**
     * Event handler when message is sent
     */
    sendMessage: PropTypes.func,
};

SendMessage.propTypes = propTypes;

export default SendMessage;
