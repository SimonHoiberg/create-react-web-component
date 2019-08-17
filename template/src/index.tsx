import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import retargetEvents from 'react-shadow-dom-retarget-events';
import { EventProvider } from './utils/EventContext';
import {
  IComponentProperties,
  IComponentAttributes,
  componentProperties,
  componentAttributes,
} from './componentProperties';
import App from './App';

/**
 * Caution! You should not edit this file.
 * To register properties and attributes, open the file 'componentProperties.ts'
 *
 * Editing this file might cause unwanted behavior.
 */

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
    const mountPoint = document.createElement('div');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    ReactDOM.render(
      (
        <EventProvider value={this.eventDispatcher}>
          <App {...this.reactProps()} />
        </EventProvider>
      ),
      mountPoint,
    );

    retargetEvents(this);
  }

  private eventDispatcher = (event: Event) => {
    this.dispatchEvent(event);
  }
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
