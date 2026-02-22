import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { CategoryApi } from './services/category-api';

export const serverRoutes: ServerRoute[] = [
  { // SSG: Static Site Generation, cette route affiche les pages catégories de facon Prerendering: pages seront générées à la compilation
    path: 'products/:category',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const catService = inject(CategoryApi);
      const names = catService.getCategories();
      return names.map(name => ({ category: name })); 
    }
  },
  // pour les routes 'wishlist', 'cart', 'checkout', 'order-success',  CSR (Client Side Rendering) rendu uniquement dans le navigateur
  {
    path: 'wishlist',
    renderMode: RenderMode.Client,
  },
  {
    path: 'cart',
    renderMode: RenderMode.Client,
  },
  {
    path: 'checkout',
    renderMode: RenderMode.Client,
  },
  {
    path: 'order-success',
    renderMode: RenderMode.Client,

  },
   // Toute route non définie explicitement sera rendue en SSR (Server Side Rendering)
   // SSR: l’utilisateur ouvre par exemple /products, le serveur envoie le HTML complet de la page
  {
    path: '**',
    renderMode: RenderMode.Server 
  }
];
