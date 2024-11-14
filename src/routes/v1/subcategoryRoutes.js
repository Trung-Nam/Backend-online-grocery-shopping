import express from 'express';
import { createSubcategory, getSubcategories, getSubcategory, updateSubcategory, deleteSubcategory } from '~/controllers/subcategoryController.js';

const router = express.Router();

router.get('/', getSubcategories);
router.post('/', createSubcategory);
router.get('/:id', getSubcategory);
router.put('/:id', updateSubcategory);
router.delete('/:id', deleteSubcategory);

export default router;
