import Cookies from 'js-cookie'

export function checkAuthorization() {
  if (!Cookies.get('token')) {
    window.location.href = '/'
  }
}
