
 enum ScheduleCode {
    startDay = 0,
    endDay = 6,
    startTime =8,
    endTime = 18,
    endTimeFHS = 19,
}

export const diferenceTimeByZone = [
    {
        state: 'FL',
        diference: -4,
    },
    {
        state: 'TN',
        diference: -5,
    },
];

export default ScheduleCode;

