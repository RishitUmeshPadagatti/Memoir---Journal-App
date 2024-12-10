import express from "express";
import { 
  createJournalEntry, 
  getJournalEntries, 
  updateJournalEntry, 
  deleteJournalEntry,
  getSingleJournalEntry
} from "../controllers/journalController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { validateJournalEntry } from "../middleware/validationMiddleware.js";
import {generateDailyReflectionTitle} from "../utils/openaiUtils.js"

const router = express.Router();


router.post(
  '/', 
  authenticateToken, 
  validateJournalEntry,
  createJournalEntry
);

router.get(
  '/', 
  authenticateToken, 
  getJournalEntries
);


router.get(
  '/:id', 
  authenticateToken, 
  getSingleJournalEntry
);

router.put(
  '/:id', 
  authenticateToken, 
  validateJournalEntry,
  updateJournalEntry
);


router.delete(
  '/:id', 
  authenticateToken, 
  deleteJournalEntry
);

router.get('/generateDailyReflectionTitle',authenticateToken,generateDailyReflectionTitle)

export default router