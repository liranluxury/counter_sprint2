import {ButtonHTMLAttributes, ReactNode, MouseEventHandler} from 'react';
import s from './Button.module.css'


type ButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>
    isDisabled?: boolean
    children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>;
export const Button = ({onClick, isDisabled, children, className, ...rest}: ButtonProps) => {
    const btnClassName = `${s.btn} ${className}`
    return (
        <button onClick={onClick} disabled={isDisabled} className={btnClassName} {...rest}>{children}</button>
    );
};