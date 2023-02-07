import Link from 'next/link';
import {MoonStars, Sun} from 'react-bootstrap-icons';
import {useEffect, useMemo, useState} from 'react';

type  Props = {
  t: any
}

export const MainNavigation = ({t}: Props) => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    if (darkMode !== null)
      if (darkMode) {
        document.body.className = 'dark';
        window.localStorage.setItem('theme', 'dark');
      } else {
        document.body.className = 'light';
        window.localStorage.setItem('theme', 'light');
      }
  }, [darkMode]);

  useEffect(() => {
    setDarkMode(window.localStorage.getItem('theme') === 'dark');
  }, []);

  return (
    <div className='flex justify-between bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-100'>
      <div className='flex'>
        <Link href={'/'} className='block hover:bg-gray-100 dark:hover:bg-gray-700 py-2 px-4'>{t('conf.app-name')}</Link>
      </div>
      <div className='flex [&>*]:block [&>*:hover]:bg-gray-100 dark:[&>*:hover]:bg-gray-700 [&>*]:border-e [&>*:last-child]:border-0 [&>*]:border-gray-300 dark:[&>*]:border-gray-700 [&>*]:transition [&>*]:py-2 [&>*]:px-4'>
        <div className='cursor-pointer' onClick={() => setDarkMode(!darkMode)}>
          {darkMode
            ? <Sun className='inline align-middle'/>
            : <MoonStars className='inline align-middle'/>
          }
        </div>
        <Link href={'/login'}>{t('labels.login')}</Link>
        <Link href={'/register'}>{t('labels.register')}</Link>
      </div>
    </div>
  );
};