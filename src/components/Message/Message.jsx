import React from 'react';
import './Message.css';
import {FaExclamationTriangle} from "react-icons/fa"; // Import your CSS file for styling

export const ErrorMessage = ({ error }) => {
    return (
        <div className="message error-message">
            <FaExclamationTriangle className="msg-icon" />
            <p>{error}</p>
        </div>
    );
};

export const CautionMessage = ({ caution }) => {
    return (
        <div className="message caution-message">
            <FaExclamationTriangle className="msg-icon" />
            <p>{caution}</p>
        </div>
    );
};
