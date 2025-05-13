import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dataUrl = 'assets/data/products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataUrl);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return new Observable((observer) => {
      this.getProducts().subscribe(products => {
        const found = products.find(p => p.id === id);
        observer.next(found);
        observer.complete();
      });
    });
  }
}
