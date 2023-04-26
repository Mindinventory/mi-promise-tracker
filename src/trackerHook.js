import React from "react";
import {
  emitter,
  promiseCounterUpdateEventId,
  getCounter,
} from "./trackPromise";
import { defaultConfig, setupConfig } from "./setupConfig";

export const usePromiseTracker = (outerConfig = defaultConfig) => {
  let isMounted = React.useRef(false);

  React.useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  const [config] = React.useState(setupConfig(outerConfig));

  React.useEffect(() => {
    if (
      isMounted.current &&
      config &&
      config.area &&
      getCounter(config.area) > 0
    ) {
      setInternalPromiseInProgress(true);
      setPromiseInProgress(true);
    }
  }, [config]);

  const [internalPromiseInProgress, setInternalPromiseInProgress] =
    React.useState(false);

  const [promiseInProgress, setPromiseInProgress] = React.useState(false);

  const latestInternalPromiseInProgress = React.useRef(
    internalPromiseInProgress
  );

  const notifyPromiseInProgress = () => {
    !config || !config.delay || config.delay === 0
      ? setPromiseInProgress(true)
      : setTimeout(() => {
          if (isMounted.current && latestInternalPromiseInProgress.current) {
            setPromiseInProgress(true);
          }
        }, config.delay);
  };

  const updatePromiseTrackerStatus = (anyPromiseInProgress, areaAffected) => {
    if (isMounted.current && config.area === areaAffected) {
      setInternalPromiseInProgress(anyPromiseInProgress);

      latestInternalPromiseInProgress.current = anyPromiseInProgress;
      if (!anyPromiseInProgress) {
        setPromiseInProgress(false);
      } else {
        notifyPromiseInProgress();
      }
    }
  };

  React.useEffect(() => {
    latestInternalPromiseInProgress.current = internalPromiseInProgress;
    emitter.on(promiseCounterUpdateEventId, updatePromiseTrackerStatus);

    return () =>
      emitter.off(promiseCounterUpdateEventId, updatePromiseTrackerStatus);
  }, []);

  return { promiseInProgress };
};
