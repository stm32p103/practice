type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type RequestOption = {
    data?: any;
    header?: { [name:string]: string };
}

export class Request {
    method: Method;
    url: string;
    data?: any;
    
    constructor( req: Partial<Request> ) {
        Object.assign( this, req );
    }
    
    private static create( method: Method, url: string, option: RequestOption ) {
        let src = Object.assign( { 
            method: method,
            url: url
        }, option );

        return new Request( src );
    }
    
    static get( url: string, param: RequestOption = {} ) {
        return Request.create( 'GET' as Method, url, param );
    }

    static post( url: string, param: RequestOption = {} ) {
        return Request.create( 'POST' as Method, url, param );
    }

    static delete( url: string, param: RequestOption = {} ) {
        return Request.create( 'DELETE' as Method, url, param );
    }

    static put( url: string, param: RequestOption = {} ) {
        return Request.create( 'PUT' as Method, url, param );
    }
    
    static patch( url: string, param: RequestOption = {} ) {
        return Request.create( 'PATCH' as Method, url, param );
    }
    
    attatchData( data: any ) {
        this.data = data;
    }
}
