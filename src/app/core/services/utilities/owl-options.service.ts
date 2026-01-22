import { OwlOptions } from "ngx-owl-carousel-o";

export function getOwlOptions(options?: OwlOptions){
  return {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplaySpeed:1400,
    navText: ['', ''],
    responsive: options?.responsive ?options.responsive: {},
    items: options?.items ? options?.items:0,
    nav: true
  }
}
