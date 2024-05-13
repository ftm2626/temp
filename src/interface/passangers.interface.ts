export type submitRequestErrorT = {
  hour?: string;
  departure_date?: string;
  origin_city?: string;
  destination_city?: string;
  origin?: string;
  destination?: string;
  return_date?: string;
  return_time?: string;
  airport_type?: string;
  airport_id?: string;
  terminal?: string;
  flight_number?: string;
  airline_id?: string;
  subtype?: string;
  description?: string;
};

export type submitRequestFormInputT = {
  origin_city?: { name: string; id: number };
  destination_city?: { name: string; id: number };
  departure_date?: number;
  hour?: string;
  return_date?: number;
  return_time?: string;
  origin?: string;
  destination?: string;
  description?: string;
  terminal?: string;
  airport_id?: { name: string; id: number };
  airport_type?: string;
  airline_id?: { name: string; id: number };
  flight_number?: string;
  subtype?: number;
};

export type ReportListFormInputT = {
  from: number;
  to: number;
};

export type ReportListFormErrorT = {
  from?: string;
  to?: string;
};

export type acceptServiceFormInputT = {
  address: string;
  out_of_town?: true;
  end_time: string;
  start_time: string;
  questions: number[];
  origin_city: { id: number; name: string };
  destination_city: { id: number; name: string };
};

export type AddressFormInputT = {
  title: string;
  description: string;
  status?:number
};
