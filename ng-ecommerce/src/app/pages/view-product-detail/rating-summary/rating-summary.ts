import { Component, computed, input } from '@angular/core';
import { Product } from '../../../models/product';
import { StarRating } from "../../../components/star-rating/star-rating";

@Component({
  selector: 'app-rating-summary',
  imports: [StarRating],
  template: `
    
    <div class="flex items-center gap-8 mb-6 p-4 bg-gray-50 rounded-lg">
      <!-- Affichage de la note globale -->
      <div class="flex flex-col items-center w-1/2">
        <div class="text-4xl font-bold text-gray-900 mb-1">{{ product().rating}}</div>
        <div class="flex items-center mb-2">
          <app-star-rating [rating]="product().rating" />
        </div> 
        <div class="text-sm text-gray-500">Based on {{ totalReviews() }} reviews</div>
      </div> 

      <div class="flex-1">
        @for (breakdown of ratingBreakdown(); track breakdown.stars) {
          <div class="flex items-center gap-2 mb-2">
            <span class="text-sm w-4">{{ breakdown.stars}} ⭐</span>
            <div class="flex-1 h-4 bg-gray-200 rounded-full h-2 mx-2">
              <div class="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
              [style.width.%]="breakdown.percentage">
              </div>
            </div>
            <span class="text-sm text-gray-600 w-8 text-right">{{ breakdown.count}}</span>
          </div>
        }
      </div>
    </div>
  `, 
  styles: ``
})
export class RatingSummary {

  product = input.required<Product>();

  totalReviews = computed(() => this.product().reviews.length);
  
  // correspond au nombre d'avis pour chaque note (1 à 5 étoiles)
  ratingBreakdown = computed(() => {
    const reviews = this.product().reviews;
    const total = reviews.length;

    if (total === 0) 
      return [5, 4, 3, 2, 1].map(stars => ({  // Si total est zéro, renvoie un tableau représentant toutes les étoiles avec 0 avis et 0%
        stars, 
        count: 0, 
        percentage: 0 
        
    }));

    const count = [5, 4, 3, 2, 1].map(stars => {
      const count = reviews.filter((reviews) => reviews.rating === stars).length; // compare la note de l’avis actuel avec la note stars de la boucle
      return {
        stars,
        count,
        percentage: (count / total) * 100 // Calcule le pourcentage d'avis pour chaque note
      };
    });

    return count;
  });

  
}
