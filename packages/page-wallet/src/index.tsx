import React, { FC } from 'react';

import { Page, Tabs } from '@acala-dapp/ui-components';
import { AcalaConsole } from './components/AcalaConsole';
import { CrossChainConsole } from './components/CrossChainConsole';

const PageWallet: FC = () => {
  return (
    <Page>
      <Page.Title title='Wallet' />
      <Page.Content>
        <Tabs
          defaultKey='acala'
          type='button'
        >
          <Tabs.Panel
            key='acala'
            tab='Acala'
          >
            <AcalaConsole />
          </Tabs.Panel>
          <Tabs.Panel
            disabled
            key='cross-chain'
            tab='Cross-chain'
          >
            <CrossChainConsole />
          </Tabs.Panel>
        </Tabs>
      </Page.Content>
    </Page>
  );
};

export default PageWallet;
