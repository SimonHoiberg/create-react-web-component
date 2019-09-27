/*!
 * Caution! You should not edit this file.
 *
 * Running 'create-react-web-component --update' will replace this file.
 */

import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import root from 'react-shadow';
import { EventProvider } from './utils/EventContext';
import {
  IComponentProperties,
  IComponentAttributes,
  componentProperties,
  componentAttributes,
} from './componentProperties';
import App from './App';

class %component-name-pascal% extends HTMLElement {
  public static get observedAttributes() {
    return Object.keys(componentAttributes);
  }

  private reactProps(): ICustomProperties {
    const attributes = {} as IComponentAttributes;

    Object.keys(componentAttributes).forEach((key: string) => {
      (attributes as any)[key] = this.getAttribute(key) || (componentAttributes as any)[key];
    });

    return { ...attributes, ...properties };
  }

  public connectedCallback() {
    this.mountReactApp();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) {
      return;
    }

    this.mountReactApp();
  }

  public reactPropsChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue === newValue) {
      return;
    }

    this.mountReactApp();
  }

  public disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this);
  }

  private mountReactApp() {
    ReactDOM.render(
      <root.div>
        <EventProvider value={this.eventDispatcher}>
          <App {...this.reactProps()} />
        </EventProvider>
      </root.div>,
      this,
    );
  }

  private eventDispatcher = (event: Event) => {
    this.dispatchEvent(event);
  };
}

const properties = { ...componentProperties } as IComponentProperties;
const propertyMap = {} as PropertyDescriptorMap;

Object.keys(componentProperties).forEach((key: string) => {
  const property: PropertyDescriptor = {
    configurable: true,
    enumerable: true,
    get() {
      return (properties as any)[key];
    },
    set(newValue) {
      const oldValue = (properties as any)[key];
      (properties as any)[key] = newValue;
      (this as any).reactPropsChangedCallback(key, oldValue, newValue);
    },
  };

  propertyMap[key] = property;
});

Object.defineProperties(%component-name-pascal%.prototype, propertyMap);
customElements.define('%component-name-snake%', %component-name-pascal%);

export default interface ICustomProperties extends IComponentAttributes, IComponentProperties {}
