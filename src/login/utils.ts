import fs from 'fs/promises';
import { IExistUserData, IExistUserLoginInfo, INewAccAdmin } from '../utils/interfaces';

export const getLoginAdminData = async (): Promise<IExistUserLoginInfo> => {
  const requestLoginData = await fs.readFile('./src/login/login-data.json');
  const loginData = (await JSON.parse(requestLoginData.toString())) as IExistUserLoginInfo;
  return Promise.resolve(loginData);
};

interface ICheckUser {
  message: string;
  status: boolean;
  fullName: string;
}

export const checkUser = async (user: IExistUserLoginInfo): Promise<ICheckUser> => {
  const requestUsersList = await fs.readFile('./src/data/users-list.json');
  const usersList = (await JSON.parse(requestUsersList.toString())) as IExistUserData[];
  const isFindUser = usersList.find((existUser) => existUser.email === user.email);
  if (!isFindUser) {
    const result = { message: 'Cant find this user', status: false, fullName: '' };
    return result;
  } else {
    const isComrapePass = usersList.find(
      (existUser) => existUser.email === user.email && existUser.password === user.password
    );
    if (!isComrapePass) {
      const result = { message: 'Wrong password', status: false, fullName: '' };
      return result;
    } else {
      const result = { message: '', status: true, fullName: `${isComrapePass.firstName} ${isComrapePass.lastName}` };
      return result;
    }
  }
  // if (isFindUser) {
  //   const nameUserData = `${isFindUser.firstName} ${isFindUser.lastName}`;
  //   return Promise.resolve(nameUserData);
  // } else {
  //   Promise.reject(false);
  // }
};

export const updateAdminAccData = async (
  accountData: IExistUserLoginInfo,
  requestLoginData: INewAccAdmin
): Promise<void> => {
  const newAccountData = {} as IExistUserLoginInfo;
  Object.assign(newAccountData, accountData);
  newAccountData.email = requestLoginData.newLogin;
  newAccountData.password = requestLoginData.newPassword;
  await fs.writeFile('./src/admin/login-data.json', JSON.stringify(newAccountData));
};
