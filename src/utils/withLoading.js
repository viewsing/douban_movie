import React from 'react';

export default function withLoading (Wrapped) {
    return function({status, ...otherProps}) {
        if (status === 'success') {
            return <Wrapped {...otherProps} />
        } else {
            return <div className="loading-container"><div className="loading"></div></div>
        }
    }
}

