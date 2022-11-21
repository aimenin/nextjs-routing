import { FC, MouseEventHandler } from 'react';
import Link, { LinkProps } from 'next/link';

import classes from './button.module.css';

interface ButtonProps extends LinkProps {
  children: JSX.Element[] | JSX.Element | string;
  link?: boolean;
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({
  children,
  link,
  onButtonClick,
  ...restProps
}) => {
  if (link) {
    return (
      <Link {...restProps} className={classes.btn}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={onButtonClick}>
      {children}
    </button>
  );
};

export default Button;
