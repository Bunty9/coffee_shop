import {create} from 'zustand';
import {createJSONStorage, devtools} from 'zustand/middleware';
import {persist} from 'zustand/middleware';
import {produce} from 'immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

type StoreState = {
  CoffeeList: typeof CoffeeData;
  BeansList: typeof BeansData;
  cartList: any[]; // Replace any with the appropriate type
  favouritesList: any[]; // Replace any with the appropriate type
  orderHistoryList: any[]; // Replace any with the appropriate type
  cartPrice: number;
};
type Actions = {
  //   addToCart: (item: any) => void; // Replace any with the appropriate type
  //   removeFromCart: (item: any) => void; // Replace any with the appropriate type
  //   addToFavourites: (item: any) => void; // Replace any with the appropriate type
  //   removeFromFavourites: (item: any) => void; // Replace any with the appropriate type
  //   addToOrderHistory: (item: any) => void; // Replace any with the appropriate type
  //   clearCart: () => void;
  //   clearFavourites: () => void;
  //   clearOrderHistory: () => void;
};

export const useStore = create<StoreState & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        CoffeeList: CoffeeData,
        BeansList: BeansData,
        cartList: [],
        favouritesList: [],
        orderHistoryList: [],
        cartPrice: 0,
      }),
      {
        name: 'coffee-store',
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  ),
);
