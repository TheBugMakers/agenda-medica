import { addDoc, doc, setDoc, updateDoc, query, where, getDocs, getDoc, deleteDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/index";

export default class Controller {
  constructor() { }

  async create(col, payload) {
    return addDoc(collection(db, col), payload);
  }

  async createWithCustomId(col, docId, payload) {
    const ref = doc(db, `${col}/${docId}`);
    return setDoc(ref, payload);
  }

  async read(col) {
    const q = query(collection(db, col));
    return getDocs(q)
  }

  async readByQuery(col, parameter, condition) {
    const q = query(collection(db, col), where(parameter, "==", condition));
    return getDocs(q);
  }

  async readOne(col, docId) {
    const ref = doc(db, `${col}/${docId}`);
    return getDoc(ref);
  }

  async update(col, docId, payload) {
    const ref = doc(db, `${col}/${docId}`);
    await updateDoc(ref, payload)
  }

  async delete(col, docId) {
    const ref = doc(db, `${col}/${docId}`)
    await deleteDoc(ref);
  }
}