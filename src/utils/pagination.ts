import { Model, Document, type PopulateOptions } from 'mongoose';

export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
    populate?: PopulateOptions | PopulateOptions[];
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }
}

export class Paginator<T extends Document> {
    private model: Model<T>;

    constructor(m: Model<T>) {
        this.model = m;
    }

    async paginate(
        filter: Record<string, any> = {},
        params: PaginationParams = {}
    ): Promise<PaginatedResponse<T>> {
        const page = params.page || 1;
        const limit = params.limit || 50;
        const sortBy = params.sortBy || 'timestamp';
        const order = params.order === 'asc' ? 1 : -1;
        
        let query = this.model
            .find(filter)
            .sort({ [sortBy]: order })
            .skip((page-1) * limit)
            .limit(limit);

        if (params.populate) {
            query = query.populate(params.populate)
        }

        const data = await query;
        const total = await this.model.countDocuments(filter);

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total/limit)
            }
        }
    }
}