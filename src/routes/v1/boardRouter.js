import express from 'express';
import boardController from '~/controllers/boardController';
import boardMiddleware from '~/middlewares/boardMiddleware';
import boardValidation from '~/validations/boardValidation';

const router = express.Router();

router.get('/', boardController.get);
router.get('/search', boardController.search);
router.get(
    '/:slug',
    // boardMiddleware.checkMemberRole('member', 'admin', 'owner'),
    boardController.getBoardBySlug,
);
router.post('/', boardValidation.store, boardController.store);
router.post('/generate', boardController.generate);
router.put('/:id', boardMiddleware.checkMemberRole('admin', 'owner'), boardValidation.update, boardController.update);
router.put(
    '/supports/moving_card',
    boardMiddleware.checkMemberRole('admin', 'owner'),
    boardValidation.moveCardToDifferentColumn,
    boardController.moveCardToDifferentColumn,
);
router.delete(
    '/:id',
    boardMiddleware.checkMemberRole('admin', 'owner'),
    boardValidation.destroy,
    boardController.destroy,
);

export default router;
