export interface CourtScheduleModel {
       "createUserID": Number,
       "updateUserID": Number,
       "createDatetime": Date,
       "updateDatetime": Date,
       "isDeleted": string,
       "courtHearingHoursID": Number,
       "courtsID": Number,
       "courtRoomTypeID": Number,
       "courtRoomCategoryID": Number,
       "scheduleDateFrom": Date,
       "scheduleDateTo": Date,
       "daysOfWeek": Number[],
       "numberofRooms": Number,
       "numberofSlots": Number,
       "slotLength": Number,
       "ticketsPerSlot": Number
}