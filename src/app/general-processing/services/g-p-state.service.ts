import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";
import { PaginationControls } from "../models/pagination-controls.model";
import { GPService } from "./g-p.service";

@Injectable({
    providedIn: 'any'
})

export class GPStateService {

    private paginationDetails: PaginationControls = { totalRecords: 0, pageSize: 10, currentPage: 0 };
    public formaData: any;
    private isAdvanceForm: boolean = false;
    private routeParam: number = 1;

    private onPaginationChange = new BehaviorSubject<PaginationControls>({ totalRecords: 0, pageSize: 10, currentPage: 0 });
    onPaginationChange$ = this.onPaginationChange.asObservable();

    private isLoading = new BehaviorSubject<boolean>(false);
    isLoading$ = this.isLoading.asObservable();

    private isShow = new BehaviorSubject<boolean>(false);
    isShow$ = this.isShow.asObservable();

    private isFormEnable = new BehaviorSubject<boolean>(false);
    isFormEnable$ = this.isFormEnable.asObservable();

    private searchResults = new BehaviorSubject<{ events: any[], entity: any[] }>({ events: [], entity: [] });
    searchResults$ = this.searchResults.asObservable();

    constructor(private gpService: GPService,
        private router: Router,
        public translate: TranslateService,
        private notificationService: ToastrService,) { }

    changePagination(event: PaginationControls) {
        this.paginationDetails = event;
        this.onPaginationChange.next(event);
    }

    clearSearchResults() {
        this.searchResults.next({ events: [], entity: [] });
    }

    onClickNextPage(paginationDetails: PaginationControls) {
        this.paginationDetails = paginationDetails;
        this.onPaginationChange.next(paginationDetails);
        this.isAdvanceForm ? this.onAdvanceSearch(this.formaData) : this.onSearch(this.formaData);
    }

    onSearch(request: any) {
        this.formaData = request;
        this.isAdvanceForm = false;
        this.isLoading.next(true);
        this.gpService.post('getEventEntityResponse', {
            citationNumber: request?.citationNumber ?? '',
            eventId: request?.eventId ? +request.eventId : 0,
            licenseNumber: request?.licenseNumber ?? '',
            name: request?.name ?? '',
            plateNumber: request?.plateNumber ?? '',
            zipCode: request?.zipCode ?? '',
            driverType: request?.driverType ? 2 : 1,
            pageNo: this.paginationDetails.currentPage ? this.paginationDetails.currentPage + 1 : 1,
            recordsPerPage: this.paginationDetails.pageSize
        }).subscribe(res => {
            this.routeParam += 1;
            this.isShow.next(false);
            this.isLoading.next(false);
            this.paginationDetails.totalRecords = res.metaData.totalRecordsCount;
            this.onPaginationChange.next(this.paginationDetails);
            this.searchResults.next(res);
            (request?.eventId && res?.events?.length == 1) || (res?.entity?.length == 1) ?
                ((request?.eventId && res?.events?.length == 1) ? this.router.navigateByUrl(`gp/event-details/${res.events[0].eventId}`)
                    : (res?.entity?.length == 1) ? (this.router.navigateByUrl(`gp/entity-details/entity/${res.entity[0].plateNumber}`))
                        : this.router.navigate([`gp/search/${this.routeParam}/${this.isAdvanceForm}/results`]))
                : this.router.navigate([`gp/search/${this.routeParam}/${this.isAdvanceForm}/results`]);
        }, (error: any) => {
            this.isLoading.next(false);
            for (var i = 0; i < error?.error?.details?.length; i++) {
                const msg = error.error.details[i].message;
                this.notificationService.error(this.translate.instant(error.error.details[i].message, { msg: msg }))
            }
        }, () => {
            this.isLoading.next(false);
        });
    }

