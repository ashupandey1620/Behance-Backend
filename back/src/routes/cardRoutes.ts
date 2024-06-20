import { Router } from "express";
import cardController from '../controllers/cardController';

import { authenticateToken } from "../middleware/authMiddleware";
const router = Router();

//card data routes
router.post("/add", cardController.addCard);
router.post("/addAll", cardController.addManyCards);
router.get("/all", cardController.getAllCards);
router.get("/specific/:id", cardController.getCard);
router.get("/like/:id", cardController.likeCard);
router.get("/liked",authenticateToken, cardController.likeCard);
router.get("/delete/:id",cardController.deleteCard);
router.get("/deleteAll", cardController.deleteAllCards);


export default router;
