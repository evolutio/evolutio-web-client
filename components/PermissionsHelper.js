export default {
    has_edit_access
};

function has_edit_access(store, content){
    const user = store.state.logged_user;
    return user && user.permissions && user.permissions.ADMIN;
}