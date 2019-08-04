import * as React from 'react';

const EventContext = React.createContext<Function>(() => {});
export const EventProvider = EventContext.Provider;
export const EventConsumer = EventContext.Consumer;
export default EventContext;
