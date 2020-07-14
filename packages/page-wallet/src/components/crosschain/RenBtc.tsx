import React, { FC } from 'react';

import { Tabs, Card } from '@acala-dapp/ui-components';

const Alert: FC = () => {
  return (
    <div>

    </div>
  );
};

export const RenBtc: FC = () => {
  return (
    <Card padding={false} >
      <Tabs type='card'>
        <Tabs.Panel
          key='mint'
          tab='Mint'
        >
          <p>hello</p>
        </Tabs.Panel>
        <Tabs.Panel
          disabled
          key='release'
          tab='Release'
        >
          <p>hello</p>
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
};
