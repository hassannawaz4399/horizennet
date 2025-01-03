import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/interfaces/product.interface';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule]
})
export class ProductsSectionComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private subscription?: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.subscription = this.productService.getAllProducts()
      .pipe(
        map(products => products.slice(0, 2))
      )
      .subscribe(products => {
        this.products = products;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
} 