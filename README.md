# Create React Web Component
![NPM Version](https://img.shields.io/npm/v/create-react-web-component.svg)
[![Github License](https://img.shields.io/github/license/Silind/create-react-web-component)](https://github.com/Silind/create-react-web-component/blob/master/LICENSE)
[![Build Status](https://api.travis-ci.com/Silind/create-react-web-component.svg?branch=master)](https://travis-ci.com/Silind/create-react-web-component)
![Code Coverage](https://img.shields.io/codecov/c/github/Silind/create-react-web-component)

#### Set up a React App wrapped in a Web Component
> This setup will be using TypeScript

## Table of content

- [How it works](#how-it-works)
- [**Getting Started**](#getting-started)
- [Contributing](#contributing)
- [License](#license)
- [Get Help](#get-help)

## How it works
Create React Web Component will boostrap a basic setup for creating a React App wrapped inside a Web Component. 

## Getting Started

### Setup
Get started by running the command
```console
npx create-react-web-component
```

#### Attributes
To register attributes for the Web Component, go to `src/index.tsx`  
Update the interface `IElementAttributes` to match the attributes the Web Component is expected to take.  
Example:
```TypeScript
export interface IElementAttributes {
  title: string;
  color: string;
}
```
  
Then update the object 'elementAttributes' to register the attributes the Web Component is expected to take.  
Example:  
```TypeScript
const elementAttributes: IElementAttributes = {
  title: 'title',
  color: 'color',
};
```

#### Events
In order to dispatch events that can be listened to from the Web Component, use the `EventContext`.  
For example - if you want to dispatch a custom event 'my-event' that is triggered onClick, all you have to do is:  
```JSX
import * as React from 'react';
import EventContext from './utils/EventContext';

const App: React.FC = () => {
  const dispatch = React.useContext(EventContext);

  const handleClick = () => {
    const event = new Event('my-event');
    dispatch(event);
  }

  return (
    <div onClick={handleClick}>Click to dispatch 'my-event'</div>
  );

};
```

#### Styles
In order to use styles in your components, use the `<Styled>` component, or the `withStyles()` HOC.  
First import your css-file like this:
```TypeScript
import * as styles from './App.css';
```

Then wrap the component in the `<Styled>` component, and pass down the imported style as props:  
```JSX
import * as React from 'react';
import Styled from './utils/Styled';
import * as styles from './App.css';

const App: React.FC = () => {
  return (
    <Styled styles={styles}>
      <div className='app'>
        <div className='header-title'>My React Web Component</div>
      </div>
    </Styled>
  );
};

export default App;
```
Any children of the `<Styled>` component can now reference the styles.
  
Alternatively, use the `withStyles()` HOC:  
```JSX
import * as React from 'react';
import { withStyles } from './utils/Styled';
import * as styles from './App.css';

const App: React.FC = () => {
  return (
    <div className='app'>
      <div className='header-title'>My React Web Component</div>
    </div>
  );
};

export default withStyles(styles)(App);
```
This will have the exactly same effect, so it's simply a matter of preference.

### Build
Build you component by running the command
```console
yarn run build
```
or 
```console
npm run build
```

This will create a dist-folder containing a `main.js` file.  
In order to use your Web Component, simply import this file in a project, and use your Web Component as:
```html
<my-react-web-component 
  title="Cool Component" 
  color="red"
>
</my-react-web-component>
```

### Serve
For development, you can serve the `main.js` file using the command:
```console
yarn run serve
```
or
```console
npm run serve
```
This will serve your file on `http://localhost:5000/main.js`

## Contributing

#### Issues
In the case of a bug report, bugfix or a suggestions, please feel very free to open an issue.

#### Pull request
Pull requests are always welcome, and I'll do my best to do reviews as fast as I can.

## License

This project is licensed under the [MIT License](https://github.com/Silind/create-react-web-component/blob/master/LICENSE)

## Get Help
Read more about using Web Components with React on the [official React Docs](https://reactjs.org/docs/web-components.html)  

- Contact me on [Twitter](https://twitter.com/silindsoftware)
- If appropriate, [open an issue](https://github.com/Silind/create-react-web-component/issues/new) on GitHub