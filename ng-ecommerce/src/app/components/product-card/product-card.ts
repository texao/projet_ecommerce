import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { EcommerceStore } from '../../ecommerce-store';
import { RouterLink } from "@angular/router";
import { StarRating } from "../star-rating/star-rating";

@Component({
  selector: 'app-product-card',
  imports: [MatIcon, MatButton, RouterLink, StarRating],
  template: `
    <div
      class="relative bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl"
    >
      <img [src]="product().imageUrl" class="w-full h-[300px] object-cover rounded-t-xl" [routerLink]="['/product', product().id]" [style.view.transition-name]="'product-image-' + product().id" />

      <!-- On insère ici le contenu passé depuis le parent ici 
      c'est le bouton whishlist-->
      <ng-content />

      <div class="p-5 flex flex-col flex-1" [routerLink]="['/product', product().id]">
        <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">
          {{ product().name }}
        </h3>
        <p class="text-sm text-gray -600 mb-4 flex-1 leading-relaxed">
          {{ product().description }}
        </p>

        <app-star-rating class="mb-3" [rating]="product().rating">
          ({{ product().reviewCount}}) 
        </app-star-rating>


        <div class="text-sm font-meduim mb-4">
          {{ product().inStock ? 'In Stock' : 'Out of Stock' }}
        </div>

        <div class="flex items-center justify-between mt-auto">
          <span class="text-2xl font-bold text-gray-900"> \${{ product().price }} </span>
          <button
            matButton="filled"
            class="flex items-center gap-2"
            (click)="store.addToCart(product())"
          >
            <mat-icon>shopping_cart</mat-icon>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductCard {
  product = input.required<Product>();

  store = inject(EcommerceStore);
}
