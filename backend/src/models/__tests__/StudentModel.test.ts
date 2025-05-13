import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { PersonModel } from '../StudentModel'; // Adjust the import path if necessary

describe('PersonModel', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    // Start in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    // Disconnect and stop the in-memory MongoDB server
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    // Clear the database after each test
    await PersonModel.deleteMany({});
  });

  it('should create and save a person successfully', async () => {
    const personData = {
      personID: 12345,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Student',
      authData: {
        userID: 1,
        passwordHash: 'secure_password_hash',
      },
    };

    const person = new PersonModel(personData);
    const savedPerson = await person.save();

    expect(savedPerson._id).toBeDefined();
    expect(savedPerson.personID).toBe(personData.personID);
    expect(savedPerson.name).toBe(personData.name);
    expect(savedPerson.email).toBe(personData.email);
    expect(savedPerson.role).toBe(personData.role);
    expect(savedPerson.authData).toEqual(personData.authData);
  });

  it('should not save a person without required fields', async () => {
    const personData = {
      name: 'John Doe',
    };

    const person = new PersonModel(personData);

    await expect(person.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it('should enforce role enum validation', async () => {
    const personData = {
      personID: 12345,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'InvalidRole', // Invalid role
      authData: {
        userID: 1,
        passwordHash: 'secure_password_hash',
      },
    };

    const person = new PersonModel(personData);

    await expect(person.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });
});
