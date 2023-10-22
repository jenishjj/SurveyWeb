import { Page } from "./page.model";

export class Form
{
  id: number = 0;
  name: string = '';
  isDeleted: boolean = false;
  isActive: boolean = true;

  pages: Array<Page> = [];
}
