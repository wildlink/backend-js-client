# backend-js-client

JavaScript Client Library for working with Wildfire/Wildlink APIs server side. Convert product and brand links into affiliate versions to generate revenue. Learn more at https://www.wildlink.me/.

## Requirements

- Node.js
- package manager (npm or yarn)

## Installation

With Yarn:

```shell script
yarn add @wildlink/backend-js-client
```

## Usage

```js
// 1. Load
const { WildlinkClient } = require('@wildlink/backend-js-client');

// 2. Create instance of WildlinkClient

// Application id
const appId = APPLICATION_ID;
// Application key
const appKey = APPLICATION_KEY;

const WLClient = new WildlinkClient(appId, appKey);

// 3. Initialize

// deviceKey is optional and a new device will be created if omitted
// Define it if you want to create a new "session" with a previously created device
const deviceKey = '';

WLClient.init(deviceKey).then(() => {
  // deviceId is used for referencing the device in reporting data
  const deviceId = WLClient.getDeviceId();
  // deviceKey is used for authenticating the device in the future - it doesn't expire
  const deviceKey = WLClient.getDeviceKey();
  // deviceToken is used for authenticating the device - it expires
  const deviceToken = WLClient.getDeviceToken();

  // 4. Make API requests (see below)
});
```

To obtain an `appId` and `appKey`, contact support@wildlink.me.

### Get Supported Merchant Domains

The `getDomains` function fetches all domains that we support and are wildlink-able. These are in the context of the authenticated device that made the call.

```js
WLClient.getDomains().then((domains) => {
  console.log(domains);
});
```

#### Example return

```js
[
  {
    ID: "8NkEhsh5FA",
    Kind: "domain",
    Value: "theblackbow.com",
    URL: "http://wild.link/8NkEhsh5FA"
  },
  {
    ID: "8NkE1tKFAQ8",
    Kind: "domain",
    Value: "acetag.com",
    URL: "http://wild.link/8NkE1tKFAQ8"
  },
  {
    ID: "8NkE5byZAQM",
    Kind: "domain",
    Value: "www.adagio.com",
    URL: "http://wild.link/8NkE5byZAQM"
  },
  {
    ID: "8NkE3tKFAQ4",
    Kind: "domain",
    Value: "awesomeseating.com",
    URL: "http://wild.link/8NkE3tKFAQ4"
  },
  {
    ID: "8NkE8NCFAQo",
    Kind: "domain",
    Value: "theblackbox.com",
    URL: "http://wild.link/8NkE8NCFAQo"
  },
  ...
]
```

### Generate Vanity URL

The `generateVanity` function converts a URL (to a product page, listing page, etc.) to a wild.link URL with embedded tracking for the authenticated device.

```js
WLClient.generateVanity('https://www.walmart.com').then((vanity) => {
  console.log(vanity);
});
```

#### Example Return

```js
{
  OriginalURL: "https://www.walmart.com",
  VanityURL: "http://wild.link/walmart/AK2vBQ"
}
```

## Example

Check out the [example](https://github.com/wildlink/backend-js-client/tree/master/example) for implementation details.
