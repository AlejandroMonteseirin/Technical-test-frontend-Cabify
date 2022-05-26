
import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product';

export const setAvailableProductsAction = createAction(
    '[Product Set] Set Products',
    props<{ availableProducts: { [id: string]: Product } }>()
);

export const updateQuantityProductsAction = createAction(
    '[Product Update Quantity] Update Products',
    props<{ id: string, quantity: number }>()
);
export const updateRulesAction = createAction(
    '[Rules Update] Update Rules',
    props<{ rules: { [id: string]: any } }>()
);
export const updateModalAction = createAction(
    '[Modal Update] Update Modal',
    props<{ modalValue: Product | null }>()
);
export const addToCartModalAction = createAction(
    '[Product Add Quantity] Add to cart',
    props<{ productCode: string }>()
);



