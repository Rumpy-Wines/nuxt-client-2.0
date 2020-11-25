import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/store';

export const state = () => ({
	list: []
})

export type AddressStoreState = ReturnType<typeof state>

export const getters: GetterTree<AddressStoreState, RootState> = {

}

export const mutations: MutationTree<AddressStoreState> = {
	FETCH_ALL_ADDRESSES(state, { addresses }) {
		state.list = addresses
	}
}

export const actions: ActionTree<AddressStoreState, RootState> = {
	fetchAllAddresses({ commit }) {
		return new Promise((resolve, reject) => {
			this.$axios.$get("/address")
				.then(addresses => {
					commit("FETCH_ALL_ADDRESSES", { addresses })
					resolve()
				}).catch(err => { reject(err) })
		})
	},
	updateAddress({ dispatch }, { address, formData }) {
		return new Promise((resolve, reject) => {
			let data = new FormData();

			if (formData) data = formData
			else
				Object.keys(address).forEach(key => {
					data.set(key, address[key]);
				})

			this.$axios.put("/address", data)
				.then(async () => {
					await dispatch("fetchAllAddresses")
					resolve()
				}).catch(err => {
					reject(err)
				})

		})
	},
	createAddress({ dispatch }, { address, formData }) {
		return new Promise((resolve, reject) => {
			let data = new FormData();

			if (formData) data = formData
			else
				Object.keys(address).forEach(key => {
					data.set(key, address[key]);
				})

			this.$axios.post("/address", data)
				.then(async () => {
					await dispatch("fetchAllAddresses")
					resolve()
				}).catch(err => {
					reject(err)
				})

		})
	},

	deleteAddress({ dispatch }, { address }) {
		return new Promise((resolve, reject) => {
			this.$axios.delete(`/address/${address.id}`)
				.then(async () => {
					await dispatch("fetchAllAddresses")
					resolve()
				}).catch(err => {
					reject(err)
				})

		})
	},
}