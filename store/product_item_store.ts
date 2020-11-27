import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/store';
// import devalue from

export const state = () => ({
	paginationData: { content: [] },
	categoryPaginationData: {
		RED: { content: [] },
		ROSE: { content: [] },
		WHITE: { content: [] },
		SPARKLING: { content: [] },
	},
	categoryMap: {
		RED: 'Red Wine',
		ROSE: 'Rosé',
		SPARKLING: "Sparkling Wine",
		WHITE: "White Wine"
	}
})

export type ProductItemState = ReturnType<typeof state>

export const getters: GetterTree<ProductItemState, RootState> = {
}

export const mutations: MutationTree<ProductItemState> = {
	FETCH_PRODUCT_ITEMS(state, { paginationData }) {
		let content: Array<any> = state.paginationData.content || []

		for (let item of paginationData.content.reverse()) {
			let index = content.findIndex(el => el.id == item.id)
			if (index < 0) content.unshift(item)
			else content.splice(index, 1, item)
		}

		paginationData.content = content
		state.paginationData = paginationData
	},
	FETCH_PRODUCT_ITEMS_BY_CATEGORY(state, { paginationData, category }) {
		//@ts-ignore
		state.categoryPaginationData[category] = state.categoryPaginationData[category] || {}
		//@ts-ignore
		let content: Array<any> = state.categoryPaginationData[category].content || []
		
		//@ts-ignore
		for (let item of paginationData.content.reverse()) {
			let index = content.findIndex(el => el.id == item.id)
			if (index < 0) content.unshift(item)
			else content.splice(index, 1, item)
		}

		paginationData.content = content
		
		//@ts-ignore
		state.categoryPaginationData[category] = paginationData
	},
	FETCH_SINGLE_PRODUCT_ITEM(state, { productItem }) {
		let index = state.paginationData.content.findIndex((el: any) => el.id == productItem.id)

		//@ts-ignore
		if (index < 0) state.paginationData.content.unshift(productItem)
		//@ts-ignore
		else state.paginationData.content.splice(index, 1, productItem)
	}
}
export const actions: ActionTree<ProductItemState, RootState> = {
	fetchProductItems({ commit }, { page }) {
		let qpage: number = page || 0
		return new Promise((resolve, reject) => {
			this.$axios.get(`/product-items?page=${qpage}`)
			.then(response => response.data)
				.then(paginationData => {
					commit("FETCH_PRODUCT_ITEMS", { paginationData })
					resolve()
				}).catch(err => { reject(err) })
		})
	},
	fetchProductItemsByCategory({ commit }, { page, category }) {
		let qpage: number = page || 0
		return new Promise((resolve, reject) => {
			this.$axios.$get(`/product-items/category/${category}?page=${qpage}`)
				.then(paginationData => {
					commit("FETCH_PRODUCT_ITEMS_BY_CATEGORY", { paginationData, category })
					resolve()
				}).catch(err => { reject(err) })
		})
	},
	fetchSingleProductItem({ commit }, { id }) {
		return new Promise((resolve, reject) => {
			this.$axios.$get(`/product-items/${id}`)
				.then(productItem => {
					commit("FETCH_SINGLE_PRODUCT_ITEM", { productItem })
					resolve()
				}).catch(err => { reject(err) })
		})
	},

	addToCart({ commit }, { product }) {
		return new Promise((resolve, reject) => {
			resolve()
		})
	}
}