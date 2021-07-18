import { Router } from 'express';
import { IDeletedUser, IUserOrder } from '../utils/interfaces';
import { addNewOrderToUser, deleteCurrentUser, getUserOrders, getUsersList, saveNewUsersList } from './utils';

const routerUsers = Router();

routerUsers.get('/get-all-users-admin', async (req, res) => {
  const usersList = await getUsersList();

  res.json(usersList);
});

routerUsers.get('/:userEmail', async (req, res) => {
  const userEmail = req.params.userEmail;
  const usersList = await getUsersList();
  const userOrders = await getUserOrders(userEmail, usersList);

  res.json(userOrders);
});

routerUsers.post('/set-order', async (req, res) => {
  const usersList = await getUsersList();
  const user = req.body as IUserOrder;
  const newUsersList = await addNewOrderToUser(usersList, user);
  await saveNewUsersList(newUsersList);

  res.json(newUsersList);
});

routerUsers.delete('/:id', async (req, res) => {
  const usersList = await getUsersList();
  const userId = req.params.id;
  const newUsersList = await deleteCurrentUser(userId, usersList);
  await saveNewUsersList(newUsersList);
  const successDeleteUser = {
    usersList: newUsersList,
    information: 'All ok! User has been deleted.',
  } as IDeletedUser;

  res.json(successDeleteUser);
});

export default routerUsers;
