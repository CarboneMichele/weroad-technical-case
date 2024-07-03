// dateRangeComposable.ts
import { reactive } from 'vue';

interface DateRange {
    start: Date;
    end: Date;
}

export default function useDateRange(initialStart: Date, initialEnd: Date) {
    const dateRange = reactive<DateRange>({
        start: initialStart,
        end: initialEnd,
    });

    function updateDateRange(newRange: DateRange) {
        dateRange.start = newRange.start;
        dateRange.end = newRange.end;
    }

    return {
        dateRange,
        updateDateRange,
    };
}
