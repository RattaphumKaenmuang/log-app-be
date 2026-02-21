import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IRequest {
    method: string;
    endpoint: string;
};

export interface IResponse {
    statusCode: string;
    message: string;
    timeMs: string;
};

export interface ILog extends Document {
    labnumber: string[];
    timestamp: Date;
    request: IRequest;
    response: IResponse;
    action: string;
    userId: Types.ObjectId;
};

const LogSchema = new Schema({
    labnumber:  { type: [String], required: true },
    timestamp:  { type: Date, required: true },
    request: {
        method:     { type: String, required: true },
        endpoint:   { type: String, required: true }
    },
    response: {
        statusCode: { type: String, required: true },
        message:    { type: String, required: true },
        timeMs:     { type: Number, required: true }
    },
    action:     { type: String, required: true },
    userId:     { type: Schema.Types.ObjectId, required: true }
});

export default mongoose.model<ILog>('Log', LogSchema);