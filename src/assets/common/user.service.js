import axios from './axios';
// const API_URL = 'http://localhost:3031';

export const UserService = {
    switchAccount(email) {
        return window.axios.post(`/agencySwitch`, {
            email: email
        });
    },
    switchUser(id) {
        return window.axios.get(`/userswitch/` + id)
    },
    getUsers() {
        return axios.get(`/getUsers`);
    },
    // disableNewDashboard() {
    //     return window.axios.post(`${USER_URL}/dashboard-toggle`, {dashboard_status: 0});
    // },
    // enableNewDashboard() {
    //     return window.axios.post(`${USER_URL}/dashboard-toggle`, {dashboard_status: 1});
    // },
    // getManagementSelectedProfile(){
    //     return window.axios.get(`${USER_URL}/getManagementSelectedProfile`);
    // },
    // setManagementSelectedProfile(profileId){
    //     return window.axios.post(`${USER_URL}/setManagementSelectedProfile`, {profileId});
    // }
}