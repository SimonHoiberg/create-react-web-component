/*!
 * Caution! You should not edit this file.
 *
 * Running 'create-react-web-component --update' will replace this file.
 */

import React, { FC, Component, ReactNode, ComponentClass, CSSProperties } from 'react';
import Style from 'style-it';

interface IStyled {
  styles: CSSProperties;
  children: ReactNode | ReactNode[];
}

const Styled: FC<IStyled> = (props): JSX.Element => {
  return Style.it(props.styles.toString(), props.children);
};

const withStyles = (styles: CSSProperties) => <P, S>(WrappedComponent: ComponentClass<P, S> | FC<P>) => {
  return class extends Component<P, S> {
    public render() {
      return (
        <Styled styles={styles}>
          <WrappedComponent {...this.props as P} />
        </Styled>
      );
    }
  };
};

export default Styled;
export { withStyles };
