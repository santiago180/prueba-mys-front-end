/**
 * @author Santiago Torres
 * seteamos el token en local storage
 */
export function setLoginUser(state, login_user) {
    state.login_user = login_user.token
}