import {MainLayout} from '@/components/general/layouts/main-layout';
import {StaticProps} from '@/types/static-props';
import {pick} from 'lodash';
import {useTranslations} from 'use-intl';

const _intlNamespaces = ['shared', 'general'];

const Login = () => {
  const sharedT = useTranslations('shared');
  const t = useTranslations('general');

  return (
    <MainLayout t={sharedT}>
      <Breadcrumb items={[
        {
          text: t('app-name'),
          as  : 'link',
          href: '/',
        },
        {
          text: t('components'),
          as  : 'link',
          href: '/',
        },
      ]}/>
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
export default Login;