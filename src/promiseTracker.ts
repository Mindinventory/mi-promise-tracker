import { Emitter } from "./tinyEmmiter";
import { defaultArea } from "./constants";

export const emitter = new Emitter();
export const promiseCounterUpdateEventId = "promise-counter-update";

let counter = {
  [defaultArea]: 0,
};

export const getCounter = (area) => counter[area];

export const promiseTracker = (promise, area) => {
  area = area || defaultArea;
  incrementPromiseCounter(area);

  const onResolveHandler = () => decrementPromiseCounter(area);
  promise.then(onResolveHandler, onResolveHandler);

  return promise;
};

const incrementPromiseCounter = (area) => {
  incrementCounter(area);
  const promiseInProgress = anyPromiseInProgress(area);
  emitter.emit(promiseCounterUpdateEventId, promiseInProgress, area);
};

const incrementCounter = (area) => {
  if (Boolean(counter[area])) {
    counter[area]++;
  } else {
    counter[area] = 1;
  }
};

const anyPromiseInProgress = (area) => counter[area] > 0;

const decrementPromiseCounter = (area) => {
  counter[area] > 0 && decrementCounter(area);
  const promiseInProgress = anyPromiseInProgress(area);
  emitter.emit(promiseCounterUpdateEventId, promiseInProgress, area);
};

const decrementCounter = (area) => {
  counter[area]--;
};

export const manuallyResetPromiseCounter = (area) => {
  area = area || defaultArea;
  counter[area] = 0;
  emitter.emit(promiseCounterUpdateEventId, false, area);
};

export const manuallyDecrementPromiseCounter = (area) => {
  area = area || defaultArea;
  decrementPromiseCounter(area);
};

export const manuallyIncrementPromiseCounter = (area) => {
  area = area || defaultArea;
  incrementPromiseCounter(area);
};
