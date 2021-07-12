import { Router } from 'express';
import { IUserOrder } from '../utils/interfaces';
import { addNewOrderToUser, getUserOrders, getUsersList, saveNewUsersList } from './utils';

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

export default routerUsers;
