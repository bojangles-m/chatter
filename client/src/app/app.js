import React, { Component } from 'react';
import MessageList from '../component/MessageList';
import SendMessage from '../component/SendMessage';
import HeaderSender from '../component/view/HeaderSender';
import HeaderReceiver from '../component/view/HeaderReceiver';
import _Chatter from '../lib/chatter';

class App extends Component {
    constructor(props) {
        super(props);

        this.msgRef = React.createRef();

        this.state = {
            messages: [],
            numOfUnreadMessages: 0,
            showGoToBottom: false,
            jumpToBottom: 0,
            jumpToBottomSent: 0,
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.onFetchMessages = this.onFetchMessages.bind(this);
        this.goToBottom = this.goToBottom.bind(this);
        this.changeMessageStatus = this.changeMessageStatus.bind(this);
    }

    componentDidMount() {
        _Chatter.joinTheConversation({
            init: (msgs, numOfUnreadMessages, isFarAway) => {
                this.setState({
                    messages: msgs,
                    numOfUnreadMessages: numOfUnreadMessages,
                    showGoToBottom: isFarAway,
                });
            },

            onNewMessage: (msgs, numOfUnreadMessages, doJump) => {
                this.setState({
                    messages: msgs,
                    numOfUnreadMessages: numOfUnreadMessages,
                    jumpToBottom: !doJump ? this.state.jumpToBottom : this.state.jumpToBottom + 1,
                });
            },
        });

        _Chatter.init();
    }

    onFetchMessages(action) {
        const msgs = action === 'bottom' ? _Chatter.fetch() : _Chatter.fetchTop();
        this.setState({ messages: msgs });
    }

    sendMessage(text) {
        _Chatter.sendMessage(text, (msgs) => {
            this.setState({
                messages: msgs,
                jumpToBottomSent: this.state.jumpToBottomSent + 1,
                showGoToBottom: false,
            });
        });
    }

    goToBottom = () => {
        const msgs = _Chatter.unreadMessages().count
            ? _Chatter.fetchStartOfUnreadMessages()
            : _Chatter.fetchTheEndOfMessages();

        this.setState({ messages: msgs, jumpToBottom: this.state.jumpToBottom + 1 });
    };

    changeMessageStatus = (id, status) => {
        _Chatter.updateMessage(id, { status: status });
        this.setState({ numOfUnreadMessages: _Chatter.unreadMessages().count });
    };

    render() {
        return (
            <>
                <HeaderSender name="User101" numOfUnreadMessages={this.state.numOfUnreadMessages} />
                <HeaderReceiver name="User303" />

                <MessageList
                    ref={this.msgRef}
                    messages={this.state.messages}
                    onFetchMessages={this.onFetchMessages}
                    isFarAway={() => _Chatter.isFarAway()}
                    showGoToBottom={this.state.showGoToBottom}
                    goToBottom={this.goToBottom}
                    changeMessageStatus={this.changeMessageStatus}
                    jumpToBottom={this.state.jumpToBottom}
                    jumpToBottomSent={this.state.jumpToBottomSent}
                />

                <SendMessage sendMessage={this.sendMessage} />
            </>
        );
    }
}

export default App;
