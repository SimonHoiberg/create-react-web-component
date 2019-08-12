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

/**
 * Caution! You should not edit this file.
 * To register component properties, open the file 'componentProperties.ts'
 *
 * Editing this file might cause unintented behavior.
 */

class %component-name-pascal% extends HTMLElement {
  public static get observedAttributes() {
    return Object.keys(componentAttributes);
  }

  private reactProps(): IComponentAttributes & IComponentProperties {
    const attributes = {} as IComponentAttributes;

    Object.keys(componentAttributes).forEach((key: string) => {
      attributes[key] = this.getAttribute(key) || componentAttributes[key];
    });

    return { ...attributes, ...properties };
  }

  public connectedCallback() {
    this.mountReactApp();
  }

  public attributechangedcallback(name: string, oldValue: string, newValue: string) {
    this.mountReactApp();
  }

  public reactPropsChangedCallback(name: string, oldValue: any, newValue: any) {
    this.mountReactApp();
  }

  public disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this);
  }

  private mountReactApp() {
    ReactDOM.render(
      (
        <root.div>
          <EventProvider value={this.eventDispatcher}>
            <App {...this.reactProps()} />
          </EventProvider>
        </root.div>
      ),
      this,
    );
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
      return properties[key];
    },
    set(newValue) {
      const oldValue = properties[key];
      properties[key] = newValue;
      this.reactPropsChangedCallback(key, oldValue, newValue);
    },
  };

  propertyMap[key] = property;
});

Object.defineProperties(%component-name-pascal%.prototype, propertyMap);
customElements.define('%component-name-snake%', %component-name-pascal%);
