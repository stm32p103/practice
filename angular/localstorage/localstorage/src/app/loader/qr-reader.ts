
import jsQR from 'jsqr';
import { Image } from './types';

export class QrReader {
  read( img: Image ): Promise<string | null> {
    return new Promise( ( resolve, reject ) => {
      const arr = new Uint8ClampedArray( img.buffer );
      const qr = jsQR( arr, img.width, img.height );
  
      let res: string | null = null;
      if ( qr ) {
        res = qr.data;
      }

      resolve( res );
    } );
  }
}
