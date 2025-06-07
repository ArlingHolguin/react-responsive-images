export interface Img {
    format: string;
    src: string;
    width: number;
    height: number;
  }
  
  export interface ImageConfig {
    image: Img[];
    max?: number;
  }