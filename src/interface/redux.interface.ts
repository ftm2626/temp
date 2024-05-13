import {
  chatContactApiRes,
  chatListApiRes,
  oneChatApiRes,
} from "./chatApi.interface";

//Auth
export type authInitStateT = {
  name: string;
  phone: string;
  role: string;
  hasService: number;
  chatToken: string;
  socket: any;
  group:string
  compony:string
};

// Drivers
export type driversInitStateT = {
  cityLocal: number;
  interCityLocal: number;
  lid: number;
  locations: driversLocation[];
  bearingLoc1: driversBearing;
  bearingLoc2: driversBearing;
  bearing: number;
  isGpsOn: boolean;
  driver_has_calender: boolean;
};

export type driversLocation = {
  bearing?: number;
  lat?: number;
  lid?: number;
  lon?: number;
  timestamp?: number;
};

export type driversBearing = {
  lat: number;
  lon: number;
};

// chat
export type chatInitStateT = {
  connected: boolean;
  created: boolean;
  initialData: chatListApiRes | null;
  oneChatData:
    | oneChatApiRes
    | {
        status: null;
        messages: null;
        user: null;
      };
  contactListData: chatContactApiRes | null;
};
