import { type FC, type PropsWithChildren } from 'react';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default Layout;
