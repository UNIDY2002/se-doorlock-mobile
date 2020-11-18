export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const dayOfWeekToString = (dayOfWeek: DayOfWeek) => {
    switch (dayOfWeek) {
        case 0:
            return "周日";
        case 1:
            return "周一";
        case 2:
            return "周二";
        case 3:
            return "周三";
        case 4:
            return "周四";
        case 5:
            return "周五";
        case 6:
            return "周六";
    }
};
