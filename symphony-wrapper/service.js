function Service(name) {
  this.name = name;
  this.events = {};
  this.reflectors = {};
  this.eventId = 0;
  this.publish = this.callfire;
  this.subscribe = this.listen;
  this.unsubscribe = this.remove;
  this.unlisten = this.remove;
  this.invoke = this.callfire;
  this.invokeArgs = this.fireArgs;
  this.methods = [];
  this.tight = true;
}

Service.prototype = {
  setType(names) {
    names.forEach(function (name) {
      this[name] = this.invoke.bind(this, name);
      this.methods.push(name);
    }, this);
  },

  callfire() {
    return this.fire.apply(this, arguments);
  },

  loosen(name) {
    this[name] = this.invoke.bind(this, name);
  },

  loosenAll() {
    this.tight = false;
    this.methods.forEach(function (name) {
      this.loosen(name);
    }, this);
  },

  implementOne(name, callback) {
    const ename = `${name}_e_`;
    const eventList = this.events[ename];

    // there can only be one implementation
    if (eventList) {
      return;
    }

    this.listen(name, callback);
    if (this.tight) {
      this[name] = callback;
    } else {
      this[name] = this.invoke.bind(this, name);
    }

    this.methods.push(name);
  },

  implement(name, callback) {
    if (typeof name === 'string') {
      this.implementOne(name, callback);
      return;
    }

    const object = name;

    for (var name in object) {
      if (object.hasOwnProperty(name)) {
        var callback = object[name];
        this.implementOne(name, callback.bind(this));
      }
    }
  },

  /**
 *  Call this function to listen for an event.
 *
 * @this {Service}
 * @param {string} name the name of the event
 * @param {function} callback the function to call when the event has been fired
 * @return id a unique identifier that can me used to later remove the listener
 */
  listen(name, callback) {
    name += '_e_';
    let eventList = this.events[name];

    if (eventList == null) {
      eventList = {};
      this.events[name] = eventList;
    } else {
      // there was already a listener, so make sure that we losen the implementation so that
      // callfire is called.
      this.loosen(name);
    }

    const eventId = `event_${this.eventId}`;
    this.eventId++;
    eventList[eventId] = callback;

    return eventId;
  },

  bubble(source, eventName) {
    source.listen(eventName, function () {
      const args = Array.prototype.slice.call(arguments);
      args.unshift(eventName);
      this.fire.apply(this, args);
    }.bind(this));
  },

  /**
 * Call this function to remove your callback for an event
 *
 * @this {Service}
 * @param {string} name the name of the event
 * @param id the unique identifier returned from listen
 */
  remove(name, id) {
    name += '_e_';
    let eventList = this.events[name];

    if (eventList == null) return;

    if (id === '') {
      eventList = {};
    } else {
      delete eventList[id];
    }
  },

  /**
 * Call this function to remove all listeners for an event
 *
 * @this {Service}
 * @param {string} name the name of the event
 */
  removeAll(name) {
    name += '_e_';
    this.events[name] = {};
  },

  /**
 * Call this function to get the number of listeners for a specific event
 *
 * @this {Service}
 * param {string} name the name of the event
 */
  getEventCount(name) {
    name += '_e_';
    const eventList = this.events[name];
    if (eventList == null) return 0;
    return _.size(eventList);
  },

  /**
 * Call this function to fire an event. All event handlers will be called. The first handler
 * to return a result will be the result returned from fire
 *
 * @this {Service}
 * @param {string}
 * @param ... other paramters to pass to the event handlers
 */
  fire(name) {
    name += '_e_';
    const passed = Array.prototype.slice.call(arguments, 1);
    const eventList = this.events[name];
    let result;
    if (eventList == null) return;

    for (const key in eventList) {
      if (eventList.hasOwnProperty(key)) {
        const callback = eventList[key];
        const response = callback.apply(this, passed);
        if (result === undefined && response !== undefined) {
          result = response;
        }
      }
    }

    return result;
  },

  /**
 *  Call this function to fire an event passing it extra paramters from an array.
 *  All event handlers will be called.  The first handler  to return a result will be
 *  the result returned from fireArgs
 *
 * @this {Service}
 * @param name {string} the name of the event
 * @param params {array} an array of parameters to pass to the event handlers
*/
  fireArgs(name, params) {
    params.unshift(name);
    result = this.fire.apply(this, params);
    params.shift(name);
    return result;
  },

  reflect(name, service) {
    let reflectors;
    this.reflectors[name] = this.reflectors[name] || [];

    reflectors = this.reflectors[name];
    if (!reflectors.length) this.listen(name, onReflect.bind(this, name));

    reflectors.push(service);
  },

  onReflect(name) {
    const params = Array.prototype.slice.call(arguments, 1);
    const services = this.reflectors[name];

    if (!services) {
      return;
    }

    services.forEach((service) => {
      service.fireArgs(name, params);
    }, this);
  },
};

export default Service;
