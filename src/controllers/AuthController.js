import Controller from "@/controllers/BaseController";
import { auth } from "@/firebase";
import {
    sendSignInLinkToEmail,
    signInWithEmailLink,
    isSignInWithEmailLink,
    useDeviceLanguage,
    sendPasswordResetEmail,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updatePassword
} from "firebase/auth";

export default class AuthController extends Controller {
    constructor() {
        super();
    }

    checkIfSigninIsFromEmailLink(url) {
        return isSignInWithEmailLink(auth, url)
    }

    async signinUserWithEmailLink(email, url) {
        return signInWithEmailLink(auth, email, url)
    }

    async updateUserPassword(user, password) {
        return updatePassword(user, password)
    }

    async sendSignInLink(email, authLinkId, actionCodeSettings) {
        useDeviceLanguage(auth);
        return sendSignInLinkToEmail(
            auth,
            email,
            actionCodeSettings(authLinkId)
        );
    }

    async sendPasswordResetLink(email, actionClientSettings) {
        useDeviceLanguage(auth);
        return sendPasswordResetEmail(
            auth,
            email,
            actionClientSettings
        );
    }

    async createAuthUser(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    async autoLogin() {
        return this.getCurrentUser();
    }

    async login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    async logout() {
        return signOut(auth)
    }

    getCurrentUser() {
        return new Promise((resolve, reject) => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                unsubscribe();
                resolve(user);
            }, reject);
        })
    }
}