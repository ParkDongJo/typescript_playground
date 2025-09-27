type EventName = `on${string}`;
type EventObject<T> = {
  val: T;
}

type Callback<T = any> = (ev: EventObject<T>) => void;

type Events = {
  [K in EventName]?: Callback[];
}

class EventSystem {
  events: Events;
  constructor() {
    this.events = {};
  }
  
  defineEventHandler(ev: EventName, cb: Callback): void {
    this.events[ev] = this.events[ev] || [];
    this.events[ev].push(cb);
  }

  trigger(ev: EventName, val: any): void {
    let callbacks = this.events[ev];
    if (callbacks) {
      callbacks.forEach(cb => cb({ val }));
    }
  }
}

const system = new EventSystem();

system.defineEventHandler('anyEvent', (ev) => {
  console.log(ev.val);
});

system.trigger('onButtonClick', 'click');