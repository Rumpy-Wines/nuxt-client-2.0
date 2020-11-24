import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
}

export const mutations: MutationTree<RootState> = {
}

interface RegisterValuesInterface {
	passwordConfirmation: string,
	email: string,
	password: string
}
interface LoginDetailsInterface {
	email: string,
	password: string
}
export const actions: ActionTree<RootState, RootState> = {
	register({ dispatch }, {email, password, passwordConfirmation}: RegisterValuesInterface) {
		return new Promise((resolve, reject) => {
			let userData = new FormData

			userData.set("email", email)
			userData.set("password", password)
			userData.set("passwordConfirmation", passwordConfirmation)

			this.$axios.post('/auth/register', userData)
				.then(async() => {
					await dispatch('login', {email, password})
					resolve()
				}).catch(err => { reject(err.response.data) })
		})
	},
	login({ dispatch }, {email, password}: LoginDetailsInterface) {
		return new Promise((resolve, reject) => {
			let formData = new FormData()

			formData.set("email", email)
			formData.set("password", password)

			//@ts-ignore
			this.$auth.login({ data: formData })
				.then(async() => {
					dispatch("cart_store/moveCartOnline")
					resolve()
				})
				.catch((err: any) => {
					reject(err.response.data)
				})

		})
	},
	setupUser({}, {formData}) {
		return new Promise((resolve, reject) => {
			this.$axios.post("/auth/setup", formData)
			.then(async () => {
				//@ts-ignore
				await this.$auth.fetchUser()
				resolve()
			})
		})
	}
}