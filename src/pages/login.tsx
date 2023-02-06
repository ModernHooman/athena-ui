import {MainLayout} from '@/components/general/layouts/main-layout';
import {StaticProps} from '@/types/static-props';
import {pick} from 'lodash';
import {useTranslations} from 'use-intl';

const _intlNamespaces = ['shared', 'general'];

const Login = () => {
  const t = useTranslations('shared');

  return (
    <MainLayout t={t}>
      Login Page
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