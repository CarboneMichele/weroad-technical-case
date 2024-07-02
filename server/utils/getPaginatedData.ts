export function getPaginatedData<T>(
    queryParams: {
        q?: string;
        _page?: number;
        _limit?: number;
        _sort?: keyof T;
        _order?: 'asc' | 'desc';
    },
    data: T[],
): { data: T[]; total: number } {
    const { q, _page = 1, _limit = 10, _sort, _order } = queryParams;

    let filteredItems = data;

    if (q) {
        filteredItems = filteredItems.filter(item =>
            // Implement search logic, for example:
            Object.values(item as any[]).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(q.toLowerCase()),
            ),
        );
    }

    // Sorting (if specified)
    if (_sort && _order) {
        filteredItems.sort((a, b) => {
            const order = _order === 'asc' ? 1 : -1;
            const key = _sort as keyof T;

            if (typeof a[key] === 'number' && typeof b[key] === 'number') {
                return order * ((a[key] as number) - (b[key] as number));
            }
            else {
                // Handle case where a[key] or b[key] is not numeric
                return 0;
            }
        });
    }

    // Pagination
    const startIndex = (_page - 1) * _limit;
    const slicedItems = filteredItems.slice(startIndex, startIndex + _limit);

    return {
        data: slicedItems,
        total: filteredItems.length,
    };
}
