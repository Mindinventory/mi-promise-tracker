# mi-promise-tracker

# Installation

```cmd
npm install mi-promise-tracker --save
```

# Usage

Whenever you want a promise to be tracked, just wrap it like in the code below:

```diff
+ import { promiseTrack } from 'mi-promise-tracker';
//...

+ promiseTrack(
    fetchUsers(); // You function that returns a promise
+ );
```

Then you only need to create a spinner component and make use of the _usePromiseTracker_, this
hook will expose a boolean property that will let us decide whether to show or hide the loading
spinner.

## Basic sample:

```diff
import React, { Component } from 'react';
+ import { usePromiseTracker } from "mi-promise-tracker";

export const SpinnerComponent = (props) => {
+ const { promiseInProgress } = usePromiseTracker();

  return (
    <div>
    {
+      (promiseInProgress === true) ?
        <h3>Hello I'm a spinner !!!</h3>
      :
        null
    }
  </div>
  )
};
```

- To add a cool spinner component you can make use of _react-spinners_:


* Then in your application entry point (main / app / ...) just add this loading spinner to be displayed:

```diff
import React from 'react';
+ import { SpinnerComponent} from './spinner';

export const AppComponent = (props) => (
  <div>
    <h1>Hello App!</h1>
+   <SpinnerComponent />
  </div>
);
```

## Sample with delay:

You can add as well a delay to display the spinner, When is this useful? if your users are connected on
high speed connections it would be worth to show the spinner right after 500 Ms (checking that the
ajax request hasn't been completed), this will avoid having undesired screen flickering on high speed
connection scenarios.

```diff
export const Spinner = (props) => {
+  const { promiseInProgress } = usePromiseTracker({delay: 500});
}
```