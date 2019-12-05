import cryptoJS from 'crypto-js';
import promise from 'es6-promise';
import { request } from './helpers/request';
import { Device, Domain, Vanity } from './types/api';

promise.polyfill();

export class WildlinkClient {
  private readonly appId: number;
  private readonly appKey: string;

  private isInit = false;
  private deviceToken = '';
  private deviceKey = '';
  private deviceId = 0;

  constructor(appId: number, appKey: string) {
    if (typeof appId === 'undefined') {
      throw new Error('Missing appId');
    }

    if (!appKey) {
      throw new Error('Missing appKey');
    }

    this.appId = appId;
    this.appKey = appKey;
  }

  async init(deviceKey = ''): Promise<void> {
    if (this.isInit) {
      throw new Error('WildlinkClient should only be initialized once');
    }

    this.deviceKey = deviceKey;

    try {
      const { DeviceToken, DeviceKey, DeviceID } = await this.createDevice();

      this.deviceToken = DeviceToken;
      this.deviceKey = DeviceKey;
      this.deviceId = DeviceID;

      this.isInit = true;
    } catch (error) {
      throw error;
    }
  }

  getDeviceToken(): string {
    return this.deviceToken;
  }

  getDeviceKey(): string {
    return this.deviceKey;
  }

  getDeviceId(): number {
    return this.deviceId;
  }

  getDomains(): Promise<Domain[]> {
    if (!this.isInit) {
      throw new Error('WildlinkClient has not been initialized yet');
    }

    const options: RequestInit = {
      method: 'GET',
      headers: this.makeHeaders(),
    };

    return request<Domain[]>('/v2/concept/domain', options);
  }

  generateVanity(url: string): Promise<Vanity> {
    if (!this.isInit) {
      throw new Error('WildlinkClient has not been initialized yet');
    }

    if (!url) {
      throw new Error('No URL provided');
    }

    const body = {
      URL: url,
      Placement: `backend-js-client_${this.appId}`,
    };

    const options: RequestInit = {
      method: 'POST',
      headers: this.makeHeaders(),
      body: JSON.stringify(body),
    };

    return request<Vanity>('/v2/vanity', options);
  }

  private makeHeaders(): HeadersInit {
    const dateTime = new Date().toISOString();
    const authToken = this.makeAuthToken(dateTime);

    return {
      'Content-Type': 'application/json',
      Authorization: authToken,
      'X-WF-DateTime': dateTime,
      'User-Agent': `backend-js-client`,
      'X-WF-Device-Token': this.deviceToken,
    };
  }

  private makeAuthToken(dateTime: string, senderToken = '') {
    const stringToSign = `${dateTime}\n${this.deviceToken}\n${senderToken}\n`;
    const appSignature = cryptoJS.HmacSHA256(stringToSign, this.appKey).toString(cryptoJS.enc.Hex);

    return `WFAV1 ${this.appId}:${appSignature}:${this.deviceToken}:${senderToken}`;
  }

  private createDevice(): Promise<Device> {
    // create or recreate device depending if deviceKey provided
    const body = {
      DeviceKey: this.deviceKey,
    };

    const options: RequestInit = {
      method: 'POST',
      headers: this.makeHeaders(),
      body: JSON.stringify(body),
    };

    return request<Device>('/v2/device', options);
  }
}
