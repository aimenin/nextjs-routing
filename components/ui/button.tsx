import { FC } from 'react';
import Link, { LinkProps } from 'next/link';

import classes from './button.module.css';

interface ButtonProps extends LinkProps {
  children: JSX.Element[] | JSX.Element | string;
}

const Button: FC<ButtonProps> = ({ children, ...restProps }) => {
  return (
    <Link {...restProps} className={classes.btn}>
      {children}
    </Link>
  );
};

export default Button;
