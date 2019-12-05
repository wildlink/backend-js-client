export interface ParsedResponse<T> {
  status: number;
  ok: boolean;
  json: T;
  error?: string;
}

export interface Domain {
  ID: string;
  Kind: string;
  Value: string;
  URL: string;
}

export interface Vanity {
  OriginalURL: string;
  VanityURL: string;
}

export interface Device {
  DeviceToken: string;
  DeviceKey: string;
  DeviceID: number;
}
