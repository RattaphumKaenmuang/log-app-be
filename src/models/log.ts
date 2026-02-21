import mongoose, { Schema, Document } from 'mongoose';

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
    userId: string;
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
        timeMs:     { type: String, required: true }
    },
    action:     { type: String, required: true },
    userId:     { type: String, required: true }
});

export default mongoose.model<ILog>('Log', LogSchema);