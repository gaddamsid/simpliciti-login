import { Injectable } from '@angular/core';
import { Observable, Subject,BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
    private subject = new Subject<any>();
    public subjectLatout = new BehaviorSubject([]);
    public subjectPlateNo = new BehaviorSubject([]);
    public subjectEventEntity = new BehaviorSubject([]);
    
    sendMessage(message: any) {
        this.subject.next(message);
    }

    clearMessages() {
        this.subject.next(null);
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    setUpdatedLayout(message: any) {
        this.subjectLatout.next(message);
    }
    getUpdatedLayout(): Observable<any> {
        return this.subjectLatout.asObservable();
    }

    setAllEventEntityData(message: any) {
        this.subjectEventEntity.next(message);
    }
    getAllEventEntityData(): Observable<any> {
        return this.subjectEventEntity.asObservable();
    }
    
    sendPlateNo(message: any) {
        this.subjectPlateNo.next(message);
    }

    getPlateNo(): Observable<any> {
        return this.subjectPlateNo.asObservable();
    }
}