import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex);

var baseUri = '/api/v1' 

const contactsStore = new Vuex.Store({

    state: {
      currentUserId: null,
      contactList: [],
      userList: [],
      contactDetails: [],
      showDialog: false,
      pageTitle: '',
      detailDrawer: false
    },
  
    mutations: {
      changeDialogState(state){
        state.showDialog = !state.showDialog 
      },
      toggleUserDetailDrawer(state){
        state.detailDrawer = !state.detailDrawer
      },
      updateCurrentUser(state, payload){
        state.currentUserId = payload
      },
      updateContactList(state, payload){
        state.contactList = payload
      },
      updatePageTitle(state, payload){
        state.pageTitle = payload
      },
      updateUserList(state, payload){
        state.userList = payload
      },
      updateContactDetails(state, payload){
        state.contactDetails = payload
      }
    },
  
    actions: {
  
        getAllUsers({commit, state}){
        Axios({
            //url: 'http://34.242.35.162:3000/api/v1/users/all',
            url: `${baseUri}/users`,
            method: 'GET'
        }).then((response) => {
            console.log(response)
            commit('updateUserList', response.data)
        }).catch((err) => {
            alert(err)
            console.log(err);
        })
        },

        getUserContactList({commit, state}){
        Axios({
            //url: `http://34.242.35.162:3000/api/v1/contacts/user/${state.currentUserId}/all`,
            url: `${baseUri}/contacts/user/${state.currentUserId}`,
            method: 'GET'
        }).then((response) => {
            console.log(response)
            commit('updateContactList', response.data)
        }).catch((err) => {
            alert(err)
            console.log(err);
        })
        },

        getAllContacts({commit,state}){
        Axios({
            //url: 'http://34.242.35.162:3000/api/v1/contacts/all',
            url: `${baseUri}/contacts`,
            method: 'GET'
        }).then((response) => {
            console.log(response.name)
            commit('updateContactList', response.data)
        }).catch((err) => {
            alert(err)
            console.log(err);
        })
        },

        getContactDetails({commit,state}, payload){
        Axios({
            //url: `http://34.242.35.162:3000/api/v1/contacts/details/${payload}`,
            url: `${baseUri}/contacts/${payload}`,
            method: 'GET'
        }).then((response) => {
            console.log(response)
            commit('updateContactDetails', response.data)
        }).catch((err) => {
            alert(err)
            console.log(err);
        })
        },

        insertUser({commit,state,dispatch}, payload){
        Axios({
            //url: 'http://34.242.35.162:3000/api/v1/users/add',
            url: `${baseUri}/users`,
            method: 'POST',
            data: {
                name: payload.name,
                surname: payload.surname
            }
        }).then((response) => {
            console.log(response)
            dispatch('getAllUsers')
            commit('changeDialogState')
        }).catch((err) => {
            alert(err)
            console.log(err);
        })
        },

        insertContact({commit,state,dispatch}, payload){
        Axios({
            //url: `http://34.242.35.162:3000/api/v1/contacts/user/${state.currentUserId}/add`,
            url: `/api/v1/contacts`,
            method: 'POST',
            data: {
                name: payload.name,
                surname: payload.surname,
                cellnumber: payload.cellNo,
                worknumber: payload.workNo ? payload.workNo : "",
                fkUserId: state.currentUserId
            }
        }).then((response) => {
            console.log(response)
            dispatch('getUserContactList')
            commit('changeDialogState')
        }).catch((err) => {
            alert(err)
            console.log(err);
        })
        },

        deleteContact({commit,state,dispatch}, payload){
        Axios({
            //url: `http://34.242.35.162:3000/api/v1/contacts/delete/${payload}`,
            url: `${baseUri}/contacts/${payload}`,
            method: 'DELETE',
        }).then((response) => {
            console.log(response)
            state.currentUserId !== null ? dispatch('getUserContactList') : dispatch('getAllContacts')
        }).catch((err) => {
            alert(err)
            console.log(err);
        })
        },

        deleteUser({commit,state,dispatch}, payload){
        Axios({
            //url: `http://34.242.35.162:3000/api/v1/users/${payload}/delete`,
            url: `${baseUri}/users/${payload}`,
            method: 'DELETE',
        }).then((response) => {
            console.log(response)
            dispatch('getAllUsers')
        }).catch((err) => {
            alert(err)
            console.log(err);
        })
        }
    }
  
  })

  export default contactsStore