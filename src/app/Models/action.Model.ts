export interface actionModel {
  actionsID: number,
  contractID: number,
  active: true,
  actionsName: string,
  actionQueueNames: [],
  createUserID: number,
  updateUserID: number,
  createDatetime: string,
  updateDatetime: string,
  isDeleted: string
}
export interface CategoriesModel {
  actionsID: number;
  categoriesID: number;
  categoryName: string;
  categoryTypeID: number;
  categoryType: string;
  phasesID: number;
  categoryPhaseType: string;
  queueCount: number;
  queuesID: number;
  active: boolean;
  categoriesQueueNames: any[];
  
}