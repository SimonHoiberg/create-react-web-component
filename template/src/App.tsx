import * as React from 'react';
import { IElementAttributes } from '.';
import Styled from './utils/Styled';
import * as styles from './App.css';

const App: React.FC<IElementAttributes> = (props) => {
  return (
    <Styled styles={styles}>
      <div className='app'>
        <div className='header-title'>%component-name-title%</div>
      </div>
    </Styled>
  );
};

export default App;
