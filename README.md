# mi-promise-tracker

This is a Promise Tracker component for ReactJS that can be used to track promises that are being executed asynchronously and display a loading indicator or disable a button until the promise has been resolved or rejected.

# Installation

To install the package, run the following command:

```cmd
npm install mi-promise-tracker
```

# Usage

1. Import the usePromiseTracker hook from the package.

```diff
 import { promiseTrack } from 'mi-promise-tracker';
```

2. Wrap the component that executes the promise with the ```usePromiseTracker``` hook.

```diff
const LoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress ? <div>Loading...</div> : null;
};

```

3. In the component that executes the promise, set the ```promiseInProgress``` state to true when the promise is executed and set it to false when it is resolved or rejected.

```diff
import React, { useState } from "react";
import { promisetracker } from "mi-promise-tracker";

const MyComponent = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    promisetracker(
      fetch("https://api.example.com/data")
        .then((response) => response.json())
        .then((data) => setData(data))
    );
  };

  return (
    <>
      <button onClick={fetchData}>Fetch Data</button>
      {data && <div>{JSON.stringify(data)}</div>}
    </>
  );
};

export default MyComponent;

```

In this example, we define a ```MyComponent``` that fetches data from an API. We use the ```trackPromise``` function to track the promise that is executed when the button is clicked. The ```promiseInProgress``` state is set by the ```usePromiseTracker``` hook, and the loading indicator is only rendered when it is true.

## Basic sample:

```diff
import React from "react";
import { usePromiseTracker } from "mi-promise-tracker";

const LoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress ? <div>Loading...</div> : null;
};

export default LoadingIndicator;
```

In this example, we define a ```LoadingIndicator``` component that uses the ```usePromiseTracker``` hook to track promises. The loading indicator is only rendered when a promise is in progress.

- To add a cool spinner component you can make use of _react-spinners_:

## Sample with delay:

```diff
import React from "react";
import { usePromiseTracker } from "react-promise-tracker";

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker({ delay: 500 });

  return promiseInProgress ? <div>Loading...</div> : null;
};

export default LoadingIndicator;
```

In this example, we define a ```LoadingIndicator``` component that uses the ```usePromiseTracker``` hook to track promises with a delay of 500 milliseconds. The loading indicator is only rendered after the delay has elapsed and a promise is still in progress. This can be useful to prevent displaying a loading indicator for very short-lived promises.

## Sample with areas:

```diff
import React from "react";
import { usePromiseTracker } from "mi-promise-tracker";

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker({area: props.area});
  return promiseInProgress ? <div>Loading...</div> : null;
};

export default LoadingIndicator;
```

We could add the default-area to show user list spinner (no params means just default area):

```diff
import React from 'react';
import { SpinnerComponent} from './spinner';

export const UsersListComponent = (props) => (
  <div>
    ...
    <SpinnerComponent /> // default-area
  </div>
);
```

And we add the category-area to show category list spinner:

```diff
import React from 'react';
import { SpinnerComponent} from './spinner';

export const CategoryListComponent = (props) => (
  <div>
    ...
    <SpinnerComponent area="category-list-area" />
  </div>
);
```

When we track a given promise we can choose the area that would be impacted.

```diff
import { promiseTrack} from 'mi-promise-tracker';
...
promiseTrack(
    fetchCategories();
,'category-list-area');
```

## Let us know!
If you use our open-source libraries in your project, please make sure to credit us and Give a star to [www.mindinventory.com](https://mindinventory.com/)


![alt text](https://git.mindinventory.com/uploads/-/system/appearance/header_logo/1/mi-logo.png)

<a href="https://www.mindinventory.com/contact-us.php?utm_source=gthb&utm_medium=repo&utm_campaign=npm-mi-image-resize" target="__blank">
<img src="https://github.com/Sammindinventory/MindInventory/raw/main/hirebutton.png" width="203" height="43"  alt="app development">
</a>
