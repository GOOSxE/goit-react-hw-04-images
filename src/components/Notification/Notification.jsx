import React from 'react';
import propTypes from 'prop-types';
// ? // Компонент нотифікацій якщо відгуків ще немає ;
const Notification = ({ children }) => <h4>{children}</h4>;
Notification.propTypes = {
  message: propTypes.string.isRequired,
};
export default Notification;
