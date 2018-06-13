import {Group} from './group';
export class CategoryDetails {
  _id: string
  category: string ;
  description: string;
  updatedOn: Date;
  groups: Array<Group>;
}

