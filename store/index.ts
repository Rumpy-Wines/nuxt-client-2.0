import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
}

export const mutations: MutationTree<RootState> = {
}

interface RegisterValuesInterface {
	name: string,
	email: string,
	password: string
}
interface LoginDetailsInterface {
	email: string,
	password: string
}
export const actions: ActionTree<RootState, RootState> = {
	register({dispatch}, userData : RegisterValuesInterface) {
		return new Promise((resolve, reject) => {
			this.$axios.post('/api/v1/register', userData)
				.then(() => {
					dispatch('login', userData)
					// resolve()
				}).catch(err => {reject(err)})
		})
	},
	login({}, data : LoginDetailsInterface) {
		return new Promise((resolve, reject) => {
			//@ts-ignore
			this.$auth.login({data})
				.catch((err : any) => {
					reject(err.response.data.data)
				})

		})
	}
}