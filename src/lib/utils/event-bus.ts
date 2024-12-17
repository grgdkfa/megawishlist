import { EventBus, createEventDefinition } from "ts-bus";

export const bus = new EventBus()

bus.emitter.setMaxListeners(300)

export const resetEvent = createEventDefinition<void>()('reset')