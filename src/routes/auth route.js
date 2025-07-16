import { asymcHandeller } from "../utils/asyncHandeller.js";
import userAuth from "../controller/auth/auth logic.js";
import editAuth from "../controller/auth/editAuth logic.js";
import editUserDetails from "../controller/auth/editUserdetails logic.js";
import express from 'express'

const route = express.Router();

// main auth routes
route.post('/signup', asymcHandeller(userAuth.userSignup, 'user signup'));
route.post('/login', asymcHandeller(userAuth.userlogin, 'user login'));

// update auth routes
route.put('/email', asymcHandeller(editAuth.editEmail, 'updating user email'));
route.put('/phone', asymcHandeller(editAuth.editPhone, 'updating user phone number'));
route.put('/password', asymcHandeller(editAuth.editPassword, 'updating password'));

// update user details
route.put('/username', asymcHandeller(editUserDetails.editUsername, 'updating username'));
route.put('/birthyear', asymcHandeller(editUserDetails.editBirthyear, 'updating birth year details'));
route.put('/gender', asymcHandeller(editUserDetails.editGender, 'updating gender'));
route.put('/language', asymcHandeller(editUserDetails.editLanguage, 'updating language prefarance'));
route.put('/location', asymcHandeller(editUserDetails.editlocation, 'updating country prefarance'));

export default route;