import Link from 'next/link';

type  Props = {
  t: any
}

export const MainNavigation = ({t}: Props) => {
  return (
    <div className='flex justify-between bg-gray-200 text-gray-700'>
      <div className='flex'>
        <Link href={'/'} className='block hover:bg-gray-100 py-2 px-4'>{t('conf.app-name')}</Link>
      </div>
      <div className='flex'>
        <Link href={'/login'} className='block hover:bg-gray-100 border-r border-gray-300 py-2 px-4'>{t('labels.login')}</Link>
        <Link href={'/register'} className='block hover:bg-gray-100  py-2 px-4'>{t('labels.register')}</Link>
      </div>
    </div>
  );
};