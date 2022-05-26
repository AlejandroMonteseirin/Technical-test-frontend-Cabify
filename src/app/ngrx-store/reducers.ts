import { createReducer, on } from '@ngrx/store';
import { addToCartModalAction, setAvailableProductsAction,updateModalAction,updateQuantityProductsAction,updateRulesAction} from './actions';
import {initialState,StateShoppingCart} from './state'





//It's important to never mutate the state, and always create a new object to maintain the previous values of the statuses (Except with modalValue because only is a reference or null
//and wont be modified)

export const shoppingCartReducer = createReducer(initialState,

    //Set available products
    on(setAvailableProductsAction,
        (state,action)=> {
            return new StateShoppingCart(action.availableProducts,{...state.indexedObjectQuantity},{...state.indexedObjectRules},state.modalValue);
        }
    ),
    //Update the quantities of the status
    on(updateQuantityProductsAction,
        (state,action)=> {
            const additions = { [action.id] : action.quantity };
            const newIndexedObjectQuantity = { ...state.indexedObjectQuantity,  ...additions }
            return new StateShoppingCart({...state.indexedObjectProduct},newIndexedObjectQuantity,{...state.indexedObjectRules},state.modalValue);
        }
    ),
    //Set available rules
    on(updateRulesAction,
        (state,action)=> {
            return new StateShoppingCart({...state.indexedObjectProduct},{...state.indexedObjectQuantity},action.rules,state.modalValue);
        }
    ),
    //Update modal values
    on(updateModalAction,
        (state,action)=> {
            return new StateShoppingCart({...state.indexedObjectProduct},{...state.indexedObjectQuantity},{...state.indexedObjectRules},action.modalValue);
        }
    ),
    //add to cart modal values
    on(addToCartModalAction,
        (state,action)=> {
            //if 0 items add 1
            let additions={};
            if(state.indexedObjectQuantity[action.productCode]==undefined){
                additions = { [action.productCode] : 1};
            }else{
                additions = { [action.productCode] : state.indexedObjectQuantity[action.productCode]+1};
            }

            const newIndexedObjectQuantity = { ...state.indexedObjectQuantity,  ...additions }
            return new StateShoppingCart({...state.indexedObjectProduct},newIndexedObjectQuantity,{...state.indexedObjectRules},null);

        }
    )

    
)

/*
export const shoppingCartReducer = createReducer(initialState,
    on(addNewsPaper, (state, action) => ([ ...state, action.newNewspaper])),
    on(addMultipleNewsPaper, (state, action) => (state.concat(action.newNewspapers))),
    on(resetNewspapers, state => initialState)
*/