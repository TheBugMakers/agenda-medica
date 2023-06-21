import Controller from "@/controllers/BaseController";
import {
  doc,
  updateDoc,
  collection,
  arrayUnion
} from "firebase/firestore";
import { db } from "@/firebase/index";

const col = "appointment";

export default class AppointmentController extends Controller {
  async getAll() {
    const snapshot = await super.read(col);
    const appointments = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return appointments;
  }

  async getById(docId) {
    const snapshot = await super.readOne(col, docId);
    return { ...snapshot, id: snapshot.id };
  }

  async getByUserId(userId) {
    const snapshot = await super.readByQuery(col, "client", userId);
    const appointments = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return appointments;
  }

  async createAppointment(payload) {
    const a = await super.create("appointment", payload.data);
    const ref = doc(db, `client/${ payload.id}`);
    await updateDoc(ref, {
      appointments: arrayUnion(a.id)
    });
    console.log(a.id);
  }

  async update(payload) {
    await super.update(col, payload.id, {'status': payload.status})
  }
}
