import { Restaurant } from './user';
import { Product } from './product';
import { BoArticle } from './boArticle';

export interface AppRootState {
  homePage: HomePageState;
}

export interface HomePageState {
  topRestaurants: Restaurant[];
  bestRestaurants: Restaurant[];
  trendProducts: Product[];
  bestBoArticles: BoArticle[];
  trendBoArticles: BoArticle[];
  newsBoArticles: BoArticle[];
}