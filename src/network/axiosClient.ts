import axios, { AxiosError, AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { storageKeys } from "./storageKeys";

class ApiClient {
  private baseUrl: string;
  private axiosClient: AxiosInstance;
  private axiosUploadClient: AxiosInstance;

  constructor() {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL!}/api`;
    const axiosClient = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const axiosUploadClient = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    axiosClient.interceptors.request.use(
      function(req: any) {
        const token = Cookies.get(storageKeys.token);
        if (token) {
          req.headers.authorization = `Bearer ${token}`;
        }
        return req;
      },
      function(err) {
        return Promise.reject(err);
      }
    );

    axiosUploadClient.interceptors.request.use(
      function(req: any) {
        const token = Cookies.get(storageKeys.token);

        if (token) {
          req.headers.authorization = `Bearer ${token}`;
        }
        return req;
      },
      function(err) {
        return Promise.reject(err);
      }
    );

    this.axiosClient = axiosClient;
    this.axiosUploadClient = axiosUploadClient;
    this.baseUrl = baseUrl;
  }

  async get<T>(resource: string, endpoint: string): Promise<T> {
    try {
      const response = await this.axiosClient.get(
        `${this.baseUrl}${resource}${endpoint}`
      );
      return response.data?.response?.data;
    } catch (error) {
      throw this.handleAxiosError(error as AxiosError);
    }
  }

  async put(
    resource: string,
    endpoint: string,
    data: any,
    setSuccess: any = null
  ) {
    try {
      const response = await this.axiosClient.put(
        `${this.baseUrl}${resource}${endpoint}`,
        data
      );

      if (setSuccess) {
        this.handleAxiosSuccess(response.data, setSuccess);
      }

      return response.data;
    } catch (error) {
      throw this.handleAxiosError(error as AxiosError);
    }
  }

  // Upload only
  async uploadOnly(
    resource: string,
    endpoint: string,
    data: any,
    setSuccess: any = null
  ) {
    try {
      const response = await this.axiosUploadClient.put(
        `${this.baseUrl}${resource}${endpoint}`,
        data
      );

      if (setSuccess) {
        this.handleAxiosSuccess(response.data, setSuccess);
      }

      return response.data;
    } catch (error) {
      throw this.handleAxiosError(error as AxiosError);
    }
  }

  async post(
    resource: string,
    endpoint: string,
    data: any,
    setSuccess: any = null
  ) {
    try {
      const response = await this.axiosClient.post(
        `${this.baseUrl}${resource}${endpoint}`,
        data
      );

      if (setSuccess) {
        this.handleAxiosSuccess(response.data, setSuccess);
      }

      return response.data;
    } catch (error) {
      throw this.handleAxiosError(error as AxiosError);
    }
  }

  async delete(resource: string, endpoint: string, setSuccess: any) {
    try {
      const response = await this.axiosClient.delete(
        `${this.baseUrl}${resource}${endpoint}`
      );

      if (setSuccess) {
        this.handleAxiosSuccess(response.data, setSuccess);
      }

      return response.data;
    } catch (error) {
      throw this.handleAxiosError(error as AxiosError);
    }
  }

  private handleAxiosError(error: AxiosError) {
    if (
      //@ts-ignore
      error.response?.data?.response?.meta?.message === "jwt expired" ||
      //@ts-ignore
      error.response?.data?.response?.meta?.message === "Invalid Token"
    ) {
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
      }, 500);
    }
  }

  private handleAxiosSuccess(data: any, setSuccess: any) {
    const successMessage = data?.meta?.message;

    setSuccess(() => ({
      successMessage: successMessage
        ? successMessage
        : "Action completed successfully",
      successOpenState: true,
    }));
  }
}

export default ApiClient;
