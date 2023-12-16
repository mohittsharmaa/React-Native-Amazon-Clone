const {createSlice} = require('@reduxjs/toolkit');

const WishlistSlice = createSlice({
  name: 'Wishlist',
  initialState: {
    data: [],
    total: 0,
  },
  reducers: {
    addToWishlist(state, action) {
      state.data = [...state.data, action.payload];
      state.total += 1;
    },
    removeFromWishlist(state, action) {
      const descriptionToRemove = action.payload;
      state.data = state.data.filter(
        item => item.description !== descriptionToRemove,
      );
      state.total = state.data.length;
      // console.log(state);
    },
  },
});

export const {addToWishlist, removeFromWishlist} = WishlistSlice.actions;
export default WishlistSlice.reducer;
