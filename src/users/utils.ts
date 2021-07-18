import fs from 'fs/promises';
import { IExistUserData, INewUserLoginInfo, IUserOrder } from '../utils/interfaces';

const LAST_USER = 0;

export const getUsersList = async (): Promise<IExistUserData[]> => {
  const requestUsersList = await fs.readFile('./src/data/users-list.json');
  const usersList = (await JSON.parse(requestUsersList.toString())) as IExistUserData[];
  return Promise.resolve(usersList);
};

export const addNewOrderToUser = async (
  usersList: IExistUserData[],
  userOrder: IUserOrder
): Promise<IExistUserData[]> => {
  const newUsersList = usersList.map((user) => {
    if (user.email === userOrder.email) {
      user.orders.push(userOrder);
    }
    return user;
  });
  return newUsersList;
};

export const saveNewUsersList = async (newUsersList: IExistUserData[]): Promise<void> => {
  try {
    await fs.writeFile('./src/data/users-list.json', JSON.stringify(newUsersList));
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getUserOrders = async (userEmail: string, userList: IExistUserData[]): Promise<IUserOrder[]> => {
  const userInfo = userList.find((user) => user.email === userEmail);
  if (userInfo) {
    const userOrders = userInfo.orders;
    return Promise.resolve(userOrders);
  } else {
    return Promise.reject();
  }
};

const getNewId = (usersList: IExistUserData[]): number => {
  return usersList.reduce((acc, user) => {
    if (user.id > acc) {
      acc = user.id;

      return acc;
    }

    return acc;
  }, 0);
};

export const saveNewUserInList = async (
  newUser: INewUserLoginInfo,
  existUserList: IExistUserData[]
): Promise<boolean> => {
  const newId = getNewId(existUserList);
  const newUserModel = {
    id: newId + 1,
    email: newUser.email,
    password: newUser.password,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    orders: [],
  } as IExistUserData;
  existUserList.push(newUserModel);
  try {
    await fs.writeFile('./src/data/users-list.json', JSON.stringify(existUserList));
    return Promise.resolve(true);
  } catch (err) {
    return Promise.reject(false);
  }
};

export const deleteCurrentUser = async (id: string, userList: IExistUserData[]): Promise<IExistUserData[]> => {
  return userList.filter((user) => user.id !== +id);
};
