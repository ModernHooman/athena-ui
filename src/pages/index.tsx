import Head from 'next/head';
import {Inter} from '@next/font/google';
import {pick} from 'lodash';
import {StaticProps} from '@/types/static-props';
import {useTranslations} from 'use-intl';
import Link from 'next/link';
import {MainLayout} from '@/components/general/layouts/main-layout';
import {Button} from '@/components/shared/button';

const _inter = Inter({subsets: ['latin']});
const _intlNamespaces = ['shared', 'general'];

const Home = () => {
  const t = useTranslations('shared');

  return (
    <MainLayout t={t}>
      <div className='mt-4'>
        <Button size='sm' color='danger' className='me-2'>SM</Button>
        <Button size='md' color='primary' className='me-2'>MD</Button>
        <Button size='lg' color='success' className='me-2'>LG</Button>
        <Button size='lg' color='warning' rounded='none' className='me-2'>LG</Button>
        <Button size='lg' color='info' rounded='sm' className='me-2'>LG</Button>
        <Button size='lg' color='info' rounded='md' className='me-2'>LG</Button>
        <Button size='lg' color='info' rounded='lg' className='me-2'>LG</Button>
        <Button size='lg' color='info' rounded='full' className='me-2'>LG</Button>
      </div>
      <div className='mt-4'>
        <Button size='sm' color='danger-outlined' className='me-2'>SM</Button>
        <Button size='md' color='primary-outlined' className='me-2'>MD</Button>
        <Button size='lg' color='success-outlined' className='me-2'>LG</Button>
        <Button type='button'
                size='lg'
                color='info-outlined'
                rounded='full'
                className='me-2'
                onClick={() => alert('Clicked')}>LG</Button>

        <Button href='/login' color='info-outlined' className='me-2'>Link</Button>
      </div>
    </MainLayout>
  );
};

// noinspection JSUnusedGlobalSymbols
export const getStaticProps = async ({locale}: StaticProps) => {
  return {
    props: {
      messages: pick((await import(`/src/messages/${locale}.json`)).default, _intlNamespaces),
    },
  };
};

// noinspection JSUnusedGlobalSymbols
export default Home;