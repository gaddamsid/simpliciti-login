import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { ActivatedRoute } from '@angular/router';
import { GPService } from 'src/app/general-processing/services/g-p.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { TranslateService } from '@ngx-translate/core';

export interface GalleryDetails {
  assetsLocation: string,
}

@Component({
  selector: 'app-gp-gallery',
  templateUrl: './gp-gallery.component.html',
  styleUrls: ['./gp-gallery.component.scss']
})
export class GpGalleryComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  eventId: any;
  galleryDetails!: GalleryDetails;
  constructor(private language: LanguageService,
    public translate: TranslateService, private route: ActivatedRoute, private gpService: GPService) { }


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const eventId = params['eventId'];
      this.getData(eventId);
    });

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

    // this.galleryImages = [
    //   {
    //     small: 'https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/MovingAssets/Assets6.jpg',
    //     medium: 'https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/MovingAssets/Assets6.jpg',
    //     big: 'https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/MovingAssets/Assets6.jpg'
    //   },
    //   {
    //     small: 'https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/MovingAssets/Assets7.jpg',
    //     medium: 'https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/MovingAssets/Assets7.jpg',
    //     big: 'https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/MovingAssets/Assets7.jpg'
    //   },
    //   {
    //     small: 'https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/MovingAssets/Assets8.jpg',
    //     medium: 'https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/MovingAssets/Assets8.jpg',
    //     big: 'https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/MovingAssets/Assets8.jpg'
    //   }, {
    //     small: 'https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/MovingAssets/Assets9.jpg',
    //     medium: 'https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/MovingAssets/Assets9.jpg',
    //     big: 'https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/MovingAssets/Assets9.jpg'
    //   },
    //   {
    //     small: 'https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/MovingAssets/Assets10.jpg',
    //     medium: 'https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/MovingAssets/Assets10.jpg',
    //     big: 'https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/MovingAssets/Assets10.jpg'
    //   },
    //   {
    //     small: 'https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/MovingAssets/Assets10.jpg',
    //     medium: 'https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/MovingAssets/Assets10.jpg',
    //     big: 'https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/MovingAssets/Assets10.jpg'
    //   },
    // ];
  }

  getData(eventId: any) {
    this.gpService.get(`getEventId/${eventId}`).subscribe((res => {
      if (res && res.eventImages && res.eventImages.galleryDetails) {
        this.galleryDetails = res.eventImages.galleryDetails;
      }
      let galleryAllImages: any;
      this.galleryImages = [{
        small: './assets/images/image-placeholder.png',
        medium: './assets/images/image-placeholder.png',
        big: './assets/images/image-placeholder.png',
      }];
      if (res?.eventImages?.assetsModel?.length > 0) {
        this.galleryImages = [];
      }
      res.eventImages?.assetsModel?.forEach((assetsModel: any) => {
        assetsModel.assetsLocation = assetsModel.assetsLocation;
        // assetsModel.assetsLocation = "https://i.picsum.photos/id/685/200/300.jpg?hmac=0R7Bu0AY8CbakSrvbQHtFb_swiFQbJqQe7bKpbV6viA";
        galleryAllImages = {
          small: assetsModel.assetsLocation ? assetsModel.assetsLocation
            : './assets/images/image-placeholder.png',
          medium: assetsModel.assetsLocation ? assetsModel.assetsLocation
            : './assets/images/image-placeholder.png',
          big: assetsModel.assetsLocation ? assetsModel.assetsLocation
            : './assets/images/image-placeholder.png',
        }
        this.galleryImages.push(galleryAllImages);
      });
    }));
  }


}
