import { FC } from 'react';
import classes from './error-alert.module.css';

interface ErrorAlertProps {
  children: JSX.Element | JSX.Element[] | string;
}

const ErrorAlert: FC<ErrorAlertProps> = ({ children }) => {
  return <div className={classes.alert}>{children}</div>;
};

export default ErrorAlert;
