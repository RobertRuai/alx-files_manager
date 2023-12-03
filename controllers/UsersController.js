import DBClient from '../utils/db';
import RedisClient from '../utils/redis';
import sha1 from 'sha1';

const { ObjectId } = require('mongodb');

class UsersController {
  static async postNew(request, response) {
    const email = request.body.email;
    if (!email) return response.status(400).send({ error: 'Missing email' });

    const password = request.body.password;
    if (!password) return response.status(400).send({ error: 'Missing password' });

    const oldEmail = await DBClient.db
      .collection('users')
      .findOne({ email: email });
    if (oldEmail) return response.status(400).send({ error: 'Already exist' });

    const shapswd = sha1(password);
    const result = await DBClient.db
      .collection('users')
      .insertOne({ email: email, password: shapswd });

    return response
      .status(201)
      .send({ id: new ObjectId(), email: email });
  }
}

module.exports = UsersController;
