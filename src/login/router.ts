import { Router } from 'express';
import { getUsersList, saveNewUserInList } from '../users/utils';
import {
  IExistUserLoginInfo,
  IChangeAccAdmin,
  INewAccAdmin,
  IUserLogin,
  INewUserLoginInfo,
  IResponseCreateNewUser,
} from '../utils/interfaces';
import { checkUser, getLoginAdminData, updateAdminAccData } from './utils';

const routerLogin = Router();

routerLogin.post('/', async (req, res) => {
  const loginData = await getLoginAdminData();
  const requestLoginData = req.body as IExistUserLoginInfo;
  if (requestLoginData.email.includes('@')) {
    const userIsCheked = await checkUser(requestLoginData);
    if (userIsCheked.status) {
      const user = {
        isAdminLogin: false,
        userFullName: `${userIsCheked.fullName}`,
        userEmail: requestLoginData.email,
      } as IUserLogin;

      res.json(user);
    } else {
      const user = { isAdminLogin: false, loginInfoData: userIsCheked.message } as IUserLogin;

      res.json(user);
    }
  } else if (requestLoginData.email === loginData.email) {
    if (requestLoginData.password === loginData.password) {
      const user = { isAdminLogin: true, loginInfoData: 'Hello admin' } as IUserLogin;

      res.json(user);
    } else {
      const user = { isAdminLogin: false, loginInfoData: 'Wrong password' } as IUserLogin;

      res.json(user);
    }
  } else {
    const user = { isAdminLogin: false, loginInfoData: "Can't find this user" } as IUserLogin;

    res.json(user);
  }
});

routerLogin.post('/change-admin-account', async (req, res) => {
  const accountData = await getLoginAdminData();
  const requestLoginData = req.body as INewAccAdmin;
  if (accountData.password === requestLoginData.oldPassword) {
    await updateAdminAccData(accountData, requestLoginData);
    const infoMessage = 'Admin login data has been changed';
    const changedAdminData = { operationStatus: true, errMessage: '', infoMessage } as IChangeAccAdmin;

    res.json(changedAdminData);
  } else {
    const errMessage = 'Old Password is not match';
    const changedAdminData = { operationStatus: false, errMessage, infoMessage: '' } as IChangeAccAdmin;

    res.json(changedAdminData);
  }
});

routerLogin.post('/create-new-user', async (req, res) => {
  const newUserInfo = req.body as INewUserLoginInfo;
  const existUserList = await getUsersList();
  const isExistEmail = existUserList.find((user) => user.email === newUserInfo.email);
  if (isExistEmail) {
    const responseCreateNewUser = { message: 'User with this email already exist.' } as IResponseCreateNewUser;

    res.json(responseCreateNewUser);
  } else {
    const savedUser = await saveNewUserInList(newUserInfo, existUserList);
    if (savedUser) {
      const responseCreateNewUser = {
        message: '',
        userFullName: `${newUserInfo.firstName} ${newUserInfo.lastName}`,
        userEmail: newUserInfo.email,
      } as IResponseCreateNewUser;

      res.json(responseCreateNewUser);
    } else {
      const responseCreateNewUser = { message: 'Something wrong...' } as IResponseCreateNewUser;

      res.json(responseCreateNewUser);
    }
  }
});

export default routerLogin;
