type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type RequestOption = {
    data?: any;
    header?: { [name:string]: string };
}

export class Request {
  method: Method;
  url: string;
  data?: any;
  header?: { [name:string]: string | string[] };
  
  private constructor( req: Partial<Request> ) {
      Object.assign( this, req );
  }
  
  static get( url: string, param: RequestOption = {} ) {
    return new Request( { method: 'GET', url: url, ...param } );
  }

  static post( url: string, param: RequestOption = {} ) {
    return new Request( { method: 'POST', url: url, ...param } );
  }

  static delete( url: string, param: RequestOption = {} ) {
    return new Request( { method: 'DELETE', url: url, ...param } );
  }

  static put( url: string, param: RequestOption = {} ) {
    return new Request( { method: 'PUT', url: url, ...param } );
  }
  
  static patch( url: string, param: RequestOption = {} ) {
    return new Request( { method: 'PATCH', url: url, ...param } );
  }
}
