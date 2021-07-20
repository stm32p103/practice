export interface Image {
  width: number;
  height: number;
  buffer: ArrayBuffer;
}

export interface Loader {
  load( data: ArrayBuffer ): Promise<Image>;
}
