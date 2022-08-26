import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});


class Api {

  static singIn(email, password) {
    return api.post('/users/sign-in', { email: 'gor.gasparyan@analysed.ai', password: 'GorAnalysed2022' });
  }

  static getAllInfo(userId) {
    return api.get(`admin/get-all-info/${userId}`)
  }

  static createUserFromAdminPage(adminID, requestData) {
    return api.post(`admin/create-user/${adminID}`, requestData);
  }

  static updateUserStatus(adminID, requestData) {
    return api.put(`admin/update-user-status/${adminID}`, requestData);
  }

  static deleteUserById(adminID, requestData) {
    return api.delete(`admin/delete-user/${adminID}`, { data: { requestData } });
  }
  static getAllGraphsInfo(adminID, requestData) {
    return api.get(`admin/get-all-graphs-info/${adminID}`, {
      params: requestData, // { search: '', page: '', nodeFrom: 0, nodeTo: 100, linkFrom: 0, linkTo: 100 }
    });
  }
  static getAllUsersInfo(adminID, requestData) {
    return api.get(`admin/get-all-users-info/${adminID}`, {
      params: requestData // { page: '', search: '' }
    });
  }
  static getSingleGraphInfo(adminID, requestData) {
    return api.get(`admin/get-single-graph-info/${adminID} `, {
      params: requestData, // {graphId: ''}
    });
  }
  static getSingleUserInfo(adminID, requestData) {
    return api.get(`admin/get-single-user-info/${adminID} `, {
      params: requestData, //{ userId: '' }
    });
  }
}

export default Api;