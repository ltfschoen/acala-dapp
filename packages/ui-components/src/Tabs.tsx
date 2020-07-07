import React, { FC, ReactNode, useState, useEffect, useMemo, Children, useCallback, ReactElement } from 'react';
import { has, get } from 'lodash';
import clsx from 'clsx';
import { Motion, spring, presets } from 'react-motion';

import { BareProps } from './types';
import './Tabs.scss';

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
  animation?: boolean;
}

type TabsComponent = FC<TabsProps> & { Panel: FC<PanelProps> };
type PanelAttr = Pick<PanelProps, 'key' | 'tab'>;

const _Tabs: FC<TabsProps> = ({
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
      if (has(child, 'key')) {
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

  const changeActive = useCallback((_active: string | number) => {
    setActive(_active);
    onChange && onChange(_active);
  }, [setActive, onChange]);

  const handleTabClick = useCallback((active: string | number): void => {
    changeActive(active);
  }, [changeActive]);

  // set default panel when panels exists and active isn't setted.
  useEffect(() => {
    if (panels.length > 1 && active === '') {
      const key = defaultKey || panels[0].key;

      changeActive(key);
    }
  }, [active, defaultKey, panels, changeActive]);

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
      <Motion
        defaultStyle={{ opacity: 0, top: 8 }}
        key={active}
        style={{ opacity: spring(1, presets.gentle), top: spring(0, presets.gentle) }}
      >
        {
          (interpolatedStyle): JSX.Element => (
            <div className='aca-tabs__content'
              style={{
                opacity: interpolatedStyle.opacity,
                transform: `translate3d(0, ${interpolatedStyle.top}px, 0)`
              }}
            >
              {activePanel}
            </div>
          )
        }
      </Motion>
    </div>
  );
};

(_Tabs as any).Panel = Panel;

const Tabs = _Tabs as TabsComponent;

Tabs.Panel = Panel;

export { Tabs };
