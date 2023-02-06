import {MainNavigation} from '../navigations/main-navigation';
import {ReactNode} from 'react';

type Props = {
  t: any;
  className?: string;
  children?: ReactNode
}

export const MainLayout = ({t, className, children}: Props) => {
  return (
    <>
      <MainNavigation t={t}/>

      <main className={className}>{children}</main>
    </>
  );
};