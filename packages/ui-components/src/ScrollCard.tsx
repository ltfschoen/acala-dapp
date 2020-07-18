import React, { FC, useMemo, Children, useRef, cloneElement, ReactElement, useState, ReactNode, useEffect, useCallback } from 'react';
import clsx from 'clsx';

import { Card, CardProps } from './Card';
import { BareProps } from './types';
import { Controller } from './Controller';
import './ScrollCard.scss';

export interface ScrollCardItemProps extends BareProps {
  key: string | number;
  instance: ReactElement;
}

const Item: FC<ScrollCardItemProps> = ({
  className,
  instance
}) => {
  return cloneElement(instance, { className: clsx('aca-scroll-card__item', className) });
};

interface ScrollCardProps extends CardProps {
  pageSize?: number;
  itemClassName?: string;
  children: ReactNode;
}

export const _ScrollCard: FC<ScrollCardProps> = ({ children, itemClassName, pageSize = 5, ...other }) => {
  const $rootRef = useRef<HTMLDivElement>(null);
  const [maxPage, setMaxPage] = useState<number>(0);
  const currentPageRef = useRef<number>(0);
  const [page, setPage] = useState<number>(0);

  const content = useMemo(() => {
    return Children.map(children as ReactElement[], (item: ReactElement) => {
      return cloneElement(item, {
        className: itemClassName,
        key: item.props.key
      });
    });
  }, [children, itemClassName]);

  const move = useCallback((page: number): void => {
    if (!$rootRef.current) return;

    const $root = $rootRef.current;
    /* eslint-disable-next-line */
    const $container = $rootRef.current.querySelector('.aca-scroll-card__content')!;

    setPage(page);
    $container.scrollTo({ left: $root.clientWidth * page });
  }, [$rootRef]);

  const handlePrev = useCallback(() => {
    if (currentPageRef.current <= 0) {
      return;
    }

    currentPageRef.current -= 1;
    move(currentPageRef.current);
  }, [move]);

  const handleNext = useCallback(() => {
    if (currentPageRef.current >= maxPage) {
      return;
    }

    currentPageRef.current += 1;
    move(currentPageRef.current);
  }, [maxPage, move]);

  useEffect(() => {
    if (!$rootRef.current) return;

    const $root = $rootRef.current;
    const $items = $root.querySelectorAll('.aca-scroll-card__item');

    const _itemWidth = `${100 / pageSize}%`;

    // set items width;
    $items.forEach((item) => {
      (item as HTMLDivElement).style.width = _itemWidth;
      (item as HTMLDivElement).style.flex = `0 0 ${_itemWidth}`;
    });

    // set max page size
    setMaxPage(Math.floor($items.length / pageSize));
  }, [$rootRef, setMaxPage, pageSize]);

  return (
    <Card
      {...other}
      className={clsx('aca-scroll-card__root', other.className)}
      contentClassName={clsx('aca-scroll-card__content', other.contentClassName)}
      header={
        (
          <>
            {other.header}
            <Controller.Group>
              <Controller
                direction='left'
                disabled={page === 0}
                onClick={handlePrev}
              />
              <Controller
                direction='right'
                disabled={page === maxPage}
                onClick={handleNext}
              />
            </Controller.Group>
          </>
        )
      }
      headerClassName='aca-scroll-card__header'
      ref={$rootRef}
    >
      {content}
    </Card>
  );
};

type ScrollCardType = FC<ScrollCardProps> & { Item: typeof Item };

const ScrollCard = _ScrollCard as ScrollCardType;

ScrollCard.Item = Item;

export { ScrollCard };
