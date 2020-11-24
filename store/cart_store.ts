import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/store';

export const state = () => ({
	localStorageKey: "cart_items",
	list: [],
	loaded: false
})

export type CartStoreState = ReturnType<typeof state>

interface CartItemInterface {
	id: string,
	isActive: boolean,
	itemCount: number,
	productItem: any
}
export const getters: GetterTree<CartStoreState, RootState> = {
	
}

export const mutations: MutationTree<CartStoreState> = {
	VALIDATE_OFFLINE_CART_ITEMS(state){
		//@ts-ignore
		state.list = JSON.parse(localStorage.getItem(state.localStorageKey)) || []
		state.loaded = true
	},
	ADD_ITEM_TO_CART(state, { productItem }) {
		//@ts-ignore
		if (!this.$auth.loggedIn) {
			//@ts-ignore
			state.list = JSON.parse(localStorage.getItem(state.localStorageKey)) || []
			let index: number = state.list.findIndex((el: CartItemInterface) => el.productItem.id == productItem.id)
			let cartItem: CartItemInterface = {
				itemCount: 1,
				isActive: true,
				id: "cart_item-" + Date.now().toString(),
				productItem: {}
			}
			if (index >= 0) {
				cartItem = state.list[index]
				cartItem.itemCount += 1
				cartItem.productItem = productItem
				//@ts-ignore
				state.list.splice(index, 1, cartItem)
			}else {
				cartItem.productItem = productItem
				//@ts-ignore
				state.list.unshift(cartItem)
			}

			localStorage.setItem(state.localStorageKey, JSON.stringify(state.list))
		}
	},
	UPDATE_CART_ITEM(state, {cartItem}) {
		//@ts-ignore
		if (!this.$auth.loggedIn) {
			let index = state.list.findIndex((el: any) => el.id == cartItem.id)
			
			if(index >= 0){
				//@ts-ignore
				state.list.splice(index, 1, cartItem)
			}

			localStorage.setItem(state.localStorageKey, JSON.stringify(state.list))
		}
	}
}
export const actions: ActionTree<CartStoreState, RootState> = {
	addToCart({ commit }, { productItem }) {
		return new Promise((resolve, reject) => {
			//@ts-ignore
			if (!this.$auth.loggedIn) {
				commit("ADD_ITEM_TO_CART", { productItem })
				resolve()
			}
		})
	},
	updateCartItem({commit}, {cartItem}) {
		return new Promise((resolve, reject) => {
			//@ts-ignore
			if (!this.$auth.loggedIn) {
				commit("UPDATE_CART_ITEM", { cartItem })
				resolve()
			}
		})
	}
}
