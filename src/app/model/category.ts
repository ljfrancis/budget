export class Category {
  id: number;
  edit: boolean;
  category: string;
  items: Array<any>;
}

export class Month {
  year: number;
  month: number;
  income: number;
  editBalances: boolean;
  account: any;
  categories: Category[];
}

