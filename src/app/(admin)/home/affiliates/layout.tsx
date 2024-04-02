import React, { ReactNode } from 'react';
import PageName from '@/components/ui/commons/PageName';
import AdminAffilatesTabs from './ui/AdminAffilatesTabs';

const SettingRoot = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <PageName
        name={'Panel de Afiliados'}
        breadcrumbs={[
          {
            name: 'Escritorio',
            href: '/home',
          },
          {
            name: 'Afiliados',
            href: '/home/affiliates',
          },
        ]}
      />
      <AdminAffilatesTabs />
      <div>{children}</div>
    </div>
  );
};

export default SettingRoot;