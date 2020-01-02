import * as actionTypes from "../utils/actionTypes"
import axios from 'axios'

const http = axios.create({
  baseURL: 'https://gourmet-now.site/api/',
  timeout: 2000,
})

// Notification
export const setNotification = (variant, message) => ({
  type: actionTypes.SET_NOTIFICATION,
  variant: variant,
  message: message
})

export const closeNotification = () => ({
  type: actionTypes.CLOSE_NOTIFICATION
})

// Login dialog
export const toggleLoginDialog = () => ({
  type: actionTypes.TOGGLE_LOGIN_DIALOG
})

export const closeLoginDialog = () => ({
  type: actionTypes.CLOSE_LOGIN_DIALOG
})

// Save answer of each questions
export const saveAnswers = (questionTypes, answer) => {
  switch (questionTypes) {
    case 'PEOPLE':
      return {
        type: actionTypes.PEOPLE_ANSWER,
        answer: answer
      }
    case 'BUDGET':
      return {
        type: actionTypes.BUDGET_ANSWER,
        answer: answer
      }
    case 'GENRE':
      return {
        type: actionTypes.GENRE_ANSWER,
        answer: answer
      }
    default:
      return
  }
}

// Save answer of amount
export const saveAmountAnswer = (questionTypes) => {
  switch (questionTypes) {
    case 'FREE_FOOD':
      return {
        type: actionTypes.FREE_FOOD
      }
    case 'FREE_DRINK':
      return {
        type: actionTypes.FREE_DRINK
      }
    case 'FREE_FOOD_DRINK':
      return {
        type: actionTypes.FREE_FOOD_DRINK,
      }
    default:
      return {
        type: ''
      }
  }
}

// Get user
export function getUser() {
  return async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('token')).token
    http.get('user', {
      headers: { Authorization: `Bearer ${token}` },
      data: {}
    }).then((res) => {
      dispatch({ type: actionTypes.SET_NAME, name: res.data.name })
      dispatch({ type: actionTypes.LOGIN_SUCCESS })
    }).catch(() => {
      dispatch({ type: actionTypes.LOGOUT_SUCCESS })
    })
  }
}

// Set name
export const setName = (name) => ({
  type: actionTypes.SET_NAME,
  name: name
})

// HTTP request
export const httpSuccess = () => ({
  type: actionTypes.HTTP_SUCCESS
})

export const httpFailure = () => ({
  type: actionTypes.HTTP_FAILURE
})

export const httpRequest = () => ({
  type: actionTypes.HTTP_REQUEST
})

// Jwt signup
export function jwtSignupUser({ name, furigana, email, password, password_confirmation }) {
  return async (dispatch) => {
    try {
      // Memo: {hoge}でhoge:fugaと値が取れる
      dispatch({ type: actionTypes.HTTP_REQUEST })
      const res = await http.post(`signup`, { name, furigana, email, password, password_confirmation })
      const datalist = {
        'token': res.data.token,
        'exp': res.data.exp
      }
      localStorage.setItem('token', JSON.stringify(datalist))
      localStorage.setItem('favorites', JSON.stringify(res.data.favorites))
      dispatch({ type: actionTypes.SET_NAME, name: name })
      dispatch({ type: actionTypes.LOGIN_SUCCESS })
      dispatch({ type: actionTypes.HTTP_SUCCESS, })
      dispatch({ type: actionTypes.SET_NOTIFICATION, variant: 'success', message: 'サインインに成功しました！' })
    } catch (error) {
      dispatch({ type: actionTypes.HTTP_FAILURE, })
      dispatch({ type: actionTypes.SET_NOTIFICATION, variant: 'warning', message: 'サインインに失敗しました。' })
    }
  }
}

// Jwt login
export function jwtLoginUser({ email, password }) {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.HTTP_REQUEST })
      const res = await http.post('login', { email, password })
      const datalist = {
        'token': res.data.token,
        'exp': res.data.exp
      }
      localStorage.setItem('token', JSON.stringify(datalist))
      localStorage.setItem('favorites', JSON.stringify(res.data.favorites))
      dispatch({ type: actionTypes.SET_NAME, name: res.data.name })
      dispatch({ type: actionTypes.LOGIN_SUCCESS })
      dispatch({ type: actionTypes.HTTP_SUCCESS })
      dispatch({ type: actionTypes.SET_NOTIFICATION, variant: 'success', message: 'ログインに成功しました！' })
    } catch (error) {
      console.log(error)
      dispatch({ type: actionTypes.HTTP_FAILURE, })
      dispatch({ type: actionTypes.SET_NOTIFICATION, variant: 'warning', message: 'ログインに失敗しました。' })
    }
  }
}

// Jwt logout
export function jwtLogoutUser() {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.HTTP_REQUEST })
      const token = JSON.parse(localStorage.getItem('token')).token
      await http.get('logout', {
        headers: { Authorization: `Bearer ${token}` },
        data: {}
      })
      localStorage.clear()
      dispatch({ type: actionTypes.LOGOUT_SUCCESS })
      dispatch({ type: actionTypes.HTTP_SUCCESS })
      dispatch({ type: actionTypes.SET_NOTIFICATION, variant: 'success', message: 'ログアウトに成功しました！' })
    } catch (error) {
      dispatch({ type: actionTypes.HTTP_FAILURE, })
      dispatch({ type: actionTypes.SET_NOTIFICATION, variant: 'warning', message: 'ログアウトに失敗しました。' })
    }
  }
}

// Get favorites
export function getFavorites() {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).token
      const res = await http.get('favorites', {
        headers: { Authorization: `Bearer ${token}` },
        data: {}
      })
      localStorage.setItem('favorites', JSON.stringify(res.data.favorites))
      dispatch(actionTypes.LOGIN_SUCCESS)
    } catch (error) {
      dispatch({ type: actionTypes.HTTP_FAILURE })
    }
  }
}

// Add a favorite
export function addFavorite(id, title, cat, img, url) {
  return async (dispatch) => {
    try {
      const data = {
        id: id,
        title: title,
        catch: cat,
        img_url: img,
        shop_url: url,
      }
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token
      }

      const res = await http.post('favorite', data, { headers: headers })
      localStorage.setItem('favorites', JSON.stringify(res.data.favorites))
    } catch (error) {
      dispatch({ type: actionTypes.HTTP_FAILURE })
    }
  }
}

// Delete a favorite
export function delFavorite(id) {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).token
      const res = await http.delete('favorite', {
        headers: { Authorization: `Bearer ${token}` },
        data: {},
        params: { id: id }
      })
      localStorage.setItem('favorites', JSON.stringify(res.data.favorites))
    } catch (error) {
      dispatch({ type: actionTypes.HTTP_FAILURE })
    }
  }
}

// Switch isAuthenticated to true
export const loginUser = () => {
  dispatch(actionTypes.LOGIN_SUCCESS)
}

// Switch isAuthenticated to false
export const logoutUser = () => {
  dispatch(actionTypes.LOGOUT_SUCCESS)
}