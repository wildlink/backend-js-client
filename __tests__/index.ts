import { WildlinkClient } from '../src';
import { Device } from '../src/types/api';

const mockAppId = 0;
const mockAppKey = 'appKey';
const mockDeviceToken = 'deviceToken';
const mockDeviceKey = 'deviceKey';
const mockDeviceId = 0;
const mockDeviceUuid = 'deviceUuid';

const MockWildlinkClient = jest.fn<WildlinkClient, [number, string]>().mockImplementation((appId, appKey) => {
  return Object.assign(new WildlinkClient(appId, appKey), {
    createDevice(this: any): Promise<Device> {
      return Promise.resolve({
        DeviceToken: mockDeviceToken,
        DeviceKey: this.deviceKey || mockDeviceKey,
        DeviceID: mockDeviceId,
        UUID: mockDeviceUuid,
      });
    },
  });
});

const createClient = () => new MockWildlinkClient(mockAppId, mockAppKey);

describe('WildlinkClient', () => {
  let client: WildlinkClient;

  beforeEach(async () => {
    client = createClient();
    await client.init();
  });

  describe('constructor', () => {
    it('should be created', () => {
      expect(client).toBeInstanceOf(WildlinkClient);
    });

    it('should fail if appId was not provided', () => {
      expect(WildlinkClient.bind(WildlinkClient)).toThrow();
    });

    it('should fail if appKey was not provided', () => {
      expect(WildlinkClient.bind(WildlinkClient, mockAppId)).toThrow();
    });
  });

  describe('init()', () => {
    beforeEach(() => {
      client = createClient();
    });

    it('should be defined', () => {
      expect(client.init).toBeInstanceOf(Function);
    });

    it('should initialize client', async () => {
      const spy = jest.spyOn(client, 'init');
      await client.init();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should only initialize client once', async () => {
      await client.init();
      await expect(client.init()).rejects.toThrow();
    });

    it('should create a device if device token was not provided', async () => {
      // <any, any> to spy on a private method
      const createDevice = jest.spyOn<any, any>(client, 'createDevice');
      await client.init();
      expect(createDevice).toHaveBeenCalledTimes(1);
    });

    it('should use provided device key', async () => {
      await client.init('key');
      expect(client.getDeviceKey()).toBe('key');
    });

    it('should throw an error if it failed to create a device', async () => {
      client = new WildlinkClient(mockAppId, mockAppKey);
      await expect(client.init()).rejects.toThrow();
    });
  });

  describe('getDeviceToken()', () => {
    it('should be defined', () => {
      expect(client.getDeviceToken).toBeInstanceOf(Function);
    });

    it('should return device token', () => {
      expect(client.getDeviceToken()).toBe(mockDeviceToken);
    });
  });

  describe('getDeviceKey()', () => {
    it('should be defined', () => {
      expect(client.getDeviceKey).toBeInstanceOf(Function);
    });

    it('should return device key', () => {
      expect(client.getDeviceKey()).toBe(mockDeviceKey);
    });
  });

  describe('getDeviceId()', () => {
    it('should be defined', () => {
      expect(client.getDeviceId).toBeInstanceOf(Function);
    });

    it('should return device id', () => {
      expect(client.getDeviceId()).toBe(mockDeviceId);
    });
  });

  describe('getDeviceUuid()', () => {
    it('should be defined', () => {
      expect(client.getDeviceUuid).toBeInstanceOf(Function);
    });

    it('should return device id', () => {
      expect(client.getDeviceUuid()).toBe(mockDeviceUuid);
    });
  });

  describe('getDomains()', () => {
    it('should be defined', () => {
      expect(client.getDomains).toBeInstanceOf(Function);
    });

    it('should throw an error if client was not initialized', () => {
      client = createClient();
      expect(client.getDomains.bind(client)).toThrow();
    });
  });

  describe('generateVanity()', () => {
    it('should be defined', () => {
      expect(client.generateVanity).toBeInstanceOf(Function);
    });

    it('should throw an error if client was not initialized', () => {
      client = createClient();
      expect(client.generateVanity.bind(client)).toThrow();
    });

    it('should throw an error if url was not provided', () => {
      expect(client.generateVanity.bind(client)).toThrow();
    });
  });

  describe('makeHeaders()', () => {
    it('should be defined', () => {
      // private method
      expect(client['makeHeaders']).toBeInstanceOf(Function);
    });
  });

  describe('makeAuthToken()', () => {
    it('should be defined', () => {
      // private method
      expect(client['makeAuthToken']).toBeInstanceOf(Function);
    });
  });

  describe('createDevice()', () => {
    it('should be defined', () => {
      // private method
      expect(client['createDevice']).toBeInstanceOf(Function);
    });
  });
});
