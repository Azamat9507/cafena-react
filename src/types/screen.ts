import { Restaurant } from './user';
import { Product } from './product';
import { BoArticle } from './boArticle';
import { Order } from './order';


/** REACT APP STATE */
export interface AppRootState {
  homePage: HomePageState;
  restaurantPage: RestaurantPageState;
}

/** HOMEPAGE */
export interface HomePageState {
  topRestaurants: Restaurant[];
  bestRestaurants: Restaurant[];
  trendProducts: Product[];
  bestBoArticles: BoArticle[];
  trendBoArticles: BoArticle[];
  newsBoArticles: BoArticle[];
}     

/** RESTAURANT PAGE */
export interface RestaurantPageState {
  targetRestaurants: Restaurant[];
  randomRestaurants: Restaurant[];
  chosenRestaurant: Restaurant | null;
  targetProducts: Product[];
  chosenProduct: Product | null;
}

/** ORDERS PAGE */
export interface OrdersPageState {
  pausedOrders: Order[],
  processOrders: Order[],
  finishedOrders: Order[],
}