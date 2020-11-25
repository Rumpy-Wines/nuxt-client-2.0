export default ({ store }) => {
    if (!store.state.auth.loggedIn) {
        try {
            store.commit("cart_store/VALIDATE_OFFLINE_CART_ITEMS")

        } catch (e) {}
    }
}