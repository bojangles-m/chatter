import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import MessageBox from './MessageBox';
import classNames from 'classnames';
import Button from './view/Button';
import moment from 'moment';

const MessageList = React.forwardRef(
    (
        {
            messages,
            onFetchMessages,
            isFarAway,
            showGoToBottom,
            goToBottom,
            changeMessageStatus,
            jumpToBottom,
            jumpToBottomSent,
        },
        ref,
    ) => {
        const [listItems, setListItems] = useState([]);
        const [isFetchingBottom, setIsFetchingBottom] = useState(false);
        const [isFetchingTop, setIsFetchingTop] = useState(false);

        useEffect(() => {
            const node = ref.current;
            node.addEventListener('scroll', onScroll);
            node.addEventListener('scroll', onScrollToBottom);
            node.addEventListener('scroll', onScrollToTop);

            return () => {
                node.addEventListener('scroll', onScroll);
                node.removeEventListener('scroll', onScrollToBottom);
                node.removeEventListener('scroll', onScrollToTop);
            };
        }, []);

        useEffect(() => {
            setListItems(messages);

            if (isFetchingTop) {
                setIsFetchingTop(false);
                ref.current.scrollTop = 250;
            }

            if (isFetchingBottom) {
                setIsFetchingBottom(false);
            }
        }, [messages]);

        /**
         * New messages are fetched
         */
        useEffect(() => {
            if (isFetchingBottom) fetchingBottom();

            if (isFetchingTop) fetchingTop();
        }, [isFetchingBottom, isFetchingTop]);

        /**
         * Function triggered on scroll
         * At the bottom the method 'fetchingBottom' to fetch
         * new messages is triggered
         */
        function onScrollToBottom() {
            const node = ref.current;
            if (node.scrollHeight - node.scrollTop > node.offsetHeight) return;
            setIsFetchingBottom(true);
        }

        /**
         * Function triggered on scroll
         * At the top the method 'fetchingTop' to fetch
         * new messages is triggered
         */
        function onScrollToTop() {
            if (ref.current.scrollTop > 0) return;
            setIsFetchingTop(true);
        }

        /**
         * Fetch new messages from top
         */
        function fetchingTop() {
            onFetchMessages('top');
        }

        /**
         * Fetch new messages from bottom
         */
        function fetchingBottom() {
            onFetchMessages('bottom');
        }

        /**
         * Jump to the buttom when message was sent
         */
        useEffect(() => {
            if (jumpToBottomSent)
                setTimeout(() => {
                    const node = ref.current;
                    node.scrollTop = node.scrollHeight - node.offsetHeight;
                }, 10);
        }, [jumpToBottomSent]);

        /**
         * Effect on button and his event
         */
        const [endIsFarAway, setEndIsFarAway] = useState(false);
        const [isGoToBottomClicked, setIsGoToBottomClicked] = useState(false);

        useEffect(() => {
            setEndIsFarAway(showGoToBottom);
        }, [showGoToBottom]);

        useEffect(() => {
            if (jumpToBottom && ((endIsFarAway && isGoToBottomClicked) || !endIsFarAway)) {
                setTimeout(() => {
                    const node = ref.current;
                    node.scrollTop = node.scrollHeight - node.offsetHeight;
                    setIsGoToBottomClicked(false);
                }, 10);
            }
        }, [jumpToBottom]);

        /**
         * Shows and hides button on scroll
         */
        function onScroll() {
            const node = ref.current;
            const show = isFarAway() || node.scrollHeight - 2 * node.offsetHeight - node.scrollTop > 0 ? true : false;
            setEndIsFarAway(show);
        }

        /**
         * Button click
         */
        function onClick() {
            if (!isGoToBottomClicked) {
                setIsGoToBottomClicked(true);
                goToBottom();
            }
        }

        /**
         * If two dates are same returns false else true
         * @param {Number} timestamp - date
         * @return {Boolean}
         */
        let day = 0;
        const displayDivider = (timestamp) => {
            let display = false;

            if (day !== moment(timestamp).format('MMDD')) {
                day = moment(timestamp).format('MMDD');
                display = true;
            }

            return display;
        };

        return (
            <div ref={ref} className="message-list" data-testid="message-list">
                {endIsFarAway && (
                    <Button
                        id="to-bottom"
                        className={classNames('to-bottom-arrow')}
                        onClick={onClick}
                        label=""
                        data-testid="to-bottom"
                    />
                )}

                {listItems.map((m) => {
                    return (
                        <MessageBox
                            ref={React.createRef()}
                            key={m.id}
                            text={m.text}
                            status={m.status}
                            type={m.direction}
                            timestamp={Number(m.timestamp)}
                            id={m.id}
                            onSatusChangeFire={changeMessageStatus}
                            parent={ref.current}
                            displayMessageDivider={displayDivider(Number(m.timestamp))}
                        />
                    );
                })}
            </div>
        );
    },
);

const propTypes = {
    /**
     * Array of messages
     */
    messages: PropTypes.array,

    /**
     * Fetch messages on scrolling to top or bottom
     */
    onFetchMessages: PropTypes.func,

    /**
     * Returns bool if we are far away from end of messages
     */
    isFarAway: PropTypes.func,

    /**
     * When the button should be visible
     */
    showGoToBottom: PropTypes.bool,

    /**
     * Method for the button
     */
    goToBottom: PropTypes.func,

    /**
     * Passed to child and is triggered when child is in the view
     */
    changeMessageStatus: PropTypes.func,

    /**
     * Triggered when message is received and when button is clicked
     */
    jumpToBottom: PropTypes.number,

    /**
     * Triggered when message is sent to jump to the end of conversation
     */
    jumpToBottomSent: PropTypes.number,
};

const defaultProps = {
    messages: [],
    showGoToBottom: false,
    jumpToBottom: 0,
    jumpToBottomSent: 0,
};

MessageList.propTypes = propTypes;
MessageList.defaultProps = defaultProps;

export default MessageList;
