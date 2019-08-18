import React, { Component } from 'react';


export default class ErrorForm extends Component {


    render() {

        const { UserUnique, UserFormError, ErrorServer, onError } = this.props;

    
        if (UserFormError) {
            return (
                <div className="popup popup-error">
                    <div className="flash flash-full flash-error">
                        Incorrect username or password.
                        <button className="flash-close js-flash-close" type="button" aria-label="Dismiss this message" onClick={onError}>
                            <svg className="octicon octicon-x" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg>
                        </button>
                    </div>
                </div>
            )
        };

        if(ErrorServer) {
            return (
                <div className="popup popup-error">
                    <div className="flash flash-full flash-error">
                        Something has gone terribly wrong. But we are already trying to fix it
                        <button className="flash-close js-flash-close" type="button" aria-label="Dismiss this message" onClick={onError}>
                            <svg className="octicon octicon-x" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg>
                        </button>
                    </div>
                </div>
            )
        };

        if (UserUnique) {
            return (
                <div className="popup popup-error">
                    <div className="flash flash-full flash-error">
                        Username is not unique.
                        <button className="flash-close js-flash-close" type="button" aria-label="Dismiss this message" onClick={onError}>
                            <svg className="octicon octicon-x" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg>
                        </button>
                    </div>
                </div>
            )
        };

        return null
    }

};


