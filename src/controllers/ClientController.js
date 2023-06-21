import Controller from "@/controllers/BaseController";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import ClientModel from "@/models/ClientModel";

const collection = 'client';

export default class ClientController extends Controller {
  async login(email, password) {
    const userResponse = await signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return userResponse;
  }

  async getAll() {
    const snapshot = await super.read(collection);
    const clients = snapshot.docs.map((doc) =>
    ClientModel.fromFirestore({ ...doc.data(), id: doc.id })
  );
  return clients
  }

  async getClientById(docId) {
    const snapshot = await super.readOne(collection, docId);
    return ClientModel.fromFirestore({ ...snapshot, id: snapshot.id });
  }
}
