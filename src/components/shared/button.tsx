import Link from 'next/link';
import {MouseEventHandler, ReactNode} from 'react';

type Props = {
  type?: 'button' | 'submit' | 'reset';
  color?: Color;
  size?: Size,
  rounded?: RoundSize;
  href?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode
}

type Color = keyof typeof _colorClass;

const _colorClass = {
  // Filled
  'primary'  : 'bg-blue-500 hover:bg-blue-600 text-white',
  'secondary': 'bg-gray-500 hover:bg-gray-600 text-white',
  'danger'   : 'bg-red-500 hover:bg-red-600 text-white',
  'success'  : 'bg-green-500 hover:bg-green-600 text-white',
  'warning'  : 'bg-amber-500 hover:bg-amber-600 text-gray-900',
  'info'     : 'bg-sky-500 hover:bg-sky-600 text-white',

  // Outlined
  'primary-outlined'  : 'border-2 border-blue-500 hover:border-blue-600 text-blue-500 hover:text-blue-600',
  'secondary-outlined': 'border-2 border-gray-500 hover:border-gray-600 text-gray-500 hover:text-gray-600',
  'danger-outlined'   : 'border-2 border-red-500 hover:border-red-600 text-red-500 hover:text-red-600',
  'success-outlined'  : 'border-2 border-green-500 hover:border-green-600 text-green-500 hover:text-green-600',
  'warning-outlined'  : 'border-2 border-amber-500 hover:border-amber-600 text-amber-500 hover:text-amber-600',
  'info-outlined'     : 'border-2 border-sky-500 hover:border-sky-600 text-sky-500 hover:text-sky-600',
};

type Size = keyof typeof _sizeClass;

const _sizeClass = {
  'sm': 'text-sm px-1 py-[0.06rem]',
  'md': 'text-base px-2 py-0.5',
  'lg': 'text-lg px-3 py-1',
};

type RoundSize = keyof typeof _roundClass;

const _roundClass = {
  'none': '',
  'sm'  : 'rounded',
  'md'  : 'rounded-md',
  'lg'  : 'rounded-lg',
  'full': 'rounded-full',
};

export const Button = ({
                         type = 'button',
                         color = 'danger',
                         size = 'md',
                         rounded = 'md',
                         className = '',
                         href,
                         onClick,
                         children,
                       }: Props) => {
  return (
    <>
      {href
        ? <Link href={href}
                className={`${_colorClass[color]} font-bold ${_roundClass[rounded]} ${_sizeClass[size]} transition ${className}`}
        >{children}</Link>
        : <button
          type={type}
          className={`${_colorClass[color]} font-bold ${_roundClass[rounded]} ${_sizeClass[size]} transition ${className}`}
          onClick={onClick}
        >{children}</button>
      }
    </>
  );
};