import * as React from 'react';
import Style from 'style-it';

interface IStyled {
  styles: typeof import('*.css');
  children: React.ReactNode | React.ReactNode[];
}

const Styled: React.FC<IStyled> = (props): JSX.Element => {
  return Style.it(props.styles.toString(), <div>{props.children}</div>);
};

const withStyles = (styles: typeof import('*.css')) => <P, S>(Component: React.ComponentClass<P, S> | React.FC<P>) => {
  return class extends React.Component<P, S> {
    public render() {
      return <Styled styles={styles}><Component {...this.props as P}/></Styled>;
    }
  };
};

export default Styled;
export { withStyles };
