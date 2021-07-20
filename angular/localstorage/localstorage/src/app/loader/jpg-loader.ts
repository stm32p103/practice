import { decode } from 'jpeg-js';
import { Image, Loader } from './types'

export class JpgLoader implements Loader {
  async load( raw: ArrayBuffer ): Promise<Image> {
    return new Promise( ( resolve, reject ) => {
      try {
        const img = decode( raw );
        const res: Image = {
          width: img.width,
          height: img.height,
          buffer: img.data
        };
        resolve( res );
      } catch ( err ) {
        reject( err );
      }
    } );
  } 
}
