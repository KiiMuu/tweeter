import { model, Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const TweetaSchema: Schema = new Schema({
    content: {
        type: String,
        trim: true,
        text: true,
    },
    images: Array,
    postedBy: {
        type: ObjectId,
        ref: 'User',
    },
    isPinned: Boolean,
    retweeters: [{
        type: ObjectId,
        ref: 'User',
    }],
    retweetData: [{
        type: ObjectId,
        ref: 'Tweeta',
    }],
    replyTo: {
        type: ObjectId,
        ref: 'Tweeta',
    },
}, {
    timestamps: true,
});

const Tweeta = model('Tweeta', TweetaSchema);

export default Tweeta;