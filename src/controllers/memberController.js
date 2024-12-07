import { StatusCodes } from 'http-status-codes';
import memberService from '~/services/memberService';

const getOne = async (req, res, next) => {
    try {
        const memberId = req.params.id;
        const members = await memberService.getOne(memberId);

        res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            message: StatusCodes[StatusCodes.OK],
            data: members,
        });
    } catch (error) {
        next(error);
    }
};

const store = async (req, res, next) => {
    try {
        const members = await memberService.store(req.body);

        res.status(StatusCodes.CREATED).json({
            statusCode: StatusCodes.CREATED,
            message: StatusCodes[StatusCodes.CREATED],
            data: members,
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const memberId = req.params.id;

        const updatedMember = await memberService.update(memberId, req.body);

        res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            message: StatusCodes[StatusCodes.OK],
            data: updatedMember,
        });
    } catch (error) {
        next(error);
    }
};

const destroy = async (req, res, next) => {
    try {
        const memberId = req.params.id;

        const updatedMember = await memberService.destroy(memberId, req.body);

        res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            message: StatusCodes[StatusCodes.OK],
            data: updatedMember,
        });
    } catch (error) {
        next(error);
    }
};

export default { getOne, store, update, destroy };
