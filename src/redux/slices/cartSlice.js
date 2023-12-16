const {createSlice} = require('@reduxjs/toolkit');

export const CartSlice = createSlice({
  name: 'Cart',
  initialState: {
    data: [],
    totalPrice: 0,
    totalItems: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.data.find(
        item => item.description === action.payload.description,
      );

      if (existingItem) {
        // If the item already exists, create a new array with updated quantity
        state.data = state.data.map(item =>
          item.description === existingItem.description
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
      } else {
        state.data.push({...action.payload, quantity: 1});
        state.totalItems += 1;
      }

      state.totalPrice += action.payload.price;
      console.log(state, 'from cartslice');
    },
    removeFromCart: (state, action) => {
      const {payload} = action;
      const existingItem = state.data.find(
        item => item.description === payload.description,
      );

      if (existingItem) {
        state.totalItems -= existingItem.quantity; // Subtract the quantity of the removed item
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.data = state.data.filter(
          item => item.description !== payload.description,
        );
      }
    },
    increaseQuantity: (state, action) => {
      const {payload} = action;
      const itemToUpdate = state.data.find(
        item => item.description === payload.description,
      );

      if (itemToUpdate) {
        itemToUpdate.quantity += 1;
        state.totalItems += 1;
        state.totalPrice += itemToUpdate.price;
      }
    },

    decreaseQuantity: (state, action) => {
      const {payload} = action;
      const itemToUpdate = state.data.find(
        item => item.description === payload.description,
      );

      if (itemToUpdate) {
        // Decrease quantity
        itemToUpdate.quantity -= 1;
        state.totalItems -= 1;
        state.totalPrice -= itemToUpdate.price;

        // If quantity becomes 0, remove the item from the cart
        if (itemToUpdate.quantity === 0) {
          state.data = state.data.filter(
            item => item.description !== payload.description,
          );
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {addToCart, removeFromCart, increaseQuantity, decreaseQuantity} =
  CartSlice.actions;

export default CartSlice.reducer;
