import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IOrcaRequest } from './request.interface';

export class OrcaRequest implements IOrcaRequest {
    private readonly baseUrl: string;
  
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
  
    async get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
      return axios.get<T, R>(`${this.baseUrl}${url}`, config);
    }
  
    async post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
      return axios.post<T, R>(`${this.baseUrl}${url}`, data, config);
    }
  }
  
