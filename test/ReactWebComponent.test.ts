import { ReactWebComponent } from '../src/index';

describe('Throw appropriate errors', () => {
  it('should throw error on attributes not set', () => {
    const render = () => {
      ReactWebComponent.render({} as any, '');
    }

    expect(render).toThrowError('Cannot define custom element: Attributes have not been set.');
  });

  it('should throw error on properties not set', () => {
    ReactWebComponent.setAttributes({} as any);

    const render = () => {
      ReactWebComponent.render({} as any, '');
    }

    expect(render).toThrowError('Cannot define custom element: Properties have not been set.');
  });

  it('should throw error on root component not set', () => {
    ReactWebComponent.setAttributes({} as any);
    ReactWebComponent.setProperties({} as any);

    const render = () => {
      ReactWebComponent.render(null as any, '');
    }

    expect(render).toThrowError('Cannot define custom element: Root Component have not been set.');
  });

  it('should throw error on element name not set', () => {
    ReactWebComponent.setAttributes({} as any);
    ReactWebComponent.setProperties({} as any);

    const render = () => {
      ReactWebComponent.render({} as any, '');
    }

    expect(render).toThrowError('Cannot define custom element: Element name has not been set.');
  });
});
