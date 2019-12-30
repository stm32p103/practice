export module Const {
  export const FORMAT = /^S[0-3,5-9]([0-9,A-F]{2}){4,}$/;   // SRecordの形式(S0-3,5-9)の後HEXが4つ以上あること(最低でもバイトカウント+16bitアドレス+SUM)
  export const TYPE_POS = 1;                                // SRecordのレコードタイプの位置
  
  export const BYTECOUNT_POS = 2;                           // SRecordのバイトカウントの開始位置
  
  export const CHECKSUM_SIZE = 1;                           // SRecordのチェックサムのバイト数
  export const CHECKSUM_VALUE = 0xFF;                       // SRecordのチェックサムの期待値
  
  export const BYTE_LEN = 2;                                // Stringで1バイトを表す文字数
  export const BYTE_MASK = 0xFF;                            // Numberの下位1バイトを抽出するマスク
  export const BYTE_SHIFT = 8;                              // Numberを1バイト分シフトするビット数
  
  export const RADIX = 16;                                  // SRecordの基数
}
