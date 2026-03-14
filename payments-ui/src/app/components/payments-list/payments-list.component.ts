import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule, ColumnComponent } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { Payment } from '../../models/payment.model';
import { PaymentService } from '../../services/payment.service';
import { PaymentFormComponent } from '../payment-form/payment-form.component';

@Component({
  selector: 'app-payments-list',
  standalone: true,
  imports: [
    CommonModule,
    GridModule,
    ButtonsModule,
    PaymentFormComponent,
  ],
  templateUrl: './payments-list.component.html',
  styleUrl: './payments-list.component.css',
})
export class PaymentsListComponent implements OnInit {
  private paymentService = inject(PaymentService);

  payments: Payment[] = [];
  loading = true;
  showForm = false;
  selectedPayment: Payment | null = null;

  // toast
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  toastTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.loading = true;
    this.paymentService.getAll().subscribe({
      next: (data) => {
        this.payments = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showToast('Failed to load payments. Is the API running?', 'error');
      },
    });
  }

  openAdd(): void {
    this.selectedPayment = null;
    this.showForm = true;
  }

  openEdit(payment: Payment): void {
    this.selectedPayment = payment;
    this.showForm = true;
  }

  onSaved(payment: Payment): void {
    this.showForm = false;
    const idx = this.payments.findIndex((p) => p.id === payment.id);
    if (idx >= 0) {
      this.payments = this.payments.map((p) => (p.id === payment.id ? payment : p));
      this.showToast(`Payment ${payment.reference} updated successfully.`, 'success');
    } else {
      this.payments = [payment, ...this.payments];
      this.showToast(`Payment ${payment.reference} created successfully.`, 'success');
    }
  }

  onCancelled(): void {
    this.showForm = false;
  }

  confirmDelete(payment: Payment): void {
    if (!confirm(`Delete payment ${payment.reference}? This cannot be undone.`)) return;
    this.paymentService.delete(payment.id).subscribe({
      next: () => {
        this.payments = this.payments.filter((p) => p.id !== payment.id);
        this.showToast(`Payment ${payment.reference} deleted.`, 'success');
      },
      error: () => {
        this.showToast('Failed to delete payment.', 'error');
      },
    });
  }

  formatAmount(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  }

  getCurrencyClass(currency: string): string {
    const map: Record<string, string> = {
      USD: 'badge-usd', EUR: 'badge-eur', INR: 'badge-inr', GBP: 'badge-gbp',
    };
    return map[currency] ?? 'badge-default';
  }

  showToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (this.toastMessage = ''), 4000);
  }
}
