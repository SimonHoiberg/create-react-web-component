declare module '*.css' {
  const content: any;
  export default content;
}

declare module 'style-it' {
  const Style: {
    it: (s: string, e: JSX.Element) => JSX.Element,
  };
  export default Style;
}