import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';
import { AssetMappingModel } from 'src/app/Models/assetMapping.Model';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AssetMappingsService } from 'src/app/Services/AssetMappings/asset-mappings.service';
import { ToastrService } from 'ngx-toastr';
import { LiveAnnouncer } from '@angular/cdk/a11y';
@Component({
  selector: 'app-asset-setting',
  templateUrl: './asset-setting.component.html',
  styleUrls: ['./asset-setting.component.scss']
})
export class AssetSettingComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  assetTypes!: AssetMappingModel[];
  assetForm: FormGroup;
  assetMapped!: AssetMappingModel[];
  assetToBeMapped!: AssetMappingModel[];
  savedSettings!: AssetMappingModel[];
  successMsg: any;
  dataSuffled: boolean = false;

  constructor(public translate: TranslateService,
    private headerSection: LanguageService,
    private formBuilder: FormBuilder,
    private mappingService: AssetMappingsService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService,) {
    this.assetForm = this.formBuilder.group({
      assets: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.getAssetMappings();
    this.headerSection.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
  }

  appendLang(lang: string) {
    this.translate.use(lang);

  }

  drop(event: CdkDragDrop<AssetMappingModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.dataSuffled = true;
    this.sortAssetToBeMapped(this.assetToBeMapped);
  }

  getAssetMappings() {
    this.mappingService.getAssetTypes().subscribe(res => {
      this.assetTypes = res;
      this.assetMapped = this.assetTypes.filter(item => item.isSelected ? item : null)
      this.assetToBeMapped = this.assetTypes.filter(item => !item.isSelected ? item : null)
      this.sortAssetToBeMapped(this.assetToBeMapped)
    })
  }
  sortAssetToBeMapped(assetsArray: AssetMappingModel[]) {
    assetsArray = assetsArray.sort(function (a, b) {
      return a.assetTypesName.localeCompare(b.assetTypesName, undefined, {
        numeric: true,
        sensitivity: 'base'
      });
    })
  }
  saveSettings() {
    if (this.dataSuffled) {
      if (this.assetMapped.length) 
      {
        const msgs = "";
        this.assetMapped.forEach((asset, index) => {
          asset.ordinalPosition = index + 1;
          asset.isSelected = true;
        })
        if (confirm(this.translate.instant("Are You Sure You Want To Configure The Asset Order?", { msg: msgs }))) {
          this.mappingService.updateAssetTypes({ assetTypesMappingOrders: this.assetMapped }).subscribe(res => {
            if (res.status == "Success") 
            {
              const msg = "";
              this.successMsg = this.translate.instant(res.details[0].code + '_' + res.details[0].message, { msg: msg });
              this.getAssetMappings();
              this.dataSuffled = false;
              this.notificationService.success(this.successMsg);
            }
          })
        }
      } else {
        const msgs = "";
        this.notificationService.warning(this.translate.instant("The Asset Is Not Configured, Kindly Add", { msg: msgs }));
      }
    } else {
      const msgs = "";
      this.notificationService.success(this.translate.instant("Asset Order Saved Successfully", { msg: msgs }));
    }
  }

}
