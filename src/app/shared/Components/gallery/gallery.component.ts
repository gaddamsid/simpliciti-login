import { Component, OnInit } from '@angular/core';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  imageObject: Array<object> = [{
    image: 'assets/img/slider/1.jpg',
    thumbImage: 'assets/img/slider/1_min.jpeg',
    alt: 'alt of image',
    title: 'title of image'
}, {
    image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
    thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
    title: 'Image title', //Optional: You can use this key if want to show image with title
    alt: 'Image alt', //Optional: You can use this key if want to show image with alt
    order: 1 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
}
];
galleryOptions: NgxGalleryOptions[] = [];
galleryImages: NgxGalleryImage[] = [];
  constructor() { }

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'https://preview.ibb.co/jrsA6R/img12.jpg',
        medium: 'https://preview.ibb.co/jrsA6R/img12.jpg',
        big: 'https://preview.ibb.co/jrsA6R/img12.jpg'
      },
      {
        small: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
        medium: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
        big: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
      },
      {
        small: 'https://preview.ibb.co/mwsA6R/img7.jpg',
        medium: 'https://preview.ibb.co/mwsA6R/img7.jpg',
        big: 'https://preview.ibb.co/mwsA6R/img7.jpg'
      },{
        small: 'https://preview.ibb.co/kZGsLm/img8.jpg',
        medium: 'https://preview.ibb.co/kZGsLm/img8.jpg',
        big: 'https://preview.ibb.co/kZGsLm/img8.jpg'
      },  
      {
        small: 'https://preview.ibb.co/kZGsLm/img8.jpg',
        medium: 'https://preview.ibb.co/kZGsLm/img8.jpg',
        big: 'https://preview.ibb.co/kZGsLm/img8.jpg'
      },
      {
        small: 'https://preview.ibb.co/kZGsLm/img8.jpg',
        medium: 'https://preview.ibb.co/kZGsLm/img8.jpg',
        big: 'https://preview.ibb.co/kZGsLm/img8.jpg'
      },    
    ];
  }

}
