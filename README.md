# Create React Web Component [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Build%20Web%20Components%20using%20React&url=https://github.com/Silind/tslint-config-silind&hashtags=react,webcomponent,frontend)
![NPM Version](https://img.shields.io/npm/v/create-react-web-component.svg)
[![Github License](https://img.shields.io/github/license/Silind/create-react-web-component)](https://github.com/Silind-Software/create-react-web-component/blob/master/LICENSE)
![Build Status](https://github.com/Silind-Software/create-react-web-component/workflows/build/badge.svg)
![Code Coverage](https://img.shields.io/codecov/c/github/Silind-Software/create-react-web-component)

#### Set up a React App wrapped in a Web Component
> This setup is is based on [*react-scripts*](https://www.npmjs.com/package/react-scripts) from [*create-react-app*](https://create-react-app.dev/docs/getting-started)  
> A thorough description of the principles used in this setup, can be read [in this article](https://itnext.io/react-and-web-components-3e0fca98a593)

<p align="center">
<img src="https://silind-s3.s3.eu-west-2.amazonaws.com/create-react-web-component-demo/create-react-web-component-demo.gif" />
</p>

## Table of content

- [How it works](#how-it-works)
- [**Getting Started**](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Get Help](#get-help)

## How it works
Create React Web Component will boostrap a basic setup for creating a React App wrapped inside a Web Component. 

## Getting Started

### Install
Get started by running the command
```console
npx create-react-web-component
```
Or install the package globally

- yarn
  ```console
  yarn global add create-react-web-component
  ```

- npm
  ```console
  npm i -g create-react-web-component
  ```

This will bootstrap a new project for you.  
Now use the following commands:
```console
cd <project-folder>
yarn install
yarn start
```
Your project will start running on `localhost:3000` and your browser opens a new window  

<p align="center">
<img src="https://silind-s3.s3.eu-west-2.amazonaws.com/create-react-web-component-demo/create-react-web-component.png" />
</p>

### Properties and attributes
To make sure that properties and attributes of the Web Component is passed down to the React App as props, we need to register the properties and attributes.

To register properties and attributes for the Web Component, go to `src/componentProperties.ts`  

To register for properties, update the interface `IComponentProperties` and object `componentProperties` to reflect the types and properties that the Web Component will receive:  
```typescript
export interface IComponentProperties {
  todos: string[];
}

export const componentProperties: IComponentProperties = {
  todos: [
    'Go to src/componentProperties.ts...',
    'Register properties and attributes...',
    'Build awesome React Web Component!',
  ],
};
```

In the same way, use the interface `IComponentAttributes` and object `componentAttributes` to register attributes for the Web Component:  
```typescript
export interface IComponentAttributes {
  componentTitle: string;
}

export const componentAttributes: IComponentAttributes = {
  componentTitle: 'Awesome Component',
};
```
*NB: The type of an attribute is always a string*  

To understand the difference between properties and attributes,
please refer to this article:  
https://alligator.io/web-components/attributes-properties/

### Events
In order to dispatch events that can be listened to from the Web Component, use the `EventContext`.  
For example - if you want to dispatch a custom event 'my-event' that is triggered onClick, all you have to do is:  
```jsx
import React, { FC, useContext } from 'react';
import { EventContext } from 'create-react-web-component';

const App: FC = () => {
  const dispatch = useContext(EventContext);

  const handleClick = () => {
    const event = new Event('my-event');
    dispatch(event);
  }

  return (
    <div onClick={handleClick}>Click to dispatch 'my-event'</div>
  );

};
```

### Styles
In order to use styles in your components, use the `<Styled>` component, or the `withStyles()` HOC.  
First import your css-file like this:
```typescript
import styles from './App.css';
```

There are two cases in how to style a component: 
  
- A component where top-level is an html element, e.g. a `<div>` or a `<span>` etc.
- A component where top-level is another React Component, a fragment, a function call that returns a component, etc.

**In the first case**, we wrap the component in the `<Styled>` component, and pass down the imported style as props:  
```jsx
import React, { FC } from 'react';
import { Styled } from 'create-react-web-component';
import styles from './App.css';

const App: FC = () => {
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

**In the second case**, we use the the `withStyles()` HOC.

```jsx
import React, { FC } from 'react';
import { withStyles } from 'create-react-web-component';
import styles from './App.css';

const App: FC = () => {
  return (
    <>
      <CoolReactComponent />
      <AwesomeReactComponent />
    </>
  );
};

export default withStyles(styles)(App);
```

The main difference between the `<Styled>` component and the `withStyles()` HOC, is that the `<Styled>` component will inject all styles just below the html element that it wraps.  
  
The `withStyles()` will add an extra `<div>` element around the content that it wraps, and inject all styles into this.


## Usage
### Build
Build your component by running the command
```console
yarn build
```
or 
```console
npm run build
```

This will create a `/build` folder containing a file with the name of your component, e.g. `bundle.js`.  
In order to use your Web Component, simply import this file in a project, and use your Web Component as:
```html
<awesome-component componentTitle="Awesome Component">
</awesome-component>
```

### Static files
A Web Component is a self-contained native component that runs within a shadowed scope in the DOM.  
For the same reason, it is highly incovenient to bundle static files with the Web Component.  
In order to use images or graphic, there are two options:
- **Serve the images somewhere, and reference it in a url**: `<img src="https://some-cloud/some-image.png" />`
- **Use SVG**: You can import SVG-files into the component. React will render these as SVG Elements inside the React App instead of loading them at runtime.

### Serve
For development, you can serve the `bundle.js` file.  
Simply start the dev-server by using
```console
yarn start
```
or
```console
npm start
```
This will serve your file on `http://localhost:3000/bundle.js`

## Contributing

#### Issues
In the case of a bug report, bugfix or a suggestions, please feel very free to open an issue.

#### Pull request
Pull requests are always welcome, and I'll do my best to do reviews as fast as I can.

## License

This project is licensed under the [MIT License](https://github.com/Silind-Software/create-react-web-component/blob/master/LICENSE)

## Get Help
Read more about using Web Components with React on the [official React Docs](https://reactjs.org/docs/web-components.html)  

- Contact me on [Twitter](https://twitter.com/silindsoftware)
- If appropriate, [open an issue](https://github.com/Silind-Software/create-react-web-component/issues/new) on GitHub