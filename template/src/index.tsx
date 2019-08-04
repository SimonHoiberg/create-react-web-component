import * as React from 'react';
import * as ReactDOM from 'react-dom';
import root from 'react-shadow';
import { EventProvider } from './utils/EventContext';
import App from './App';

/**
 * The Web Component will be wrapping the React App, and will be defined as a Custom Element.
 *
 * Update the interface 'IElementAttributes' below, to match the attributes the Web Component
 * is expected to take.
 * Example:
 *    {
 *      title: string;
 *      customAttribute: string;
 *    }
 *
 * Update the object 'elementAttributes' below, to register the attributes the Web Component
 * is expected to take.
 * Example:
 *    {
 *      title: 'title',
 *      customAttribute: 'custom-attribute'
 *    }
 */

export interface IElementAttributes {

}

const elementAttributes: IElementAttributes = {
  
};

class %component-name-pascal% extends HTMLElement {
  private elementAttributes(): IElementAttributes {
    const attributes = {} as IElementAttributes;

    Object.entries(elementAttributes).forEach(([key, value]: [string, string]) => {
      attributes[key] = this.getAttribute(value);
    });

    return attributes;
  }

  public static get observedAttributes() {
    return Object.values(elementAttributes);
  }

  public connectedCallback() {
    this.mountReactApp();
  }

  public attributeChangedCallback() {
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
            <App {...this.elementAttributes()} />
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

customElements.define('%component-name-snake%', %component-name-pascal%);
