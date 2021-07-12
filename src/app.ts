import express from 'express';
import cors from 'cors';
import path from 'path';
import { json } from 'body-parser';
import routerUsers from './users/router';
import routerLogin from './login/router';

const app = express();
app.use(json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/login', routerLogin);
app.use('/users', routerUsers);
app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(process.env.PORT || 3001, () => console.log(`Server started on ${process.env.PORT}`));
