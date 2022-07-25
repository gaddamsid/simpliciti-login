import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AssetMappingModel } from 'src/app/Models/assetMapping.Model';
import { AssetMappingsService } from 'src/app/Services/AssetMappings/asset-mappings.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';

@Component({
  selector: 'app-asset-mapping',
  templateUrl: './asset-mapping.component.html',
  styleUrls: ['./asset-mapping.component.scss']
})
export class AssetMappingComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  assetTypes!: AssetMappingModel[];
  alertMsg!: string;
  assetForm!: FormGroup;
  get mappingFormArray() {
    return this.assetForm.controls['assets'] as FormArray;
  }

  constructor(public translate: TranslateService,
    private headerSection: LanguageService,
    private formBuilder: FormBuilder,
    private mappingService: AssetMappingsService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService : ToastrService,) {
      this.assetForm = this.formBuilder.group({
        assets: new FormArray([])
      });
      this.addCheckboxesToForm();
    }
    
    private addCheckboxesToForm() {
      this.assetTypes.forEach(() => this.mappingFormArray.push(new FormControl(false)));
    }
    
    submit() {
      const selectedOrderIds = this.assetForm.value.assets
        .map((checked: boolean, i:number) => checked ? this.assetTypes[i].assetTypesName : null)
        .filter((v: any) => v !== null);
      console.log(selectedOrderIds);
    }
  ngOnInit(): void {
    this. getAssetTypes();
    this.addCheckboxesToForm();
    this.headerSection.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
  }

  appendLang(lang: string) {
    this.translate.use(lang);
    
  }
  getAssetTypes() {
    this.mappingService.getAssetTypes().subscribe(res => {
      this.assetTypes = res;
      console.log(this.assetTypes)
    })
  }

}
