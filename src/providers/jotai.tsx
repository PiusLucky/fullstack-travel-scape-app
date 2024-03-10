'use client'

import { Provider } from 'jotai';
import { ReactElement, ReactNode } from 'react';

export default function JotaiProviders({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return <Provider>{children}</Provider>;
}
