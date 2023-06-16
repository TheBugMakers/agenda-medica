import {
  addDoc,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  collection,
  arrayUnion
} from "firebase/firestore";
import { db, storage } from "@/firebase/index";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

export default class Controller {
  constructor() {}

  async create(col, payload) {
    return addDoc(collection(db, col), payload);
  }

  async createWithCustomId(col, docId, payload) {
    const ref = doc(db, `${col}/${docId}`);
    return setDoc(ref, payload);
  }

  async read(col) {
    const q = query(collection(db, col));
    return getDocs(q);
  }

  async readByQuery(col, parameter, condition) {
    const q = query(collection(db, col), where(parameter, "==", condition));
    return getDocs(q);
  }

  async readOne(col, docId) {
    const ref = doc(db, `${col}/${docId}`);
    const res = (await getDoc(ref)).data();
    return res;
  }

  async upload(path, file, clientId, type, data) {
    const storageRef = ref(storage, path);
    if (type == "medicine") {
      await uploadBytes(storageRef, file).then((response) => {
        getDownloadURL(storageRef).then((url) => {
          const updateClientDoc = doc(db, "client", clientId);
          updateDoc(updateClientDoc, {
            medicine: arrayUnion({
              doctor: data.doctor,
              dose: data.dose,
              finish: data.end,
              name: data.name,
              start: data.start,
            }),
            documents: arrayUnion({
              link: url,
              name: file.name,
              path: path,
              type: 'Medicine'
            }),
          });
        });
      });
    } else {
      await uploadBytes(storageRef, file).then((response) => {
        getDownloadURL(storageRef).then((url) => {
          const updateClientDoc = doc(db, "client", clientId);
          updateDoc(updateClientDoc, {
            documents: arrayUnion({
              link: url,
              name: file.name,
              path: path,
              type: 'Report'
            }),
          });
        });
      });
    }
  }

  async update(col, docId, payload) {
    const ref = doc(db, `${col}/${docId}`);
    await updateDoc(ref, payload);
  }

  async delete(col, docId) {
    const ref = doc(db, `${col}/${docId}`);
    await deleteDoc(ref);
  }
}
