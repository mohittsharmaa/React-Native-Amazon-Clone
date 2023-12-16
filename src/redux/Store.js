const {configureStore} = require('@reduxjs/toolkit');

import cartSlice from './slices/cartSlice';
import wishlistSlice from './slices/wishlistSlice';
export const store = configureStore({
  reducer: {
    wishlist: wishlistSlice,
    cart: cartSlice,
  },
});
