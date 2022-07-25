import { Observable, of } from "rxjs"





export class PaymentCartServiceStub
{
    obj = {
        accountEntityId: '',
        chargeType: '',
        dueAmount: 50,
        feeAmount: 100,
        feeName: 'TestName',
        paidAmount: 50,
        payment: '',
        shoppingCartItemsId: '',
        statePlate: '',
        violationAccountChargesId: ''
    }

    getObj() : any {
        return this.obj;
    }

    onChangeCartItems() : Observable<any> 
    {
        return of('');
    }
    
    updateCartItemsList() : Observable<any>
    {
        return of('');
    }
}