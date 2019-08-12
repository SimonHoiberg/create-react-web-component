import * as React from 'react';
import Styled from './utils/Styled';
import * as styles from './App.css';
import { IComponentProperties, IComponentAttributes } from './componentProperties';

const App: React.FC<IComponentProperties & IComponentAttributes> = (props) => {
  const todos = props.todos.map((todo: string) => (
    <li key={todo} className='todo-title'>{todo}</li>
  ));

  return (
    <Styled styles={styles}>
      <div className='app'>
        <div className='header-title'>{props.componentTitle}</div>
        <div className='sub-title'>To get started:</div>
        <div className='todo-list'>
          <ul>
            {todos}
          </ul>
        </div>
      </div>
    </Styled>
  );
};

export default App;
