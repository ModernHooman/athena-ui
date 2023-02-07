import {MainLayout} from '@/components/general/layouts/main-layout';
import {Breadcrumb, BreadcrumbChild} from '@/components/shared/breadcrumb';
import {StaticProps} from '@/types/static-props';
import {pick} from 'lodash';
import {useTranslations} from 'use-intl';

const _intlNamespaces = ['shared', 'general'];

const Index = () => {
  const sharedT = useTranslations('shared');
  const t = useTranslations('general');

  return (
    <MainLayout t={sharedT}>
      <Breadcrumb className='mt-4'>
        <BreadcrumbChild href='/'>{sharedT('conf.app-name')}</BreadcrumbChild>
        <BreadcrumbChild>{t('labels.components')}</BreadcrumbChild>
      </Breadcrumb>
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
export default Index;