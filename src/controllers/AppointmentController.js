import Controller from "@/controllers/BaseController";

const collection = 'appointment';

export default class AppointmentController extends Controller {

  async getAll() {
    const snapshot = await super.read(collection);
    const appointments = snapshot.docs.map((doc) =>
    ({ ...doc.data(), id: doc.id })
  );
  return appointments
  }

  async getById(docId) {
    const snapshot = await super.readOne(collection, docId);
    return ({ ...snapshot, id: snapshot.id });
  }

  async getByUserId(userId) {
    const snapshot = await super.readByQuery(collection, 'client', userId)
    const appointments = snapshot.docs.map((doc) =>
    ({ ...doc.data(), id: doc.id })
  );
  return appointments
  }
}
