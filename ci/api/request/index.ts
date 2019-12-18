/* ------------------------------------------------------------------------
 * クエリパラメータを文字列にする
 * --------------------------------------------------------------------- */
export type QueryObject = { [key: string]: string };


export function queryToString( query: QueryObject = {} ) {
  let tmp = '';
  const keys = Object.keys( query );
  
  if( keys.length > 0 ) {
    tmp = '?' + keys.map( key => {
    const rhs = query[ key ];
    let res = '';
    
    if( rhs !== undefined ) {
      res = key + '=' + query[ key ];
    }
    
      return res;
    } ).join( '&' );
  }
  return tmp;
}

export type RequestOption = {
    data?: any;
    header?: { [name:string]: string | string[]  };
}

export interface RestAPI {
  get( url: string, option?: RequestOption ): Promise<any>;
  post( url: string, option?: RequestOption ): Promise<any>;
  delete( url: string, option?: RequestOption ): Promise<any>;
  put( url: string, option?: RequestOption ): Promise<any>;
  patch( url: string, option?: RequestOption ): Promise<any>;
}
