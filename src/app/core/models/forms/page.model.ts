import { Question } from "./question.model";

export class Page {
  id: number = 0;
  pageTitle: string = '';
  isDeleted: boolean = false;
  formId: number = 0;

  questions: Array<Question> = [];
}
