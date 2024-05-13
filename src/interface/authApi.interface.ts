export type loginApiSendT = {
  phone: string;
  password: string;
  captcha:string
};

export type forgotPasswordApiSendT = {
  phone: string;
  captcha: string;
};

export type loginApiResT = {
  data: {
    token: string;
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    group_name: string;
    role: string;
    has_service_request: number;
    company_name:string
  };
  mesasge: string;
  status: number;
};

export type forgotPasswordResT = {
  data: {
    token: string;
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    group_name: null;
    role: string;
    has_service_request: number;
  };
  message: string;
  status: number;
};

export type chatTokenResT = {
  data: {
    token: string;
  };
  message: string;
  status: number;
};