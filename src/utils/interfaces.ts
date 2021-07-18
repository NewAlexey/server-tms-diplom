export interface ICategory {
  id: number;
  imgPath: string;
  categoryName: string;
}

export interface ICategoryCards {
  category: string;
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
}

export interface INewCategoryName {
  oldCategoryName: string;
  newCategoryName: string;
}

export interface IChangedCategoryData {
  newCardsList: ICategoryCards[];
  newCategoryList: ICategory[];
}

export interface IExistUserLoginInfo {
  email: string;
  password: string;
}

export interface INewUserLoginInfo {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IResponseCreateNewUser {
  message: string;
  userFullName: string;
  userEmail: string;
}

export interface IExistUserData {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  orders: IUserOrder[];
}

export interface IUserOrder {
  email: string;
  phone: string;
  order: IFilteredProduct[];
  totalMoney: string;
  date: string;
}

export interface IFilteredProduct {
  id: number;
  title: string;
  count: number;
  price: number;
}

export interface IUserLogin {
  isAdminLogin: boolean;
  userFullName: string;
  loginInfoData: string;
  userEmail: string;
}

export interface INewAccAdmin {
  oldPassword: string;
  newLogin: string;
  newPassword: string;
}

export interface IChangeAccAdmin {
  operationStatus: boolean;
  errMessage: string;
  infoMessage: string;
}

export interface IDeletedUser {
  usersList: IExistUserData[];
  information: string;
}
