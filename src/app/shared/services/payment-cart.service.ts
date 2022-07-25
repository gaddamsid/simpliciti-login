import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";



Injectable({
    providedIn: 'root'
})

export class PaymentCartService {

    cartItems = new BehaviorSubject<number>(0);
    cartItems$ = this.cartItems.asObservable();

    navigationFrom = new BehaviorSubject<string>('');
    navigationFrom$ = this.cartItems.asObservable();

    cartItemsList = new BehaviorSubject<any>({
        plateDetails: [],
        ticketDetails: [], feeDetails: [], totalAmount: 0,
        paymentMethod1: '',
        paymentMethod1Amount: 0,
        paymentMethod2: '',
        paymentMethod2Amount: 0,
        transactionNumber: 'XXXX-XX-XXXX',
        receiptNumber: 'XXXX-XX-XXXX'
    });
    cartItemsList$ = this.cartItemsList.asObservable();

    updateNavigationFrom(data: any) {
        this.navigationFrom.next(data);
    }

    onChangeCartItems(items: number) {
        this.cartItems.next(items);
    }

    updateCartItemsList(data: any) {
        this.cartItemsList.next(data);
    }
}