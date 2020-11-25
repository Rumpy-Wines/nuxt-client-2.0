import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/store';

export const state = () => ({
	localStorageKey: "cart_items",
	list: [],
	loaded: false,
	itemCount: 0
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
	FETCH_CART_ITEMS(state, { cartItems }) {
		state.list = cartItems
	},
	VALIDATE_OFFLINE_CART_ITEMS(state) {
		try {
			//@ts-ignore
			state.list = JSON.parse(localStorage.getItem(state.localStorageKey)) || []
		} catch (e) {
			state.list = []
			localStorage.setItem(state.localStorageKey, JSON.stringify([]))
		 }
		state.loaded = true
		state.itemCount = state.list.length
	},
	ADD_ITEM_TO_CART(state, { productItem, cartItem }) {
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
			} else {
				cartItem.productItem = productItem
				//@ts-ignore
				state.list.unshift(cartItem)
			}

			state.itemCount = state.list.length
			localStorage.setItem(state.localStorageKey, JSON.stringify(state.list))
		} else {
			let index = state.list.findIndex((el: any) => el.id == cartItem.id)

			if (index < 0) {
				//@ts-ignore
				state.list.unshift(cartItem)
			} else {
				//@ts-ignore
				state.list.splice(index, 1, cartItem)
			}
		}
	},
	UPDATE_CART_ITEM(state, { cartItem }) {
		let index = state.list.findIndex((el: any) => el.id == cartItem.id)

		if (index >= 0) {
			//@ts-ignore
			state.list.splice(index, 1, cartItem)
		}


		//@ts-ignore
		if (!this.$auth.loggedIn) {
			state.itemCount = state.list.length
			localStorage.setItem(state.localStorageKey, JSON.stringify(state.list))
		} else {
		}
	},
	REMOVE_CART_ITEM(state, { cartItem }) {
		let index = state.list.findIndex((el: any) => el.id == cartItem.id)

		if (index >= 0) {
			//@ts-ignore
			state.list.splice(index, 1)
		}

		//@ts-ignore
		if (!this.$auth.loggedIn) {
			state.itemCount = state.list.length
			localStorage.setItem(state.localStorageKey, JSON.stringify(state.list))
		}
	},
	CART_ITEM_COUNT(state, { itemCount }) {
		state.itemCount = itemCount
	}
}
export const actions: ActionTree<CartStoreState, RootState> = {
	fetchCartItems({ commit }) {
		return new Promise((resolve, reject) => {
			//@ts-ignore
			if (!this.$auth.loggedIn) {
				resolve()
				return
			}

			this.$axios.$get("/cart")
				.then(cartItems => {
					commit("FETCH_CART_ITEMS", { cartItems })
					resolve()
				}).catch(err => { reject(err) })
		})
	},
	addToCart({ commit, dispatch }, { productItem, itemCount }) {
		return new Promise((resolve, reject) => {
			//@ts-ignore
			if (!this.$auth.loggedIn) {
				commit("ADD_ITEM_TO_CART", { productItem })
				resolve()
			} else {
				itemCount = itemCount || 1

				let formData = new FormData()

				// Object.keys(node).each(key => {
				// 	formData.append(key, node[key]);
				// }

				formData.set("itemCount", itemCount)
				formData.set("productItemId", productItem.id)

				this.$axios.post("/cart", formData)
					.then(response => response.data)
					.then(async (cartItem) => {
						commit("ADD_ITEM_TO_CART", { cartItem })
						await dispatch("cartItemCount")
						resolve()
					}).catch(err => {
						// debugger
						reject(err)
					})
			}
		})
	},
	updateCartItem({ commit, dispatch }, { cartItem }) {
		return new Promise((resolve, reject) => {
			//@ts-ignore
			if (!this.$auth.loggedIn) {
				commit("UPDATE_CART_ITEM", { cartItem })
				resolve()
			} else {
				let formData = new FormData()
				formData.set("id", cartItem.id)
				formData.set("isActive", cartItem.isActive)
				formData.set("itemCount", cartItem.itemCount)

				this.$axios.put("/cart", formData)
					.then(response => response.data)
					.then(async (modifiedCartItem) => {
						commit("UPDATE_CART_ITEM", { cartItem: modifiedCartItem })
						await dispatch("cartItemCount")
						resolve()
					}).catch(err => { reject(err) })
			}
		})
	},
	removeCartItem({ commit, dispatch }, { cartItem }) {
		return new Promise((resolve, reject) => {
			//@ts-ignore
			if (!this.$auth.loggedIn) {
				commit("REMOVE_CART_ITEM", { cartItem })
				resolve()
			} else {
				this.$axios.delete(`/cart/${cartItem.id}`)
					.then(async () => {
						commit("REMOVE_CART_ITEM", { cartItem })
						await dispatch("cartItemCount")
						resolve()
					}).catch(err => { reject(err) })
			}
		})
	},
	moveCartOnline({ commit, dispatch, state }) {
		return new Promise(async (resolve, reject) => {
			commit("VALIDATE_OFFLINE_CART_ITEMS")

			for (let cartItem of state.list) {
				await dispatch("addToCart", {
					productItem: (cartItem as any).productItem,
					itemCount: (cartItem as any).itemCount
				}).catch(err => { })
			}
			resolve()
		})
	},
	cartItemCount({ commit }) {
		return new Promise((resolve, reject) => {
			this.$axios.get("/cart/count")
				.then(response => response.data)
				.then(itemCount => {
					commit("CART_ITEM_COUNT", { itemCount })
					resolve()
				}).catch(err => { reject(err) })
		})
	},
	checkout({ }) {
		// return new Promise((resolve, reject) => {

		// })
	}
}
