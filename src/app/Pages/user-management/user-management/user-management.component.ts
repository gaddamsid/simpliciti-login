import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AspNetRoles, UserContracts, UserManagementModel } from 'src/app/Models/user-management.model';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { get } from 'lodash';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { FormControl, FormControlDirective, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { invalid } from 'moment';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('search') searchString!: ElementRef;

  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'email', 'lastLogin', 'internationalUsers', 'Action'];
  dataSource = new MatTableDataSource<UserManagementModel>();
  userList!: any;
  alertMsg: any;
  userManageForm!: FormGroup;
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  avUsers!: any;
  successMsg!: string;
  welcome: any;
  updatedUser: any;
  selectedContract!: any[];
  selectedRole!: any[];
  sysRoles: any;
  contractRoles: any;
  list: any;
  disableCopy: boolean = true;
  selectedCopyUser!: number;
  editingRecord: any;

  constructor(
    public translate: TranslateService,
    private language: LanguageService,
    private apiService: ApiService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService
  ) { }

  ngOnInit(): void {
    this.language.sendLang.subscribe(lang => {
      if (lang != "") {
        this.appendLang(lang);
      }
    });
    this.getUserList();
    this.getSystemRoles();
    this.getContracts();
    // Form Controls
    this.userManageForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'avUser': new FormControl(),
      'fname': new FormControl(null, [Validators.required]),
      'lname': new FormControl(null, [Validators.required]),
      'intUserCheck': new FormControl(false),
      'contracts': new FormControl(null, [Validators.required]),
      'sysRoles': new FormControl(null, [Validators.required]),
    });

  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  appendLang(lang: string) {
    this.translate.use(lang);
    this.setPagelabel(lang);
  }

  setPagelabel(lang: any) {
    const msg = "";
    this.translate.use(lang).toPromise();
    this.translate
      .use(lang)
      .subscribe(res => {
        this.dataSource.paginator = this.paginator;
        this.alertMsg = this.translate.instant("Items per page", { msg: msg });
        // this.dataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  filterData() {
    let monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      let date = new Date(data.lastLogin);
      let loginDate = monthNames[date.getMonth()].substring(0, 3) + " " + date.getDate() + ", " + date.getFullYear() +
        ", " + date.getHours() + ":" + date.getMinutes();

      return data.userName.toLowerCase().includes(filter) || data.firstName.toLowerCase().includes(filter) ||
        data.lastName.toLowerCase().includes(filter) || data.email.toLowerCase().includes(filter) ||
        loginDate.toLowerCase().includes(filter) || data.internationalUsers.toString().includes(filter);
    };
  }

  // To cancel add
  cancelAdd_Save() {
    this.userManageForm.reset({ intUserCheck: false });
    this.searchString.nativeElement.value = ""
    this.showAddForm = false;
    this.showEditForm = false;
    this.getUserList();
    this.paginator.pageIndex = 0;
    this.userManageForm.controls['contracts'].enable();
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }

  // To show Add User Page
  showAddFormPage() {
    this.selectedContract = [];
    this.showAddForm = true;
    this.disableCopy = true;
  }

  // To get system roles
  getSystemRoles() {
    this.apiService.get('AspNetRoles/getContractRoles', true).subscribe(res => {
      this.sysRoles = res;
    });
  }

  // To get contracts
  getContracts() {
    this.apiService.get('ClientContracts/getAllContracts', true).subscribe(res => {
      if (res) {
        this.contractRoles = res;
      }
    });
  }

  // To get User List
  getUserList() {
    this.apiService.get('User/getAllUsers', true).subscribe(res => {
      this.userList = res;
      if (res) {
        this.dataSource = new MatTableDataSource<UserManagementModel>(
          res.reverse()
        );
        this.filterData();
        if (this.sort != undefined) {
          this.dataSource.sort = this.sort;
          this.sort.disableClear = true;
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
          if (typeof data[sortHeaderId] === 'string') {
            return data[sortHeaderId].toLocaleLowerCase();
          }
          return data[sortHeaderId];

        };
      }
    });
  }

  // To select contract and add input fields // currently not been used but may be in future it is required
  selectContract(event: any) {
    // this.selectedContract = [];
    // for (let i = 0; i < event.length; i++) {
    //   this.selectedContract[i] = event[i];
    // }
  }

  // to select system roles
  sysRoleSelect(event: any) {
    this.selectedRole.push(event[0].rolesId);
    
  }

  // to select available users
  avUserSelect(event: any) {
    const result = this.userList.filter((element: { email: any; }) => {
      return element.email === event.value;
    });
    // To set the value
    this.userManageForm.controls['avUser'].setValue(result[0].email);
    this.disableCopy = false;
    this.selectedCopyUser = result[0].id;
  }

  getAvUserRole(event: any) {
    this.apiService.get('User/getUserAndRolesById?UserId=' + event, true).subscribe(resp => {
      if (resp) {
        const roles = resp.aspNetRoles.map((roles:AspNetRoles)=> roles.roleId);
        const contracts = resp.userContracts.map((contracts:UserContracts)=> contracts.contractId);
        this.userManageForm.controls['sysRoles'].setValue(roles);
        this.userManageForm.controls['contracts'].setValue(contracts);

      }
    });
  }

  // To add Users
  addUser(formData: any) {
    this.userManageForm.markAllAsTouched();
    this.sort.sort(
      { id: '', start: 'asc', disableClear: false }
    )
    if (this.userManageForm.valid) {
      const userObj = {
        createUserID: 0,
        updateUserID: 0,
        createDatetime: new Date().toISOString(),
        updateDatetime: new Date().toISOString(),
        isDeleted: "N",
        id: 0,
        accessFailedCount: 1,
        concurrencyStamp: null,
        email: formData.email,
        emailConfirmed: true,
        lockoutEnabled: true,
        lockoutEnd: new Date().toISOString(),
        normalizedEmail: null,
        normalizedUserName: null,
        passwordHash: null,
        phoneNumber: null,
        phoneNumberConfirmed: true,
        securityStamp: null,
        twoFactorEnabled: true,
        userName: "",
        resetPassword: true,
        firstName: formData.fname.trim(),
        lastLogin: new Date().toISOString(),
        lastName: formData.lname.trim(),
        userEnabled: true,
        secondaryEmail: null,
        resetQuestions: true,
        lastPasswordChangeDate: new Date().toISOString(),
        passwordExpired: true,
        domainId: 1,
        officerBadgeNumber: null,
        typedSignature: null,
        officerRank: null,
        internationalUsers: formData.intUserCheck,
        // to be added
        // availableUsers: formData.avUser,
      }
      let roleObj:AspNetRoles[] = [];
      roleObj=formData.sysRoles.map((roleId:number)=> {
        return new AspNetRoles({roleId:roleId})
      })
      let contractsIDs:UserContracts[]=[];
      contractsIDs = formData.contracts.map((contract:number)=> {
        return new UserContracts({contractId:contract})
      })

      const obj = {
        userModel: {
          aspNetUserModel: userObj,
          aspNetRoles: roleObj,
          userContracts:contractsIDs
        }
      }
      this.apiService.post('User/addNewUserAndRoles', obj, true).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant(res.details[0].code, { msg: msg });
          this.notificationService.success(this.successMsg);
          this.searchString.nativeElement.value = ""
          this.userManageForm.reset({ intUserCheck: false });
          this.paginator.pageIndex = 0;
          this.getUserList();
          this.showAddForm = false;
          this.userManageForm.controls['contracts'].enable();
        }
      }, error => {
        this.errorResponseCheck(error);
      });
    }
  }

  // To bind the value to the input fields
  editIconClicked(Id: number) {
    this.showEditForm = true;
    this.updatedUser = Id;
    this.disableCopy = true;
    this.apiService.get('User/getUserAndRolesById?UserId=' + Id, true).subscribe(resp => {
      this.editingRecord = resp;
      this.userManageForm.controls['email'].setValue(resp.aspNetUserModel.email);
      this.userManageForm.controls['fname'].setValue(resp.aspNetUserModel.firstName);
      this.userManageForm.controls['lname'].setValue(resp.aspNetUserModel.lastName);
      this.userManageForm.controls['intUserCheck'].setValue(resp.aspNetUserModel.internationalUsers);
      if(resp.aspNetRoles.length){
        const rolesList = resp.aspNetRoles.map((element:AspNetRoles) => element.roleId);
        this.userManageForm.controls['sysRoles'].setValue(rolesList);
      } else this.userManageForm.controls['sysRoles'].setValue(null);
      if(resp.userContracts.length){
        const contractsList = resp.userContracts.map((element:UserContracts) => element.contractId);
        this.userManageForm.controls['contracts'].setValue(contractsList);
      } else this.userManageForm.controls['contracts'].setValue(null);
      
    });

    // // To set Available Users value
    // const avUsers = this.userList.filter((element: { email: any; }) => {
    //   return element.email === this.updatedUser.availableUsers;
    // });
    // this.userManageForm.controls['avUser'].setValue(avUsers[0].email);

    // // To set System Roles value
    // const roles = this.sysRoles.filter((element: { rolesId: any; }) => {
    //   return element.rolesId === this.updatedUser.systemRoles;
    // });
    // this.userManageForm.controls['sysRoles'].setValue(roles[0].rolesId);

  }

  // To Update and Save data
  updateUserRole(formData: any) {
    this.userManageForm.markAllAsTouched();
    if (this.userManageForm.valid) {
        this.editingRecord.aspNetUserModel.updateDatetime = new Date().toISOString();
        this.editingRecord.aspNetUserModel.email = formData.email;
        //userName: formData.fname.trim() + formData.lname.trim().substring(0; 1);
        this.editingRecord.aspNetUserModel.lastName = formData.lname;
        this.editingRecord.aspNetUserModel.firstName = formData.fname.trim();
        this.editingRecord.aspNetUserModel.lastLogin = new Date().toISOString();
        this.editingRecord.aspNetUserModel.email = formData.email;
        this.editingRecord.aspNetUserModel.internationalUsers= formData.intUserCheck;
        // to be added
        // availableUsers: formData.avUser
        let roleObj:AspNetRoles[] = [];
      roleObj=formData.sysRoles.map((roleId:number)=> {
        return new AspNetRoles({roleId:roleId, userId:this.updatedUser})
      })
      let contractsIDs:UserContracts[]=[];
      contractsIDs = formData.contracts.map((contract:number)=> {
        return new UserContracts({contractId:contract, userId:this.updatedUser})
      })
      this.editingRecord.userContracts = contractsIDs;
      this.editingRecord.aspNetRoles = roleObj;
      this.apiService.put('User/updateUserAndRoles', {userModel:this.editingRecord}, true).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.searchString.nativeElement.value = ""
          this.userManageForm.reset({ intUserCheck: false });
          this.getUserList();
          this.showAddForm = false;
          this.showEditForm = false;
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    } 
  }

  // To enable/disable user
  toggleAgency(id: number, status: boolean) {
    let Id = {
      id: id
    }
    const msgs = "";
    if (!status) {
      if (confirm(this.translate.instant("Are you sure you want to Disable the User", { msg: msgs }))) {
        this.apiService.put('User/updateUserStatus', Id, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            this.successMsg = this.translate.instant("User Disabled Successfully", { msg: msg });
            this.notificationService.success(this.successMsg);
            this.getUserList();
          }
        })

      }
    } else {
      if (confirm(this.translate.instant("Are you sure you want to Enable the User", { msg: msgs }))) {
        this.apiService.put('User/updateUserStatus', Id, true).subscribe(res => {
          if (res.status === "Success") {
            const msg = "";
            this.successMsg = this.translate.instant("User Enabled Successfully", { msg: msg });
            this.notificationService.success(this.successMsg);
            this.getUserList();
          }
        })
      }
    }
  }

  // ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//

  errorResponseCheck(error: any) {
    for (var i = 0; i < error.error.details.length; i++) {
      if (error.error.details[i].code == "5000" && error.error.details[i].message != "Duplicate Record") {
        const msg = "";
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.userManageForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "Duplicate Record" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant("Duplicate Record Found", { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.userManageForm.get("email")?.setErrors({ invalid: "Duplicate Record Found" });
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }

}
