export class Question {
  id: number = 0;
  SeqNo: number = 0;
  title: string = "";
  questionType: QuestionType = new QuestionType();
  pageId: number = 0;
  options: string = "";
  optionsArr: Array<string> = [];
  isRequired: boolean = false;
  tooltipText: string = "";
  isDeleted: boolean = false;
}

export class QuestionType {
  id: number = 0;
  type: string = "";
}
