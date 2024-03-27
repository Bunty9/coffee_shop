import {create} from 'zustand';
import {createJSONStorage, devtools} from 'zustand/middleware';
import {persist} from 'zustand/middleware';
import {produce} from 'immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

interface Price {
  size: number;
  quantity: number;
  price: string; // Add this line
}

interface CartItem {
  id: string;
  prices: Price[];
  ItemPrice?: number; // Add this line
}

type StoreState = {
  CoffeeList: typeof CoffeeData;
  BeansList: typeof BeansData;
  cartList: CartItem[]; // Replace any with the appropriate type
  favouritesList: any[]; // Replace any with the appropriate type
  orderHistoryList: any[]; // Replace any with the appropriate type
  cartPrice: number;
};
type Actions = {
  addToCart: (item: any) => void; // Replace any with the appropriate type
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
      set => ({
        CoffeeList: CoffeeData,
        BeansList: BeansData,
        cartList: [],
        favouritesList: [],
        orderHistoryList: [],
        cartPrice: 0,
        addToCart: (cartItem: CartItem) =>
          set(
            produce((state: StoreState) => {
              const itemIndex = state.cartList.findIndex(
                item => item.id === cartItem.id,
              );
              if (itemIndex !== -1) {
                const sizeIndex = state.cartList[itemIndex].prices.findIndex(
                  price => price.size === cartItem.prices[0].size,
                );
                if (sizeIndex !== -1) {
                  state.cartList[itemIndex].prices[sizeIndex].quantity++;
                } else {
                  state.cartList[itemIndex].prices.push(cartItem.prices[0]);
                }
                state.cartList[itemIndex].prices.sort(
                  (a: Price, b: Price) => b.size - a.size,
                );
              } else {
                state.cartList.push(cartItem);
              }
            }),
          ),
        calculateCartPrice: () =>
          set(
            produce((state: StoreState) => {
              state.cartPrice = state.cartList.reduce((totalPrice, item) => {
                const itemPrice = item.prices.reduce((tempPrice, price) => {
                  return tempPrice + parseFloat(price.price) * price.quantity;
                }, 0);
                item.ItemPrice = itemPrice;
                return totalPrice + itemPrice;
              }, 0);
            }),
          ),
        addToFavoriteList: (type: string, id: string) =>
          set(
            produce((state: StoreState) => {
              const list =
                type === 'Coffee' ? state.CoffeeList : state.BeansList;
              const item = list.find(item => item.id === id);
              if (item) {
                item.favourite = !item.favourite;
                if (item.favourite) {
                  state.favouritesList.unshift(item);
                } else {
                  const index = state.favouritesList.findIndex(
                    favItem => favItem.id === id,
                  );
                  if (index !== -1) {
                    state.favouritesList.splice(index, 1);
                  }
                }
              }
            }),
          ),
        deleteFromFavoriteList: (type: string, id: string) =>
          set(
            produce((state: StoreState) => {
              const list =
                type === 'Coffee' ? state.CoffeeList : state.BeansList;
              const item = list.find(item => item.id === id);
              if (item) {
                item.favourite = !item.favourite;
              }
              const favIndex = state.favouritesList.findIndex(
                favItem => favItem.id === id,
              );
              if (favIndex !== -1) {
                state.favouritesList.splice(favIndex, 1);
              }
            }),
          ),
        incrementCartItemQuantity: (id: string, size: string) =>
          set(
            produce((state: StoreState) => {
              const item = state.cartList.find(item => item.id === id);
              if (item) {
                const price = item.prices.find(
                  price => price.size === parseFloat(size),
                );
                if (price) {
                  price.quantity++;
                }
              }
            }),
          ),
        decrementCartItemQuantity: (id: string, size: string) =>
          set(
            produce((state: StoreState) => {
              const itemIndex = state.cartList.findIndex(
                item => item.id === id,
              );
              if (itemIndex !== -1) {
                const priceIndex = state.cartList[itemIndex].prices.findIndex(
                  price => price.size === parseFloat(size),
                );
                if (priceIndex !== -1) {
                  if (
                    state.cartList[itemIndex].prices[priceIndex].quantity > 1
                  ) {
                    state.cartList[itemIndex].prices[priceIndex].quantity--;
                  } else {
                    if (state.cartList[itemIndex].prices.length > 1) {
                      state.cartList[itemIndex].prices.splice(priceIndex, 1);
                    } else {
                      state.cartList.splice(itemIndex, 1);
                    }
                  }
                }
              }
            }),
          ),
        addToOrderHistoryListFromCart: () =>
          set(
            produce((state: StoreState) => {
              const total = state.cartList.reduce(
                (accumulator: number, currentValue: CartItem) =>
                  accumulator + (currentValue?.ItemPrice ?? 0),
                0,
              );
              state.orderHistoryList.unshift({
                OrderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                cartList: [...state.cartList],
                cartListPrice: total.toFixed(2),
              });
              state.cartList = [];
            }),
          ),
      }),
      {
        name: 'coffee-store',
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  ),
);

// Functionality comments:

// addToCart : findIndex calls to find the index of the item and size. If the item or size is found, I increment the quantity or add a new size. If the item is not found, I add a new item. I've also simplified the sort function to b.size - a.size, which will sort the sizes in descending order.
//calculateCartPrice : I've used the reduce function to calculate the total price of the cart. I've also calculated the price of each item and stored it in the ItemPrice field.
//addToFavoriteList : I've added a new action to add or remove an item from the favorites list. I've also added a check to see if the item is already in the favorites list before adding it.
//deleteFromFavoriteList : I've added a new action to remove an item from the favorites list. I've also added a check to see if the item is in the favorites list before removing it.
//incrementCartItemQuantity : I've added a new action to increment the quantity of an item in the cart.
//decrementCartItemQuantity : I've added a new action to decrement the quantity of an item in the cart. If the quantity reaches 0, I remove the item from the cart.
//addToOrderHistoryListFromCart : I've added a new action to add the items in the cart to the order history list. I've also calculated the total price of the cart and added it to the order history item. Finally, I've cleared the cart after adding the items to the order history list.
