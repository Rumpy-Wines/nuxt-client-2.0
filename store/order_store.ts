import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/store';

export const state = () => ({
	list: [],
	orderItems: []
})

export type OrderStoreState = ReturnType<typeof state>

export const getters: GetterTree<OrderStoreState, RootState> = {

}

export const mutations: MutationTree<OrderStoreState> = {
	FETCH_ALL_ORDERS(state, { orders }) {
		state.list = orders
	},
	FETCH_SINGLE_ORDERS(state, { order }) {
		let index = state.list.findIndex((el: any) => el.id == order.id)

		if (index < 0)
			//@ts-ignore
			state.list.unshift(order)
		else
			//@ts-ignore
			state.list.splice(index, 1, order)
	},
	FETCH_ORDER_ITEM (state, {orderItem}) {
		let index = state.orderItems.findIndex((el: any) => el.id == orderItem.id)

		if (index < 0)
			//@ts-ignore
			state.orderItems.unshift(orderItem)
		else
			//@ts-ignore
			state.orderItems.splice(index, 1, order)
	}
}

export const actions: ActionTree<OrderStoreState, RootState> = {
	fetchAllOrders({ commit }) {
		return new Promise((resolve, reject) => {
			this.$axios.$get("/orders")
				.then(orders => {
					commit("FETCH_ALL_ORDERS", { orders })
					resolve()
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	fetchSingleOrder({ commit }, { id }) {
		return new Promise((resolve, reject) => {
			this.$axios.$get(`/orders/${id}`)
				.then(order => {
					commit("FETCH_SINGLE_ORDERS", { order })
					resolve()
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	checkout({ }, { address }) {
		return new Promise((resolve, reject) => {
			let formData = new FormData();

			formData.set("callbackUrl", location.origin.replace(/\/+$/, "") + "/account/orders")
			formData.set("addressId", address.id)

			this.$axios.$post(`/orders/`, formData)
				.then(paymentDetails => {
					location.href = paymentDetails.payment_url
					resolve(paymentDetails)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	fetchOrderItem({commit}, {id}) {
		return new Promise((resolve, reject) => {
			this.$axios.$get(`/orders/item/${id}`)
			.then(orderItem => {
					commit("FETCH_ORDER_ITEM", {orderItem})
					resolve()
				})
				.catch(err => {
					reject(err)
				})
		})
	 }
}