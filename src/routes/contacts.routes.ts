import { Router } from "express";
import {
    listContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
} from "../controllers/contacts.controller";
import { methodNotAllowed } from "../middleware/methodNotAllowed";

const router = Router();

router
    .route("/")
    .get(listContacts)
    .post(createContact)
    .all(methodNotAllowed);

router
    .route("/:id")
    .get(getContact)
    .put(updateContact)
    .delete(deleteContact)
    .all(methodNotAllowed);

export default router;