    onAdvanceSearch(request: any) {
        this.formaData = request;
        this.isAdvanceForm = true;
        let isoDateFrom = '';
        let isoDateTo = '';
        this.isLoading.next(true);
        if (request.violationDateRangeFrom && request.violationDateRangeTo) {
            const dateFrom = new Date(request.violationDateRangeFrom);
            const dateStrFrom = dateFrom.getFullYear() + '-' + ('0' + (dateFrom.getMonth() + 1)).slice(-2) + '-' + ('0' + dateFrom.getDate()).slice(-2);
            isoDateFrom = dateStrFrom + 'T00:00:00.000Z';
            const dateTo = new Date(request.violationDateRangeTo);
            const dateStrTo = dateTo.getFullYear() + '-' + ('0' + (dateTo.getMonth() + 1)).slice(-2) + '-' + ('0' + dateTo.getDate()).slice(-2);
            isoDateTo = dateStrTo + 'T00:00:00.000Z';
        }
        const requestPayload = {
            workFlowQueuesId: request.workFlowQueuesId ? request.workFlowQueuesId : undefined,
            workflowStateId: request.workflowStateId ? request.workflowStateId : undefined,
            categoriesId: request.categoriesId ? request.categoriesId : undefined,
            locationsId: request.locationsId ? request.locationsId : undefined,
            deploymentId: request.deploymentId ? request.deploymentId : undefined,
            address: request.address ? request.address : undefined,
            city: request.city ? request.city : undefined,
            stateProvincesId: request.stateProvincesId ? request.stateProvincesId : undefined,
            approvingOfficerId: request.approvingOfficerId ? request.approvingOfficerId : undefined,
            lane: request.lane ? +request.lane : undefined,
            jurisdictionId: request.jurisdictionId ? request.jurisdictionId : undefined,
            batchId: request.batchId ? request.batchId : undefined,
            workFlowUserId: request.workFlowUserId ? request.workFlowUserId : undefined,
            paymentPlanId: request.paymentPlanId ? request.paymentPlanId : undefined,
            amberRangeFrom: (+request.amberRangeFrom >= 0 && !(request.amberRangeFrom == '')
                && !(request.amberRangeFrom == null)) ?
                String(request.amberRangeFrom) : undefined,
            amberRangeTo: (+request.amberRangeTo >= 0 && !(request.amberRangeTo == '')
                && !(request.amberRangeTo == null))
                ? String(request.amberRangeTo) : undefined,
            redRangeFrom: (+request.redRangeFrom >= 0 && !(request.redRangeFrom == '')
                && !(request.redRangeFrom == null))
                ? String(request.redRangeFrom) : undefined,
            redRangeTo: (+request.redRangeTo >= 0 && !(request.redRangeTo == '')
                && !(request.redRangeTo == null))
                ? String(request.redRangeTo) : undefined,
            speedRangeFrom: (+request.speedRangeFrom >= 0 && !(request.speedRangeFrom == '')
                && !(request.speedRangeFrom == null))
                ? String(request.speedRangeFrom) : undefined,
            speedRangeTo: (+request.speedRangeTo >= 0 && !(request.speedRangeTo == '')
                && !(request.speedRangeTo == null))
                ? String(request.speedRangeTo) : undefined,
            searchTicketLevel:
                (request.address || request.city
                    || request.stateProvincesId) ?
                    request.searchTicketLevel ? 2 : 1 : undefined,
            violationDateRangeFrom: request.violationDateRangeFrom ?
                isoDateFrom : undefined,
            violationDateRangeTo: request.violationDateRangeTo ?
                isoDateTo : undefined,
            pagingParameter: {
                pageSize: this.paginationDetails.pageSize,
                pageNumber: this.paginationDetails.currentPage ? this.paginationDetails.currentPage + 1 : 1,
            }
        }
        this.gpService.post('AdvanceSearch/getAdvanceSearchResult', requestPayload, true).subscribe(res => {
            this.routeParam += 1;
            this.isLoading.next(false);
            this.isShow.next(false);
            this.isFormEnable.next(true);
            const data = res;
            this.searchResults.next({ events: [], entity: [] });
            let entities: any[] = [];
            let events: any[] = [];
            this.paginationDetails.totalRecords = data ? data[0].metadata.totalCount : 0;
            this.onPaginationChange.next(this.paginationDetails);
            data.forEach((element: any) => {
                entities.push(element.entity);
                events.push(element.events);
            });
            this.searchResults.next({ events: events, entity: entities });
            (res?.entity?.length == 1 && res?.events?.length == 1) ?
                this.router.navigate([`gp/search/event-details/${res.events[0].eventId}`])
                : this.router.navigate([`gp/search/${this.routeParam}/${this.isAdvanceForm}/results`]);
        }, (error) => {
            this.isLoading.next(false);
            this.isShow.next(false);
            this.isFormEnable.next(true);
            for (var i = 0; i < error?.error?.details?.length; i++) {
                const msg = error.error.details[i].message;
                this.notificationService.error(this.translate.instant(error.error.details[i].message, { msg: msg }))
            }
        }, () => {
            this.isLoading.next(false);
            this.isShow.next(false);
            this.isFormEnable.next(true);
        });
    }
}