import cloudinary from 'cloudinary';
import db from '~/models';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: 'auto',
};

const get = async ({ page = 1, pageSize = 10, where, ...options }) => {
    try {
        const skip = (page - 1) * pageSize;
        const { count, rows } = await db.Attachment.findAndCountAll({
            where: where,
            offset: skip,
            limit: pageSize,
            distinct: true,
            ...options,
        });

        return {
            meta: {
                page,
                pageSize,
                total: count,
            },
            data: rows,
        };
    } catch (error) {
        throw error;
    }
};

const getOne = async (attachmentId) => {
    try {
        const data = await db.Attachment.findOne({ where: { id: attachmentId } });

        return data;
    } catch (error) {
        throw error;
    }
};

const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file, opts, (error, result) => {
            if (result && result.secure_url) {
                return resolve(result);
            }
            return reject({ message: error.message });
        });
    });
};

const store = async (data) => {
    try {
        const result = await uploadFile(data.file);

        const attachment = await db.Attachment.create({
            ...data,
            cardId: data.cardId,
            fileUrl: result.secure_url,
            fileType: result.resource_type,
        });

        if (!!data.cover) {
            const card = await db.Card.findOne({ where: { id: data.cardId } });
            db.Card.update(
                { image: attachment.id },
                {
                    where: {
                        id: card.id,
                    },
                },
            );
        }

        return attachment;
    } catch (error) {
        throw error;
    }
};

const update = async (attachmentId, data) => {
    try {
        const attachment = await db.Attachment.update(
            { ...data },
            {
                where: {
                    id: attachmentId,
                },
            },
        );

        return attachment;
    } catch (error) {
        throw error;
    }
};

const destroy = async (attachmentId) => {
    try {
        const attachment = await db.Attachment.destroy({
            where: {
                id: attachmentId,
            },
        });

        if (attachment) {
            return { message: 'Successfully!' };
        }

        return { message: 'Error' };
    } catch (error) {
        throw error;
    }
};

export default { get, getOne, store, update, destroy };
