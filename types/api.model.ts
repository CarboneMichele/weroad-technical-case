export interface IPaginatedDataQueryParams {
    q?: string;
    _page?: number;
    _limit?: number;
    _sort?: string;
    _order?: 'asc' | 'desc';
}
