// mutations

export type requestServiceApiSendT = {
  passenger_id: number;
  start_time: string;
  out_of_town: boolean;
};

export type requestServiceApiResT = {
  data: {
    id: number;
    date: string;
    day: string;
    passenger: string;
    passenger_id: number;
    passenger_phone: string;
    out_of_town: number;
    status: string;
    status_id: number;
    address: null;
    start_time: null;
    end_time: null;
    track_gps: number;
    driver: {
      id: number;
      creator: null;
      is_casedriver: number;
      supverisor_id: null;
      role_id: number;
      zone_id: null;
      location_id: number;
      city_id: number;
      province_id: number;
      driver_id: null;
      group_id: null;
      api_token: string;
      active_code: number;
      freetime: number;
      companyID: number;
      name: string;
      lname: string;
      melicode: string;
      posticode: null;
      address: null;
      phone: null;
      mobile: string;
      assigned: number;
      assignedSar: number;
      forceUpdateDriverVersion: number;
      forceUpdateDriverOldVersion: number;
      email: string;
      email_verified_at: null;
      status: number;
      carType: string;
      carPelak: string;
      driverPic: string;
      sign: null;
      created_at: string;
      updated_at: string;
      supervisor: number;
      track_gps: number;
      login_token: null;
      deny_web_login: number;
      uid: string;
      web_fcm_token_large: null;
      web_fcm_token_small: null;
      app_fcm_token: null;
      last_location: string;
      map_token: null;
      deposit_to_agent_account: number;
    };
    type: string;
  };
  message: string;
  status: number;
};

export type acceptableServiceApiResT = {
  message: string;
  status: number;
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
    destination_city: null;
    origin_address: string;
    destination_address: null;
    description: null;
    service_type: string;
    other_passengers: null;
    type: string;
  };
};

export type currentServiceApiResT = {
  message: string;
  status: number;
  data: {
    id: number;
    date: string;
    day: string;
    passenger: string;
    passenger_id: number;
    passenger_phone: string;
    out_of_town: number;
    status: string;
    status_id: number;
    address: null;
    start_time: null;
    end_time: null;
    track_gps: number;
    driver: {
      id: number;
      creator: null;
      is_casedriver: number;
      supverisor_id: null;
      role_id: number;
      zone_id: null;
      location_id: number;
      city_id: number;
      province_id: number;
      driver_id: null;
      group_id: null;
      api_token: string;
      active_code: number;
      freetime: number;
      companyID: number;
      name: string;
      lname: string;
      melicode: string;
      posticode: null;
      address: null;
      phone: null;
      mobile: string;
      assigned: number;
      assignedSar: number;
      forceUpdateDriverVersion: number;
      forceUpdateDriverOldVersion: number;
      email: string;
      email_verified_at: null;
      status: 1;
      carType: string;
      carPelak: string;
      driverPic: string;
      sign: null;
      created_at: string;
      updated_at: string;
      supervisor: number;
      track_gps: number;
      login_token: null;
      deny_web_login: number;
      uid: string;
      web_fcm_token_large: null;
      web_fcm_token_small: null;
      app_fcm_token: null;
      last_location: null;
      map_token: null;
      deposit_to_agent_account: number;
    };
    type: string;
  };
};

//queries

export type currentServicesApiResT = {
  data: {
    all_receipts: {
      id: number;
      date: string;
      day: string;
      passenger: string;
      passenger_id: number;
      passenger_phone: string;
      out_of_town: number;
      status: string;
      status_id: number;
      track_gps: number;
      type: string;
      start_time: string;
      subservice_id: number;
    }[];
    first_receipt: number;
  };
  message: string;
  status: number;
};

export type acceptableServicesApiResT = {
  data: {
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
    destination_city: null;
    origin_address: string;
    destination_address: null;
    description: null;
    service_type: string;
    other_passengers: null;
    type: string;
    subservice_id: number;
  }[];
  message: string;
  status: number;
};

export type driverInfoApiResT = {
  data: {
    full_name: string;
    car_year_construction: number;
    car_plate: [string, string, string, string];
    car_brand: string;
    car_model: string;
    car_color: string;
    license_expiration_date: string;
    insurance_expiration_date: string;
    last_inspection_date: string;
  };
  status: number;
  message: string;
};

export type incompleteReceiptsApiResT = {
  data: {
    id: number;
    date: string;
    day: string;
    passenger_first_name: string;
    passenger_last_name: string;
    passenger_id: number;
    passenger_phone: string;
    out_of_town: number;
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
  }[];
  status: number;
  message: string;
};

export type completeReceiptsApiResT = {
  data: {
    id: number;
    date: string;
    day: string;
    start_time: string;
    end_time: string;
    passenger_first_name: string;
    passenger_last_name: string;
    passenger_id: number;
    passenger_phone: string;
    out_of_town: number;
    address: string;
    company: string;
  }[];
  status: number;
  message: string;
};

export type passengersListApiResT = {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    company: string;
    full_name:string
  }[];
  status: number;
  message: string;
};

export type gpsParamsApiResT = {
  data: {
    options: [
      {
        id: 19;
        key: "in-city-time-Server";
        value: "30";
      },
      {
        id: 20;
        key: "in-city-time-Mobile";
        value: "15";
      },
      {
        id: 21;
        key: "in-city-distance";
        value: "20";
      },
      {
        id: 22;
        key: "intercity-time-server";
        value: "120";
      },
      {
        id: 23;
        key: "intercity-time-Mobile";
        value: "60";
      },
      {
        id: 24;
        key: "intercity-distance";
        value: "100";
      },
      {
        id: 25;
        key: "Battery-warning-percentage";
        value: "10";
      },
      {
        id: 26;
        key: "url";
        value: "https://vesal.dev-vesal.ir/apks/driver_app_Debug.apk";
      },
      {
        id: 27;
        key: "app_version";
        value: "41";
      },
      {
        id: 33;
        key: "force_update";
        value: "1";
      },
      {
        id: 37;
        key: "inspection_link_url_to_send_driver";
        value: "https://www.skyroom.online/ch/vesalgashtroham/car-inspection";
      }
    ];
    car_plate: string[];
    license_expiration_date: null;
    insurance_expiration_date: null;
    last_inspection_date: null;
    license_expiration_msg: null;
    insurance_expiration_msg: null;
    inspection_expiration_msg: string;
    send_message: [
      {
        status_code: 200;
        success: boolean;
        msg: string;
      }
    ];
    driver_has_calender: boolean;
  };
  status: number;
};

export type calenderApiResT = {
  message: string;
  status: number;
  data: {
    services: {
      am: number;
      pm: number;
      day: string;
      date: string;
    }[];
    noon: boolean;
  };
};
