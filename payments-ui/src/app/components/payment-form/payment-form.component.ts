import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LabelModule } from '@progress/kendo-angular-label';
import { Payment, CURRENCIES } from '../../models/payment.model';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonsModule,
    DialogModule,
    InputsModule,
    DropDownsModule,
    LabelModule,
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css',
})
export class PaymentFormComponent implements OnInit {
  @Input() payment: Payment | null = null;
  @Output() saved = new EventEmitter<Payment>();
  @Output() cancelled = new EventEmitter<void>();

  private paymentService = inject(PaymentService);

  currencies = [...CURRENCIES];
  amount: number = 0;
  currency: string = 'USD';
  saving = false;
  errorMessage = '';

  get isEdit(): boolean {
    return !!this.payment;
  }

  get title(): string {
    return this.isEdit ? 'Edit Payment' : 'Add Payment';
  }

  ngOnInit(): void {
    if (this.payment) {
      this.amount = this.payment.amount;
      this.currency = this.payment.currency;
    }
  }

  generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  onSave(): void {
    this.errorMessage = '';
    if (!this.amount || this.amount <= 0) {
      this.errorMessage = 'Amount must be greater than 0.';
      return;
    }
    if (!this.currency) {
      this.errorMessage = 'Please select a currency.';
      return;
    }

    this.saving = true;
    if (this.isEdit && this.payment) {
      this.paymentService
        .update(this.payment.id, { amount: this.amount, currency: this.currency })
        .subscribe({
          next: (result) => {
            this.saving = false;
            this.saved.emit(result);
          },
          error: () => {
            this.saving = false;
            this.errorMessage = 'Failed to update payment. Please try again.';
          },
        });
    } else {
      const clientRequestId = this.generateGuid();
      this.paymentService
        .create({ amount: this.amount, currency: this.currency, clientRequestId })
        .subscribe({
          next: (result) => {
            this.saving = false;
            this.saved.emit(result);
          },
          error: () => {
            this.saving = false;
            this.errorMessage = 'Failed to create payment. Please try again.';
          },
        });
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
