//mutations

export type requestSupportApiSendT = {
  subject: string;
  priority: "low" | "normal" | "high";
  message: string;
};

export type storeAddressApiSendT = {
  title: string;
  description: string;
  status?: number;
  id?:number
};

export type requestSupportApiResT = {
  message: string;
  status: number;
  data: {
    id: number;
    subject: string;
    user_id: number;
    priority: string;
    message: string;
    reply: null;
    status: number;
  };
};

export type registrationApiSendT = {
  origin_city?: number;
  destination_city?: number;
  departure_date?: number;
  hour?: string;
  return_date?: number;
  return_time?: string;
  origin?: string;
  destination?: string;
  description?: string;
  terminal?: string;
  airport_id?: number;
  airport_type?: string;
  airline_id?: number;
  flight_number?: string;
  subtype?: number;
};

export type registrationApiResT = {
  message: string;
  status: number;
};

export type ReportListApiSendT = {
  from: number;
  to: number;
  type: "receipt" | "svc";
};

export type ReportListApiResT = {
  data: any;
  message: string;
  status: number;
};

export type RemoveServiceApiResT = {
  message: string;
  status: number;
};

export type acceptServiceApiSendT = {
  address: string;
  out_of_town?: true;
  end_time: string;
  start_time: string;
  questions: number[];
  origin_city: number;
  destination_city: number;
};

export type acceptServiceApiResT = {
  message: string;
  status: number;
};

//queries

export type AddressListApiResT = {
  data: {
    description: string;
    id: number;
    status: number;
    title: string;
  }[];
  message: string;
  status: number;
};

export type TicketListApiResT = {
  data: {
    id: number;
    subject: string;
    user_id: number;
    priority: string;
    message: string;
    reply: string;
    status: number;
    reply_time: string;
  }[];
  message: string;
  status: number;
};

export type editRequestApiResT = {
  data: {
    cities: { id: number; name: string }[];
    airlines: { id: number; name: string }[];
    airports: { id: number; name: string }[];
    service: {
      id: number;
      sub_service_type_id: number;
      sub_service_type_title: string;
      departure_date: number;
      return_date: number;
      hour: string;
      return_time: string;
      origin_city: number;
      destination_city: number;
      origin: string;
      destination: string;
      description: string;
      rejected: number;
      transfer: {
        id: number;
        service_id: number;
        airport_id: number;
        flight_number: string;
        terminal: string;
        airline: number;
        deleted_at: string;
        created_at: string;
        updated_at: string;
      };
      airport_type: string;
    };
  };
  message: string;
  status: number;
};

export type subserviceListApiResT = {
  subServices: {
    data: {
      id: number;
      status: string;
      date: string;
      day: string;
      hour: string;
      passenger_firstname: string;
      passenger_phone: string;
      track_gps: number;
      ask_details_from_passenger: number;
      out_of_town: number;
      origin_city: string;
      destination_city: string;
      origin_address: string;
      destination_address: string;
      description: string;
      service_type: string;
      other_passengers: null;
      type: string;
      driver_name: string;
      driver_number: string;
      driver_car: string;
      representor_name: string;
      car_plate: string[];
      status_color: string;
    }[];
  };
  message: string;
  status: number;
};

export type createInfoApiResT = {
  message: string;
  status: number;
  data: {
    cities: {
      id: number;
      name: string;
    }[];

    airports: {
      id: number;
      name: string;
    }[];
    airlines: {
      id: number;
      name: string;
    }[];
  };
};

export type requestListApiResT = {
  data: {
    receipts: {
      id: number;
      subservice_id: number;
      date: string;
      day: string;
      passenger: string;
      passenger_id: number;
      passenger_phone: string;
      out_of_town: number;
      status: string;
      status_id: number;
      address: string;
      start_time: string;
      end_time: string;
      track_gps: number;
      driver: { name: string; id: number; lname: string };
      subservice: {
        id: number;
        status: string;
        date: string;
        day: string;
        hour: string;
        passenger_firstname: string;
        passenger_lastname: string;
        passenger_phone: string;
        track_gps: number;
        ask_details_from_passenger: number;
        out_of_town: number;
        origin_city: string;
        destination_city: string;
        origin_address: string;
        destination_address: string;
        description: string;
        service_type: string;
        other_passengers: null;
      };
      type: string;
    }[];
    services: {
      id: number;
      sub_service_type: string;
      departure_date: string;
      return_date: string;
      hour: string;
      return_time: string;
      origin_city: string;
      destination_city: string;
      origin: string;
      destination: string;
      rejected: number;
      rejected_reasons: {
        id: number;
        service_id: number;
        creator_id: number;
        reason: string;
        created_at: string;
        updated_at: string;
      }[];
      has_sub_service: number;
      description: null;
      editable: number;
    }[];

    pagination: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
    };
  };
  message: string;
  status: number;
};



export type servicesQApiResT = {
  data: {
    id: number;
    body: string;
  }[];
  message: string;
  status: number;
};

export type servicesListApiResT = {
  data: {
    latest: { id: number };
    receipts: {
      id: number;
      date: string;
      day: string;
      passenger_first_name: string;
      passenger_last_name: string;
      passenger_id: number;
      passenger_phone: string;
      out_of_town: number;
      driver_start_time: string;
      company: string;
      driver_name: string;
      driver_phone: string;
      driver_car_plate1: string;
      driver_car_plate2: string;
      driver_car_plate3: string;
      driver_car_plate4: string;
      car_brand: string;
      car_model: string;
      car_color: string;
      type: string;
      subservice_id: number | null;
    }[];
  };
  message: string;
  status: number;
};

export type ReportServiceListApiSendT = {
  from: number;
  to: number;
  page: number;
  // type: string;
};
