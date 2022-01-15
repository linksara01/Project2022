import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name:"cart",
    initialState: {
        products: [],
        quantity:0,
        total: 0,
    },
    reducers:{
        addProduct:(state,action)=>{
            state.products.push(action.payload)
            state.quantity += 1 ;
            state.total += action.payload.price * action.payload.quantity;
        },
        reset:(state)=>{
            state.products=[];
            state.quantity=0 ;
            state.total = 0;
        },
        deleteProduct: (state, action) => {
            const index = state.products.findIndex(
              (product) => product.id === action.payload
            );
            state.quantity -= 1;
            state.total =
              state.products[index].price * state.products[index].quantity;
            state.products.splice(index, 1);
          },
    }
});

export const {addProduct,reset,deleteProduct} = cartSlice.actions;
export default cartSlice.reducer;