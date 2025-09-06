import keys from '../../keys.development.json';

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface ApiError {
  message: string;
  status?: number;
  statusText?: string;
  data?: any;
}

export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  params?: Record<string, string | number | boolean>;
}

export interface ClientConfig {
  baseURL: string;
  timeout: number;
  defaultHeaders: Record<string, string>;
  apiKey?: string;
  accessToken?: string;
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

class ClientNetwork {
  private config: ClientConfig;

  constructor(config?: Partial<ClientConfig>) {
    this.config = {
      baseURL: keys.public.BASE_URL || 'https://api.themoviedb.org/3',
      timeout: 10000,
      defaultHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      apiKey: keys.secure.API_KEY,
      accessToken: keys.secure.ACCESS_TOKEN,
      ...config,
    };

    if (this.config.accessToken) {
      this.config.defaultHeaders.Authorization = `Bearer ${this.config.accessToken}`;
    }
  }

  private buildQueryString(
    params?: Record<string, string | number | boolean>,
  ): string {
    if (!params) return '';

    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, String(value));
    });

    const queryString = queryParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  private buildUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean>,
  ): string {
    const baseUrl = this.config.baseURL.endsWith('/')
      ? this.config.baseURL.slice(0, -1)
      : this.config.baseURL;

    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const queryString = this.buildQueryString(params);

    return `${baseUrl}${cleanEndpoint}${queryString}`;
  }

  private mergeHeaders(
    customHeaders?: Record<string, string>,
  ): Record<string, string> {
    return {
      ...this.config.defaultHeaders,
      ...customHeaders,
    };
  }

  private createAbortController(timeout: number): AbortController {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    return controller;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    let data: T;
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      data = await response.json();
    } else if (contentType.includes('text/')) {
      data = (await response.text()) as unknown as T;
    } else {
      data = (await response.blob()) as unknown as T;
    }

    if (!response.ok) {
      const error: ApiError = {
        message: `HTTP ${response.status}: ${response.statusText}`,
        status: response.status,
        statusText: response.statusText,
        data,
      };
      throw error;
    }

    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers,
    };
  }

  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint, config?.params);
      const headers = this.mergeHeaders(config?.headers);
      const timeout = config?.timeout || this.config.timeout;
      const controller = this.createAbortController(timeout);

      const fetchOptions: RequestInit = {
        method,
        headers,
        signal: controller.signal,
      };

      if (
        data &&
        [HttpMethod.POST, HttpMethod.PUT, HttpMethod.PATCH].includes(method)
      ) {
        if (typeof data === 'object' && !(data instanceof FormData)) {
          fetchOptions.body = JSON.stringify(data);
        } else {
          fetchOptions.body = data;
        }
      }

      console.log(`🌐 ${method} ${url}`);
      if (data) {
        console.log('📤 Request data:', data);
      }

      const response = await fetch(url, fetchOptions);
      const result = await this.handleResponse<T>(response);

      console.log(`✅ ${method} ${url} - ${result.status}`);
      console.log('📥 Response data:', result.data);

      return result;
    } catch (error) {
      console.error(`❌ ${method} ${endpoint} failed:`, error);

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw {
            message: 'Request timeout',
            status: 408,
            statusText: 'Request Timeout',
          } as ApiError;
        }

        throw {
          message: error.message,
          data: error,
        } as ApiError;
      }

      throw error;
    }
  }

  async get<T = any>(
    endpoint: string,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(HttpMethod.GET, endpoint, undefined, config);
  }

  async post<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(HttpMethod.POST, endpoint, data, config);
  }

  async put<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(HttpMethod.PUT, endpoint, data, config);
  }

  async delete<T = any>(
    endpoint: string,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(HttpMethod.DELETE, endpoint, undefined, config);
  }

  async patch<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(HttpMethod.PATCH, endpoint, data, config);
  }

  updateConfig(newConfig: Partial<ClientConfig>): void {
    this.config = { ...this.config, ...newConfig };

    if (newConfig.accessToken) {
      this.config.defaultHeaders.Authorization = `Bearer ${newConfig.accessToken}`;
    }
  }

  getConfig(): ClientConfig {
    return { ...this.config };
  }

  addRequestInterceptor(
    _interceptor: (config: RequestConfig) => RequestConfig,
  ): void {
    console.log('Request interceptor added');
  }

  addResponseInterceptor<T>(
    _interceptor: (response: ApiResponse<T>) => ApiResponse<T>,
  ): void {
    console.log('Response interceptor added');
  }
}

const clientNetwork = new ClientNetwork();

export default clientNetwork;
export { ClientNetwork };
