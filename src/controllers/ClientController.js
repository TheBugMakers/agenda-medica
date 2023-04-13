import Controller from "@/controllers/BaseController";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default class ClientController extends Controller {
    async login(email, password) {
        const userResponse = await signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                return response
            })
            .catch((error) => {
                console.log(error)
            });
            return userResponse

    }
}