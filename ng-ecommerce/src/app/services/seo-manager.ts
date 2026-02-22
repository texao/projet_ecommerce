import { DOCUMENT, inject, Injectable, REQUEST } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoData } from '../models/seo-data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
}) 
export class SeoManager {  // SEO(Search Engine Optimization): Optimisation pour les moteurs de recherche. Ici Affiche de la category ou du nom du produit sur l'onglet du navigateur
  
  title = inject(Title);
  meta = inject(Meta);
  router = inject(Router);
  request = inject(REQUEST, { optional: true });
  document = inject(DOCUMENT); 

  private readonly siteName = 'Modern Store';
  private readonly defaultImage = 'https://imgs.search.brave.com/mk_JVdVYw9rBGhJc0SKry7K8rENLAUSDgQYaRZM-rbA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTAv/ODIwLzI0OC9zbWFs/bC9vbmxpbmUtc3Rv/cmUtbG9nby1kZXNp/Z24tZm9yLWNvbW1l/cmNlLWJ1c2luZXNz/LWljb24td2l0aC1t/b2Rlcm4tc3R5bGUt/Y29uY2VwdC1wcmVt/aXVtLXZlY3Rvci5q/cGc';

  updateSeoTags(seoData: SeoData) {
    this.title.setTitle(`${seoData.title} | ${this.siteName}`);
    this.meta.updateTag({ name: 'description', content: seoData.description });
    
    let origin = '';
    if(this.request){
      const headers = this.request.headers as Headers || undefined;
      const protocol = (headers?.get('x-forwarded-proto') || this.request.url.split(':')[0]) + '://';
      const host = headers?.get('x-forwarded-host') || headers?.get('host') || '';
      origin = host ? `${protocol}${host}` : '';
    } else if (typeof window !== 'undefined') {
      origin = window.location.origin;
    }

    const fullUrl = `${origin}${this.router.url}`;

    let canonicalLink = this.document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if(!canonicalLink) {
      canonicalLink = this.document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonicalLink);
    }
    
    canonicalLink.setAttribute('href', fullUrl);

    const imageUrl = seoData.image ||this.defaultImage;

    this.meta.updateTag({ property: 'og:type', content: seoData.type || 'website' }); 
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:title', content: seoData.title });
    this.meta.updateTag({ property: 'og:description', content: seoData.description });
    this.meta.updateTag({ property: 'og:url', content: fullUrl });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });


  }

}
