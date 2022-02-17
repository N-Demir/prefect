// disabling because axios uses any in its method declarations
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export abstract class Api {
  // todo: can this will need to be defined by the server itself
  // https://github.com/PrefectHQ/orion/issues/667
  protected server: string = 'http://127.0.0.1:4200'

  private _config: AxiosRequestConfig | null = null
  private _instance: AxiosInstance | null = null

  protected abstract route: string | (() => string)

  public constructor(config?: AxiosRequestConfig) {
    if (config) {
      this._config = config
    }
  }

  protected get instance(): AxiosInstance {
    if (this._instance) {
      return this._instance
    }

    return this._instance = axios.create(this.config)
  }

  protected get config(): AxiosRequestConfig {
    if (this._config) {
      return this._config
    }

    return this._config = {
      baseURL: this.server,
    }
  }

  protected request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.instance.request(config)
  }

  protected get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.get(this.withRoute(url), config)
  }

  protected delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.delete(this.withRoute(url), config)
  }

  protected head<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.head(this.withRoute(url), config)
  }

  protected options<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.options(this.withRoute(url), config)
  }

  protected post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.post(this.withRoute(url), data, config)
  }

  protected put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.put(this.withRoute(url), data, config)
  }

  protected patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.patch(this.withRoute(url), data, config)
  }

  private withRoute(url: string): string {
    const route = typeof this.route === 'function' ? this.route() : this.route

    return `${route}${url}`
  }

}
