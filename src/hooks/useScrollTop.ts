/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useResolvedPath } from 'react-router-dom';

export const useScrollTop = (value: any, offsetX: number = 0, offsetY: number = 0) => {
  const { pathname } = useResolvedPath('/');

  React.useEffect(() => {
    window.scrollTo(offsetX, offsetY);
  }, [pathname, [...value]]);
};