import { StatusCodes } from 'http-status-codes';
import notificationService from '~/services/notificationService';

const getOne = async (req, res, next) => {
    try {
        const notificationId = req.params.id;
        const notification = await notificationService.getOne(notificationId);

        res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            message: StatusCodes[StatusCodes.OK],
            data: notification,
        });
    } catch (error) {
        next(error);
    }
};

const store = async (req, res, next) => {
    try {
        const notification = await notificationService.store(req.body);

        res.io.emit('notification', {
            message: 'hello',
        });

        res.status(StatusCodes.CREATED).json({
            statusCode: StatusCodes.CREATED,
            message: StatusCodes[StatusCodes.CREATED],
            data: notification,
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const notificationId = req.params.id;

        const updatedNotification = await notificationService.update(notificationId, req.body);

        res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            message: StatusCodes[StatusCodes.OK],
            data: updatedNotification,
        });
    } catch (error) {
        next(error);
    }
};

const destroy = async (req, res, next) => {
    try {
        const notificationId = req.params.id;

        const updatedNotification = await notificationService.destroy(notificationId, req.body);

        res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            message: StatusCodes[StatusCodes.OK],
            data: updatedNotification,
        });
    } catch (error) {
        next(error);
    }
};

export default { getOne, store, update, destroy };