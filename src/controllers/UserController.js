import Controller from "@/controllers/BaseController";
import AuthController from "@/controllers/AuthController";

const authController = new AuthController();
const AUTHLINK_COLLECTION = "authLink";

export default class UserController extends Controller {
  constructor() {
    super();
  }

  async getUserFromAuthLink(userEmail) {
    const snapshot = await super.readByQuery("authLink", "email", userEmail)
    return snapshot.docs[0]
  }

  async createUserFromSigninLink(payload) {
    // Check if login comes from email signin of firebase
    if (authController.checkIfSigninIsFromEmailLink(payload.url)) {
      // Get user from authlink
      const userFromAuthLinkRes = await this.getUserFromAuthLink(payload.email);
      const userFromAuthLink = Object.assign(
        { id: userFromAuthLinkRes.id },
        userFromAuthLinkRes.data()
      );

      // Signin with email link
      await authController.signinUserWithEmailLink(payload.email, payload.url);
      const currentLoggedUser = await authController.getCurrentUser();

      // Update logged user password
      await authController.updateUserPassword(
        currentLoggedUser,
        payload.password
      );

      await super.createWithCustomId(
        'client',
        currentLoggedUser.uid,
        userFromAuthLink
      );

      // Delete Auth Link
      await super.delete(AUTHLINK_COLLECTION, userFromAuthLink.id)

      await super.update('client', currentLoggedUser.uid, { 'status': 'active' })

      const userFromFirestore = await super.readOne(
        'client',
        currentLoggedUser.uid
      );
      return Object.assign(
        { id: userFromFirestore.id },
        userFromFirestore.data()
      );
    }
  }

  async sendSignInLink(email, authLinkId) {
    return await authController.sendSignInLink(email, authLinkId, this.actionCodeSettings)
  }

  async getUserByEmail(email) {
    return super.readByQuery("authLink", "email", email);
  }

  async createAuthUser(payload) {
    const res = await super.create('authLink', payload.toFirestore());
    return res.id
  }

  actionCodeSettings(authLinkId) {
    return {
      handleCodeInApp: true,
      url: `${window.location.origin}/verification?al=${authLinkId}`
    }
  }
}
