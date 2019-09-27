/// <reference types="react-scripts" />

declare module 'react-shadow';

declare module 'style-it' {
  const Style: {
    it: (s: string, e: JSX.Element | React.ReactNode) => JSX.Element,
  };
  export default Style;
}

declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module '*.svg' {
  const content: any;
  export default content;
}