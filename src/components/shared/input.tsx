import React, {FocusEventHandler, useEffect, useRef, useState} from 'react';
import {Eye, EyeSlash, InfoCircle} from 'react-bootstrap-icons';
import {GetDirectionByFirstLetter} from '@/lib/helpers/string';
import {Button} from '@/components/shared/button';

type Props = {
  id: string;
  type: Type;
  name: string;
  label: string;
  desc: string;
  size: LabelSize
  bgColor: string;
  className: string;
  labelClassName: string;
  dir: string;
  value?: string;
  defaultValue?: string
  disabled: boolean;
  checked?: boolean;
  required?: boolean,
  error: object;
  onFocus: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

type Type = keyof typeof _defClass;

const _inputTextNumberEmailPasswordDefClass = `block w-full rounded-md dark:text-white border-0 focus:[box-shadow:unset]`;
const _inputRadioCheckboxDefClass = 'cursor-pointer rounded border-gray-300 text-green-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 -mt-1';
const _defClass = {
  'checkbox': _inputRadioCheckboxDefClass,
  'radio'   : _inputRadioCheckboxDefClass,
  'textarea': _inputTextNumberEmailPasswordDefClass,
  'text'    : _inputTextNumberEmailPasswordDefClass,
  'number'  : _inputTextNumberEmailPasswordDefClass,
  'email'   : _inputTextNumberEmailPasswordDefClass,
  'password': _inputTextNumberEmailPasswordDefClass,
  'file'    : _inputTextNumberEmailPasswordDefClass,
};

type LabelSize = keyof typeof _labelSizeClass;

const _labelSizeClass = {
  sm: 'text-sm',
  md: '',
};

const _labelBlurPositionClass = {
  sm: '[transform:translate(-2px,8px)]',
  md: '[transform:translate(-5px,10px)]',
};

const _labelFocusPositionClass = {
  sm: '[transform:translate(-2px,-18px)_scale(0.8)]',
  md: '[transform:translate(-5px,-22px)_scale(0.8)]',
};

const inputSizeClass = {
  sm: 'text-[16px] py-1 px-2',
  md: 'py-2 px-3',
};

export const Input = ({
                        id,
                        type,
                        name,
                        label,
                        desc,
                        size = 'md',
                        bgColor = 'bg-gray-100 dark:bg-gray-900',
                        className = '',
                        labelClassName = '',
                        dir,
                        value,
                        defaultValue,
                        disabled = false,
                        required = false,
                        checked,
                        error,
                        onFocus,
                        onBlur,
                        ...props
                      }: Props) => {

  const [focus, setFocus] = useState(false);
  const [direction, setDirection] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFocus(true);

    if (onFocus)
      onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFocus(false);

    if (onBlur)
      onBlur(e);
  };

  const handleInputNumberWheel = (e: WheelEvent) => e.preventDefault();

  const isLabelVisible = () => (focus || value?.length || defaultValue?.length || inputRef.current?.value);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  useEffect(() => {
    // Add event listener for input[type='number']
    // Note: React considers 'onWheel' as a PASSIVE event
    // That's why we add event listener like so
    if (inputRef.current && type === 'number') {
      if (focus) {
        inputRef.current.addEventListener('wheel', handleInputNumberWheel);
      } else {
        inputRef.current?.removeEventListener('wheel', handleInputNumberWheel);
      }
    }
  }, [type, focus]);

  useEffect(() => {
    setDirection(dir ? `[direction:${dir}]` : GetDirectionByFirstLetter(value || defaultValue));

  }, [defaultValue, dir, value]);

  return (
    <>
      {label ?
        <>
          {['radio', 'checkbox'].includes(type) ?
            <>
              <label htmlFor={id} className={`${_labelSizeClass[size]} inline-flex items-center cursor-pointer ${labelClassName}`}>
                <input
                  id={id}
                  type={type}
                  name={name}
                  className={`${_defClass[type]} ${className}`}
                  checked={checked}
                />
                <span className={`text-gray-600 dark:text-white ${GetDirectionByFirstLetter(label)} mx-2`}>{label}</span>
              </label>

              {desc &&
                <div className='mt-1'>
                  <InfoCircle className='inline-block text-cyan-600 me-2'/>
                  <small className='text-gray-600 dark:text-gray-400'>{desc}</small>
                </div>
              }
            </> :
            <div className='relative mt-2 mb-4'>
              <label htmlFor={id} tabIndex={-1}
                     onClick={() => setFocus(true)}
                     className={`absolute px-2 transition cursor-text [transform-origin:right_center] z-10 ${_labelSizeClass[size]} ${isLabelVisible() ? `dark:text-gray-100 ${_labelFocusPositionClass[size]}` : `dark:text-gray-500 ${_labelBlurPositionClass[size]}`} ${labelClassName}`}>
                {label}

                {required &&
                  <span className='text-red-500 ps-2'>*</span>
                }
              </label>
              <>
                {type === 'textarea' ?
                  <textarea id={id}
                            disabled={disabled}
                            ref={textareaRef}
                            className={`${bgColor} ${_defClass[type]} ${className}`}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required={required}
                            {...props}
                  /> :
                  <>
                    <input id={id}
                           disabled={disabled}
                           type={type}
                           ref={inputRef}
                           className={`${bgColor} ${_defClass[type]} ${inputSizeClass[size]} ${direction} ${className}`}
                           onFocus={handleFocus}
                           onBlur={handleBlur}
                           required={required}
                           {...props}
                    />
                    {type === 'password' &&
                      <>
                        {showPassword &&
                          <div onClick={() => setShowPassword(false)}
                               className={`absolute -bottom-12 start-0 end-0 min-h-[42px] text-gray-700 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md ${direction} p-2`}>{inputRef.current?.value}</div>
                        }
                        <Button size='sm'
                                color='secondary-outlined'
                                className={`absolute top-[0.55rem] ${direction && isLabelVisible() ? 'start-2' : 'end-2'}`}
                                onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeSlash size={16}/> : <Eye size={16}/>}
                        </Button>
                      </>
                    }
                  </>
                }

                {desc &&
                  <div className='mt-1'>
                    <InfoCircle className='inline-block text-cyan-600 me-2'/>
                    <small className='text-gray-600 dark:text-gray-400'>{desc}</small>
                  </div>
                }

                {error && error}
              </>
            </div>
          }
        </> :
        <input id={id} disabled={disabled} type={type}
               className={`${_defClass[type]} ${className}`}
               {...props}
        />
      }
    </>
  );
};
