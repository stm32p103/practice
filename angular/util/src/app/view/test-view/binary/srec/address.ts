import { RecordType } from './type';

const ADDRESS_LEN_16 = 2;
const ADDRESS_LEN_24 = 3;
const ADDRESS_LEN_32 = 4;

/* ############################################################################
 * S0-S9それぞれのアドレス長(バイト)を返す関数
 * ######################################################################### */
export const getAddressSize = ( type: RecordType ): number => {
  let res;
  switch( type ) {
  case '0':
  case '1': 
  case '5':
  case '9':
    res = ADDRESS_LEN_16;
    break;
  case '2':
  case '8':
  case '6':
    res = ADDRESS_LEN_24;
    break;
  case '3':
  case '7':
    res = ADDRESS_LEN_32;
    break;
  default:
    throw new Error( 'Invalid record type.' );
  }
  return res;
}
