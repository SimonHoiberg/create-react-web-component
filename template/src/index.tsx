import * as React from 'react';
import * as ReactDOM from 'react-dom';
import root from 'react-shadow';
import { EventProvider } from './utils/EventContext';
import App from './App';

export interface IElementAttributes {}

/**
 * The Web Component will be wrapping the React App, and will be defined as a Custom Element.
 *
 * Update the interface 'IElementAttributes' above, to match the attributes the Web Component
 * is expected to take.
 * Example:
 *    {
 *      title: string;
 *    }
 *
 * Update the object 'elementAttributes' below, to register the attributes the Web Component
 * is expected to take.
 * Example:
 *    {
 *      title: this.getAttribute('title),
 *    }
 */
class %component-name-pascal% extends HTMLElement {
  private elementAttributes: IElementAttributes = {};

  public connectedCallback() {
    ReactDOM.render(
      (
        <root.div>
          <EventProvider value={this.eventDispatcher}>
            <App {...this.elementAttributes} />
          </EventProvider>
        </root.div>
      ),
      this,
    );
  }

  public disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this);
  }

  private eventDispatcher = (event: Event) => {
    this.dispatchEvent(event);
  }
}

customElements.define('%component-name-snake%', %component-name-pascal%);
