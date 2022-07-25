import { Component, ElementRef, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PaymentCartService } from 'src/app/shared/services/payment-cart.service';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Component({
  selector: 'app-payment-cart-confirmation',
  templateUrl: './payment-cart-confirmation.component.html',
  styleUrls: ['./payment-cart-confirmation.component.scss']
})
export class PaymentCartConfirmationComponent implements OnInit {

  paymentDetails: {
    plateDetails: any[],
    ticketDetails: any[],
    feeDetails: any[], totalAmount: number,
    paymentMethod1: string,
    paymentMethod1Amount: number,
    paymentMethod2: string,
    paymentMethod2Amount: number,
    transactionNumber: string,
    receiptNumber: string;
  } = {
      plateDetails: [],
      ticketDetails: [], feeDetails: [], totalAmount: 0,
      paymentMethod1: '',
      paymentMethod1Amount: 0,
      paymentMethod2: '',
      paymentMethod2Amount: 0,
      transactionNumber: 'XXXX-XX-XXXX',
      receiptNumber: 'XXXX-XX-XXXX'
    };
  public canvasImage!: any[];

  constructor(private paymentCartService: PaymentCartService,
    private elementRef: ElementRef,
    public translate: TranslateService,) {
    this.canvasImage = [];
  }

  ngOnInit(): void {
    this.paymentCartService.cartItemsList$.subscribe(s => {
      this.paymentDetails = s;
    });
  }

  public downloadAsPDF(): void {
    window.scrollTo(0, 0);
    var target = this.elementRef.nativeElement.querySelector("#paymentCart");
    var promise = html2canvas(target, {
      logging: false, allowTaint: true,
      useCORS: true, onclone: (doc) => {
        doc.querySelector("#paymentCart")!.classList.add("html2canvas");
      }
    });
    promise.then((canvas) => {
      this.canvasImage.unshift({
        id: Date.now(),
        url: canvas.toDataURL()
      });
      var imgWidth = 208;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("payment-details-export.pdf"); // Generated PDF
    }).catch(
      (error) => {
        console.warn("An error occurred.");
        console.error(error);
      });
  }
}
