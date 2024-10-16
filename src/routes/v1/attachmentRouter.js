import express from 'express';
import attachmentController from '~/controllers/attachmentController';
import { attachmentValidation } from '~/validations/attachmentValidation';

const router = express.Router();

router.get('/:id', attachmentController.getDetail);
router.post('/', attachmentValidation.store, attachmentController.store);
router.put('/:id', attachmentValidation.update, attachmentController.update);
router.delete('/:id', attachmentValidation.destroy, attachmentController.destroy);

export default router;
