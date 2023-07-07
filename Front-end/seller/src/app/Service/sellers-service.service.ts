import { Injectable } from '@angular/core';
import { Seller } from '../Interface/Seller';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SellersServiceService {

  constructor(private http: HttpClient) { }

  getSellers(): Observable<Seller[]> {
    return this.http.get<Seller[]>("http://localhost:8080/seller");
  }

  getSeller(id: number): Observable<Seller> {
    return this.http.get<Seller>(`http://localhost:8080/seller/${id}`);
  }

  createSeller(seller: Seller): Observable<Seller> {
    return this.http.post<Seller>("http://localhost:8080/seller", seller);
  }

  updateSeller(seller: Seller): Observable<Seller> {
    return this.http.put<Seller>(`http://localhost:8080/seller/${seller.id}`, seller);
  }

  deleteSeller(id: number): Observable<Seller> {
    return this.http.delete<Seller>(`http://localhost:8080/seller/${id}`);
  }


}
