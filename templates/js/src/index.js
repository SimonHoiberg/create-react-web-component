import { ReactWebComponent } from 'create-react-web-component';
import { componentAttributes, componentProperties } from './componentProperties';
import App from './App';

ReactWebComponent.setAttributes(componentAttributes);
ReactWebComponent.setProperties(componentProperties);
ReactWebComponent.render(App, '%component-name-snake%');
