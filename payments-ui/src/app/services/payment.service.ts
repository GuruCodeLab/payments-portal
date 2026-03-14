import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment, CreatePaymentRequest, UpdatePaymentRequest } from '../models/payment.model';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:5000/api/payments';

  getAll(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.baseUrl);
  }

  create(req: CreatePaymentRequest): Observable<Payment> {
    return this.http.post<Payment>(this.baseUrl, req);
  }

  update(id: string, req: UpdatePaymentRequest): Observable<Payment> {
    return this.http.put<Payment>(`${this.baseUrl}/${id}`, req);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
