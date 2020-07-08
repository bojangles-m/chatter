import React from 'react';

import Avatar from './Avatar';

const icon = (props) => {
    switch (props.name) {
        case 'Avatar':
            return <Avatar {...props} />;
        default:
            return <div />;
    }
};

export default icon;
