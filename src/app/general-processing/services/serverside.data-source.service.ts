import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import { Entity } from "../models/entity.model";
import { EventData } from "../models/event.model";
import { PaginationControls } from "../models/pagination-controls.model";
import { GPStateService } from "./g-p-state.service";



export class ServersideDataSource implements DataSource<EventData | Entity> {

    private lessonsSubject = new BehaviorSubject<any[]>([]);


    constructor(private gpStateService: GPStateService) { }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
    }

    loadData(paginationDetails: PaginationControls) {
        this.gpStateService.onClickNextPage(paginationDetails);
    }
}