/**
 * Caution! You should not edit this file.
 *
 * Running 'create-react-web-component --update' will replace this file.
 */

import { createContext } from 'react';

const EventContext = createContext<Function>(() => {});
export const EventProvider = EventContext.Provider;
export const EventConsumer = EventContext.Consumer;
export default EventContext;
