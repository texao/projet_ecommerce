import { computed, inject } from '@angular/core';
import { Product } from './models/product';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from './services/toaster';
import { CartItem } from './models/cart';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { signInParams, signUpParams, User } from './models/user';
import { Router } from '@angular/router';
import { Order } from './models/order';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { AddReviewParams, UserReview } from './models/user-review';
import { SeoManager } from './services/seo-manager';

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;

  loading: boolean;

  selectedProductId: string | undefined;

  writeReview: boolean;
  
};

export const EcommerceStore = signalStore(
  {
    // ce service sera fourni automatiquement
    // dans l’injecteur racine de l’application donc partagé partout
    providedIn: 'root',
  },
  // etat initial
  withState({
    products: [
      // electronics

      {
        id: '1',
        name: 'iPhone 15 Pro (Demo)',
        description: 'Smartphone haut de gamme — écran OLED, triple caméra, performances élevées.',
        price: 1199,
        imageUrl:
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&w=400&h=300&fit=crop',
        rating: 4.8,
        reviewCount: 1450, // nombre d'avis
        inStock: true,
        category: 'electronics',
        reviews: [
          {
            id: '1-1',
            productId: '1',
            userName: 'Sarah Johnson',
            userImageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
            rating: 5,
            title: 'Excellent camera and battery',
            comment: 'Excellent smartphone! The camera is exceptionally sharp and the battery lasts all day.',
            reviewDate: new Date('2024-02-10'),
          },
          {
            id: 'rev-1-2',
            productId: '1',
            userName: 'Michael Chen',
            userImageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
            rating: 5,
            title: 'Stunning OLED display',
            comment: 'The OLED display is absolutely stunning with vibrant colors. Very satisfied with this purchase.',
            reviewDate: new Date('2024-02-08'),
          },
          {
            id: 'rev-1-3',
            productId: '1',
            userName: 'Emma Wilson',
            userImageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
            rating: 4,
            title: 'Great performance, pricey',
            comment: 'Great phone but the price is a bit high. Performance is flawless though.',
            reviewDate: new Date('2024-02-05'),
          },
        ],
      },
      {
        id: '2',
        name: 'Galaxy S24 Ultra (Demo)',
        description: 'Phablet premium avec grand écran AMOLED et photo haute résolution.',
        price: 1349,
        imageUrl:
          'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&w=400&h=300&fit=crop',
        rating: 4.7,
        reviewCount: 980,
        inStock: true,
        category: 'electronics',
        reviews: [
          {
            id: 'rev-2-1',
            productId: '2',
            userName: 'James Martinez',
            userImageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
            rating: 5,
            title: 'Incredible display',
            comment: 'Spectacularly bright AMOLED screen with incredible colors. Photos look amazing.',
            reviewDate: new Date('2024-02-09'),
          },
          {
            id: 'rev-2-2',
            productId: '2',
            userName: 'Lisa Anderson',
            userImageUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
            rating: 4,
            title: 'Great for photography',
            comment: 'Beautiful device, a bit heavy but excellent for photography and video.',
            reviewDate: new Date('2024-02-07'),
          },
          {
            id: 'rev-2-3',
            productId: '2',
            userName: 'David Thompson',
            userImageUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
            rating: 5,
            title: 'Outstanding performance',
            comment: 'Best phone I have ever owned. Performance and design are flawless.',
            reviewDate: new Date('2024-02-04'),
          },
        ],
      },
      {
        id: '3',
        name: 'Sony Noise Cancelling Headphones',
        description: 'Casque sans fil avec réduction active du bruit et longue autonomie.',
        price: 379,
        imageUrl:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&w=400&h=300&fit=crop',
        rating: 4.9,
        reviewCount: 4200, 
        inStock: true,
        category: 'audio',
        reviews: [
          {
            id: '3-1',
            productId: '3',
            userName: 'Rachel Green',
            userImageUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
            rating: 5,
            title: 'Outstanding noise cancellation',
            comment: 'Noise cancellation is impressive! Perfect for calls and music listening.',
            reviewDate: new Date('2024-02-08'),
          },
          {
            id: '3-2',
            productId: '3',
            userName: 'Robert Brown',
            userImageUrl: 'https://randomuser.me/api/portraits/men/8.jpg',
            rating: 5,
            title: 'Very comfortable',
            comment: 'Excellent headphones, comfortable even after hours of use.',
            reviewDate: new Date('2024-02-06'),
          },
          {
            id: '3-3',
            productId: '3',
            userName: 'Sophia Miller',
            userImageUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
            rating: 4,
            title: 'High quality, pricey',
            comment: 'Very good headphones, a bit pricey but the quality is worth it.',
            reviewDate: new Date('2024-02-03'),
          },
        ],
      },
      {
        id: '4',
        name: 'MacBook Air M3 (Demo)',
        description: 'Ultrabook fin et léger avec nouvelle puce pour productivité et créativité.',
        price: 1599,
        imageUrl:
          'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&w=400&h=300&fit=crop',
        rating: 4.8,
        reviewCount: 2200,
        inStock: false,
        category: 'computers',
        reviews: [
          {
            id: '4-1',
            productId: '4',
            userName: 'Alex Turner',
            userImageUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
            rating: 5,
            title: 'Fast M3 performance',
            comment: 'Perfect for development! The M3 chip is very fast and efficient.',
            reviewDate: new Date('2024-02-09'),
          },
          {
            id: '4-2',
            productId: '4',
            userName: 'Nicole Davis',
            userImageUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
            rating: 5,
            title: 'Ultra-thin and lightweight',
            comment: 'Extremely thin and lightweight, excellent for creative work. No regrets.',
            reviewDate: new Date('2024-02-07'),
          },
          {
            id: '4-3',
            productId: '4',
            userName: 'Christopher Lee',
            userImageUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
            rating: 4,
            title: 'Solid, slightly expensive',
            comment: 'Good computer but a bit expensive. Works flawlessly for work.',
            reviewDate: new Date('2024-02-02'),
          },
        ],
      },
      {
        id: '5',
        name: 'Dell XPS 15 OLED',
        description: 'PC portable grand écran OLED — idéal graphisme et multimédia.',
        price: 2499,
        imageUrl:
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&w=400&h=300&fit=crop',
        rating: 4.6,
        reviewCount: 870,
        inStock: true,
        category: 'computers',
        reviews: [
          {
            id: '5-1',
            productId: '5',
            userName: 'Victoria Clark',
            userImageUrl: 'https://randomuser.me/api/portraits/women/13.jpg',
            rating: 5,
            title: 'Stunning OLED for editing',
            comment: 'The OLED screen is stunning for photo editing! Incredible contrast.',
            reviewDate: new Date('2024-02-08'),
          },
          {
            id: '5-2',
            productId: '5',
            userName: 'Kevin White',
            userImageUrl: 'https://randomuser.me/api/portraits/men/14.jpg',
            rating: 4,
            title: 'Great for designers',
            comment: 'Excellent machine for designers. Can get warm under heavy load.',
            reviewDate: new Date('2024-02-05'),
          },
          {
            id: '5-3',
            productId: '5',
            userName: 'Julia Harris',
            userImageUrl: 'https://randomuser.me/api/portraits/women/15.jpg',
            rating: 5,
            title: 'Excellent for video editing',
            comment: 'Excellent for video editing. Really satisfied with my choice.',
            reviewDate: new Date('2024-02-01'),
          },
        ],
      },
      {
        id: '6',
        name: 'iPad Pro 12.9 (Demo)',
        description: 'Tablette professionnelle avec écran haute fidélité et stylet.',
        price: 1449,
        imageUrl:
          'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&w=400&h=300&fit=crop',
        rating: 4.9,
        reviewCount: 1300,
        inStock: true,
        category: 'electronics',
        reviews: [
          {
            id: '6-1',
            productId: '6',
            userName: 'Amanda Foster',
            userImageUrl: 'https://randomuser.me/api/portraits/women/16.jpg',
            rating: 5,
            title: 'Perfect for digital drawing',
            comment: 'Great for digital drawing! The screen is incredibly accurate.',
            reviewDate: new Date('2024-02-07'),
          },
          {
            id: '6-2',
            productId: '6',
            userName: 'Thomas Wright',
            userImageUrl: 'https://randomuser.me/api/portraits/men/16.jpg',
            rating: 5,
            title: 'Smooth and large display',
            comment: 'Large tablet is very smooth for work and learning.',
            reviewDate: new Date('2024-02-05'),
          },
          {
            id: '6-3',
            productId: '6',
            userName: 'Hannah Scott',
            userImageUrl: 'https://randomuser.me/api/portraits/women/17.jpg',
            rating: 4,
            title: 'Great for students',
            comment: 'Very good tablet, ideal for students. Apple Pencil sold separately.',
            reviewDate: new Date('2024-02-02'),
          },
        ],
      },
      {
        id: '7',
        name: 'Logitech MX Master 3S',
        description: 'Souris ergonomique pour productivité — défilement ultra-rapide.',
        price: 109,
        imageUrl:
          'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&w=400&h=300&fit=crop',
        rating: 4.9,
        reviewCount: 8900,
        inStock: true,
        category: 'accessories',
        reviews: [
          {
            id: '7-1',
            productId: '7',
            userName: 'Brandon King',
            userImageUrl: 'https://randomuser.me/api/portraits/men/18.jpg',
            rating: 5,
            title: 'Best productivity mouse',
            comment: 'Best mouse for productivity! Very comfortable and precise.',
            reviewDate: new Date('2024-02-09'),
          },
          {
            id: '7-2',
            productId: '7',
            userName: 'Olivia Carter',
            userImageUrl: 'https://randomuser.me/api/portraits/women/19.jpg',
            rating: 5,
            title: 'Ergonomic with hyperfast scrolling',
            comment: 'Ergonomic mouse truly excellent. The hyperfast scrolling is fantastic.',
            reviewDate: new Date('2024-02-06'),
          },
          {
            id: '7-3',
            productId: '7',
            userName: 'Nathan Moore',
            userImageUrl: 'https://randomuser.me/api/portraits/men/20.jpg',
            rating: 5,
            title: 'Long battery life',
            comment: 'Time saver! Long battery life, very practical for work.',
            reviewDate: new Date('2024-02-03'),
          },
        ],
      },
      {
        id: '8',
        name: 'Samsung Odyssey G9 49"',
        description: "Moniteur incurvé 49'' pour jeu et productivité avec haute fréquence.",
        price: 1399,
        imageUrl:
          'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&w=400&h=300&fit=crop',
        rating: 4.8,
        reviewCount: 610,
        inStock: false,
        category: 'electronics',
        reviews: [
          {
            id: '8-1',
            productId: '8',
            userName: 'Marcus Johnson',
            userImageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
            rating: 5,
            title: 'Immersive gaming monitor',
            comment: 'Incredible gaming monitor! The immersion is maximal, truly amazing.',
            reviewDate: new Date('2024-02-08'),
          },
          {
            id: '8-2',
            productId: '8',
            userName: 'Scarlett Murphy',
            userImageUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
            rating: 4,
            title: 'Great for work and gaming',
            comment: 'Very large screen for work. Equally good for gaming and productivity.',
            reviewDate: new Date('2024-02-04'),
          },
          {
            id: '8-3',
            productId: '8',
            userName: 'Ethan Taylor',
            userImageUrl: 'https://randomuser.me/api/portraits/men/24.jpg',
            rating: 5,
            title: 'Flawless performance at 240Hz',
            comment: 'Best gaming purchase ever! Flawless performance, 240Hz refresh rate.',
            reviewDate: new Date('2024-01-30'),
          },
        ],
      },
      {
        id: '9',
        name: 'GoPro Action Camera',
        description: "Caméra d'action compacte, stabilisation et enregistrement haute résolution.",
        price: 449,
        imageUrl:
          'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&w=400&h=300&fit=crop',
        rating: 4.7,
        reviewCount: 2100,
        inStock: true,
        category: 'photography',
        reviews: [
          {
            id: '9-1',
            productId: '9',
            userName: 'Gabriel Hughes',
            userImageUrl: 'https://randomuser.me/api/portraits/men/26.jpg',
            rating: 5,
            title: 'Rugged action camera',
            comment: 'Perfect action camera for extreme sports! Very rugged and lightweight.',
            reviewDate: new Date('2024-02-08'),
          },
          {
            id: '9-2',
            productId: '9',
            userName: 'Chloe Bennett',
            userImageUrl: 'https://randomuser.me/api/portraits/women/23.jpg',
            rating: 5,
            title: 'Excellent 4K stabilization',
            comment: '4K recording in great quality, stabilization is impressive.',
            reviewDate: new Date('2024-02-05'),
          },
          {
            id: '9-3',
            productId: '9',
            userName: 'Ryan Peterson',
            userImageUrl: 'https://randomuser.me/api/portraits/men/28.jpg',
            rating: 4,
            title: 'Good video, battery could improve',
            comment: 'Good camera for videos. Battery life could be longer though.',
            reviewDate: new Date('2024-02-01'),
          },
        ],
      },
      {
        id: '10',
        name: 'Apple Watch Series 9 (Demo)',
        description: 'Montre connectée pour suivi santé et notifications.',
        price: 529,
        imageUrl:
          'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&w=400&h=300&fit=crop',
        rating: 4.8,
        reviewCount: 3500,
        inStock: false,
        category: 'wearables',
        reviews: [
          {
            id: '10-1',
            productId: '10',
            userName: 'Madison Parker',
            userImageUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
            rating: 5,
            title: 'Accurate health tracking',
            comment: 'Fantastic smartwatch! Health tracking is very accurate and practical.',
            reviewDate: new Date('2024-02-09'),
          },
          {
            id: '10-2',
            productId: '10',
            userName: 'Joshua Mitchell',
            userImageUrl: 'https://randomuser.me/api/portraits/men/30.jpg',
            rating: 5,
            title: 'Excellent for fitness',
            comment: 'Excellent for fitness activity tracking. Elegant and modern design.',
            reviewDate: new Date('2024-02-06'),
          },
          {
            id: '10-3',
            productId: '10',
            userName: 'Zoe Walker',
            userImageUrl: 'https://randomuser.me/api/portraits/women/27.jpg',
            rating: 4,
            title: 'Convenient notifications',
            comment: 'Very good smartwatch. Notifications are convenient.',
            reviewDate: new Date('2024-02-02'),
          },
        ],
      },
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectedProductId: undefined,
    writeReview: false,
  } as EcommerceState),
 // withStorageSync({ key: 'modern-store', select: ({ wishlistItems, cartItems, user}) => ({ wishlistItems, cartItems, user }) }),
  withComputed(({ category, products, wishlistItems, cartItems, selectedProductId}) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') {
        return products();
      } else {
        return products().filter((p) => p.category === category().toLowerCase());
      }
    }),
    wishlistCount: computed(() => wishlistItems().length),
    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
    selectedProduct: computed(() => products().find((p) => p.id === selectedProductId())), // trouver le produit sélectionné dans la liste des produits
  })),
  withMethods((store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router), seoManager = inject(SeoManager)) => ({
    // signalMethod: méthode signal-native pour mettre
    // à jour de manière réactive et typée.
    setCategory: signalMethod<string>((category: string) => {
      // met à jour propriété category du store
      // avec la valeur de la variable category.
      patchState(store, { category });
    }),
    setProductsListSeoTags: signalMethod<string | undefined>((category) => {
      const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products';
      const description = category ? `Browse our selection of ${category} products.` : 'Browse our collection of products';
      seoManager.updateSeoTags({
        title: categoryName,
        description, 
      });
    }),
    setProductId: signalMethod<string>((productId: string) => {
      patchState(store, { selectedProductId: productId });
    }),
    setProductSeoTags: signalMethod<Product | undefined>((product) => {
      if (!product) return;
      seoManager.updateSeoTags({
        title: product.name,
        description: product.description,
        image: product.imageUrl,
        type: 'product'
      });
    }),
    addToWishlist: (product: Product) => {
      // store.wishlistItems(): récupère la liste actuelle des produits dans la wishlist
      // produce: permet de modifier le tableau comme s’il était modifiable
      const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.find((p) => p.id === product.id)) {
          draft.push(product);
        }
      });
      patchState(store, { wishlistItems: updatedWishlistItems });
      toaster.success('Product added to whishlist');
    },
    removeFromWishlist: (product: Product) => {
      patchState(store, {
        // si p.id !== product.id retourne true on garde le produit de la liste.
        // si p.id !== product.id est false on garde pas le produit de la liste
        wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
      });
      toaster.success('Product removed from wishlist');
    },

    clearWishlist: () => {
      patchState(store, { wishlistItems: [] });
    },

    addToCart: (product: Product, quantity = 1) =>{
      const existingItemIndex = store.cartItems().findIndex(i => i.product.id === product.id);
      
      const updatedCartItems = produce(store.cartItems(), (draft) => {
        if(existingItemIndex !== -1){
          draft[existingItemIndex].quantity += quantity;
          return;
        }
        draft.push({
          product, quantity 
        })

      });

      patchState(store, {cartItems: updatedCartItems}) 
      toaster.success(existingItemIndex !== -1 ? 'Product added again' : 'Product added to the cart')  
    },

    setItemQuantity(params: {productId: string, quantity: number}){
      const index = store.cartItems().findIndex(c => c.product.id === params.productId);

      const updated = produce(store.cartItems(), (draft) => {
        draft[index].quantity = params.quantity;
      });

      patchState(store, {cartItems: updated}); 
    },

    // Pour chaque produit de la wishlist, si le produit n’est pas déjà dans le panier (cartItems)
    addAllWishlistToCart: () =>{
      const updatedCartItems = produce(store.cartItems(), (draft) => {  // cartItem: le panier ,  ici draft c'est une copie de cartItem
        store.wishlistItems().forEach(p => {
          if(!draft.find(c => c.product.id === p.id )){
            draft.push({ product: p, quantity: 1});
          }
        })
      })  
 
      patchState(store, {cartItems: updatedCartItems, wishlistItems: [] })
    },

    moveToWishlist: (product: Product) =>{
      const updatedCartItems = store.cartItems().filter((p => p.product.id !== product.id)); // supprimer du panier qui est cartIems
      const updatedWishlistItems = produce(store.wishlistItems(), (draft) =>{ // draft c'est une copie de wishlistItems
        if(!draft.find(p => p.id === product.id )){
        draft.push(product)
      }
    })

    patchState(store, {cartItems: updatedCartItems, wishlistItems: updatedWishlistItems})
    },

    removeFromCart: (product: Product) =>{
      patchState(store, {cartItems: store.cartItems().filter( (c) => c.product.id !== product.id)})
       
    },

    proceedToCheckout: () => {
      if(!store.user()){
      matDialog.open(SignInDialog, {
        disableClose: true,
        data: {
          checkout: true
        }
      });
      return;
    }

    router.navigate(['/checkout']);

    },

    placeOrder: async () => {
      patchState(store, { loading: true});

      const user = store.user();

      if(!user) {
        toaster.error('Please login before placing order');
        patchState(store, { loading: false });
        return; 
      }

      const order: Order = {
        id: crypto.randomUUID(),
        userId: store.user()?.id || '',
        total: Math.round(store.cartItems().reduce((acc, item) => acc + item.quantity * item.product.price, 0)),
        items: store.cartItems(),
        paymentStatus: 'success',  
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      patchState(store, { loading: false, cartItems: [] });
      router.navigate(['order-success'])

    },

    signIn: ({ email, password, checkout, dialogId }: signInParams) => {
      patchState(store, {
        user: {
          id: '1',
          email,
          name: 'John Doe',
          imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
        }
      });

      matDialog.getDialogById(dialogId)?.close();

      if(checkout){
        router.navigate(['/checkout']);
      }
    },

     signUp: ({ email, password, name, checkout, dialogId }: signUpParams) => {
      patchState(store, {
        user: {
          id: '1',
          email,
          name: 'John Doe',
          imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
        }
      });

      matDialog.getDialogById(dialogId)?.close();

      if(checkout){
        router.navigate(['/checkout']);
      }
    },

    signOut: () => {
      patchState(store, { user: undefined });
    },

    
    showWriteReview: () => {
      patchState(store, { writeReview: true });
    },

    hideWriteReview: () => {
      patchState(store, { writeReview: false });
    },

    addReview: async ({ title, comment, rating }: AddReviewParams) => {
      patchState(store, { loading: true });
      const product = store.products().find((p) => p.id === store.selectedProductId());
      if(!product){
        patchState(store, { loading: false });
        return;
      }

      const review: UserReview = {
        id: crypto.randomUUID(),
        title, 
        comment,
        rating,
        productId: product.id,
        userName: store.user()?.name || '',
        userImageUrl: store.user()?.imageUrl || '',
        reviewDate: new Date(),
      };

      const updatedProducts = produce(store.products(), (draft) => {
        const index = draft.findIndex((p) => p.id === product.id);
        draft[index].reviews.push(review);
        draft[index].rating  = Math.round((draft[index].reviews.reduce((acc, r) => acc + r.rating, 0) / draft[index].reviews.length) * 10) / 10;
        draft[index].reviewCount = draft[index].reviews.length;
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      patchState(store, { loading: false, products: updatedProducts, writeReview: false });

    }, 


  }))
);
