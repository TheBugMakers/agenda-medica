import Controller from "@/controllers/BaseController";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default class ClientController extends Controller {
    async login(email, password) {
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("deu certo no controller")
            })
            .catch((error) => {
                console.log(error)
            });

    }
}