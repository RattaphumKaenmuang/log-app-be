import { Model, Document, type PopulateOptions } from 'mongoose';
import { ACTION_ORDER } from '../constants/actions.js';

export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc' | 'custom';
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
        const order = params.order || 'desc';
        
        let query = this.model.find(filter);

        // Custom Sort
        if (sortBy === 'action' && order === 'custom') {
            const allData = await this.model.find(filter);
            
            const sorted = allData.sort((a: any, b: any) => {
                const indexA = ACTION_ORDER.indexOf(a.action);
                const indexB = ACTION_ORDER.indexOf(b.action);
                return indexA - indexB;
            });

            // Apply pagination manually
            const data = sorted.slice((page - 1) * limit, page * limit);
            const total = sorted.length;

            if (params.populate) {
                await this.model.populate(data, params.populate);
            }

            return {
                data: data as T[],
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            };
        }

        // Standard sorting
        const sortOrder = order === 'asc' ? 1 : -1;
        query = query
            .sort({ [sortBy]: sortOrder })
            .skip((page - 1) * limit)
            .limit(limit);

        if (params.populate) {
            query = query.populate(params.populate);
        }

        const data = await query;
        const total = await this.model.countDocuments(filter);

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
}