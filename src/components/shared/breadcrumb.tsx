import Link from 'next/link';
import {ReactNode} from 'react';

type BreadcrumbProps = {
  className?: string;
  children?: ReactNode;
}

export const Breadcrumb = ({className, children}: BreadcrumbProps) => {
  return (
    <div
      className={`flex [&>*]:before:content-["/"] [&>*:first-child]:before:content-[""] [&>*]:before:text-gray-700 dark:[&>*]:before:text-gray-100 [&>*]:before:me-2 bg-gray-200 dark:bg-gray-700 rounded-md p-2 gap-2 ${className || ''}`}>
      {children}
    </div>
  );
};

type BreadcrumbItemProps = {
  href?: string;
  className?: string;
  children?: ReactNode;
}

export const BreadcrumbChild = ({href, className, children}: BreadcrumbItemProps) => {
  return (
    href
      ? <Link href={href} className={`text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 transition ${className || ''}`}>{children}</Link>
      : <div className={`text-gray-700 dark:text-gray-100 ${className || ''}`}>{children}</div>
  );
};