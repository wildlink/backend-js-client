const { WildlinkClient } = require('@wildlink/backend-js-client');

const appId = 0;
const appKey = '';

const WLClient = new WildlinkClient(appId, appKey);

WLClient.init()
  .then(() => {
    const deviceId = WLClient.getDeviceId();
    console.log(deviceId);
    const deviceKey = WLClient.getDeviceKey();
    console.log(deviceKey);
    const deviceToken = WLClient.getDeviceToken();
    console.log(deviceToken);

    WLClient.getDomains().then((domains) => {
      console.log(domains.length);
    });

    WLClient.generateVanity('https://www.walmart.com').then((vanity) => {
      console.log(vanity);
    });
  })
  .catch((error) => {
    console.log(error);
  });
