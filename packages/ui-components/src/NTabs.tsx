import React, { FC, ReactNode, useState, useEffect, useMemo, Children, useCallback, ReactElement } from 'react';
import { has, get } from 'lodash';
import clsx from 'clsx';

import { BareProps } from './types';
import './NTabs.scss';

type TabsType = 'button' | 'line' | 'card';
type TabsSize = 'large' | 'normal' | 'small';

interface PanelProps extends BareProps {
  tab: ReactNode;
  key: string | number;
}

export const Panel: FC<PanelProps> = ({ children }) => {
  return (
    <div>{children}</div>
  );
};

interface TabsProps extends BareProps {
  type?: TabsType;
  size?: TabsSize;
  className?: string;
  tabClassName?: string;
  defaultKey?: string | number;
  onChange?: (key: string | number) => void;
}

type TabsComponent = FC<TabsProps> & { Panel: FC<PanelProps> };
type PanelAttr = Pick<PanelProps, 'key' | 'tab'>;

const _NTabs: FC<TabsProps> = ({
  children,
  className,
  defaultKey,
  onChange,
  size,
  tabClassName,
  type
}) => {
  const [active, setActive] = useState<string | number>('');
  const rootClass = clsx('aca-tabs', `aca-tabs--${type}`, `aca-tabs--${size}`, className);
  const tabClassF = (active: boolean): string => clsx('aca-tabs__tab', tabClassName, { active: active });

  // extact panels config
  const panels = useMemo<PanelAttr[]>((): PanelAttr[] => {
    if (!children) return [];

    const result = Children.map(children, (child): PanelAttr | undefined => {
      if (has(child, 'props')) {
        return {
          key: (child as ReactElement<PanelProps>).key || '',
          tab: (child as ReactElement<PanelProps>).props.tab
        };
      }

      console.warn('Tabs children need an unique key');

      return undefined;
    });

    return result ? result.filter((item): boolean => !!item) : [];
  }, [children]);

  // get active panel component
  const activePanel = useMemo((): ReactNode => {
    let result: ReactNode = '';

    Children.forEach(children, (child): void => {
      if (get(child, 'key') === active) {
        result = child;
      }
    });

    return result;
  }, [active, children]);

  const handleTabClick = useCallback((active: string | number): void => {
    setActive(active);
    onChange && onChange(active);
  }, [setActive, onChange]);

  // set default panel when panels exists and activ isn't setted.
  useEffect(() => {
    if (panels.length > 1 && active === '') {
      const key = defaultKey || panels[0].key;

      setActive(key);
      onChange && onChange(key);
    }
  }, [active, defaultKey, panels, onChange]);

  return (
    <div className={rootClass}>
      <ul className='aca-tabs__tabs'>
        {
          panels.map((item: PanelAttr): ReactNode => (
            <li
              className={tabClassF(item.key === active)}
              key={`tabs-${item.key}`}
              onClick={(): void => handleTabClick(item.key)}
            >
              {item.tab}
            </li>
          ))
        }
      </ul>
      <div className='aca-tabs__content'>
        {activePanel}
      </div>
    </div>
  );
};

(_NTabs as any).Panel = Panel;

const NTabs = _NTabs as TabsComponent;

NTabs.Panel = Panel;

export { NTabs };
