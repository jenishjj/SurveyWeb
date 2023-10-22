import { Form } from "../forms/form.model";
import { Page } from "../forms/page.model";
import { Question } from "../forms/question.model";

export class FormRecord {
  id: number = 0;
  formId: number = 0;
  isDeleted: boolean = false;
  createdAt: Date = new Date();

  records: Array<QuestionRecord> = [];

  queRecords: any = {};

  constructor(_record?: any) {
    if(_record) {
      this.id = _record.id
      this.formId = _record.formId
      this.isDeleted = _record.isDeleted
      this.createdAt = _record.createdAt
      this.records = _record.records
    }
  }

  prepareRecordsFromForm(form: Form) {
    this.formId = form.id;

    this.setRecordsFromForm(form);
  }

  setRecordsFromForm(form: Form) {
    if (form && form.pages) {
      (form.pages || []).forEach((_page: Page) => {
        (_page.questions || []).forEach((_que: Question) => {
          this.queRecords[_que.id] = '';
        });
      });
    }
  }

  setRecordsValues() {
    if (this.records.length) {
      this.records.forEach((_record: QuestionRecord) => {
        this.queRecords[_record.questionId] = _record.value;
      })
    }
  }

  getExpose() {
    let record: FormRecord = new FormRecord();

    record.id = this.id;
    record.formId = this.formId;
    record.isDeleted = this.isDeleted;
    record.createdAt = new Date();

    this.records = this.getRecordsExpose();

    record.records = this.records;
    return record;
  }

  getRecordsExpose() {
    let records: Array<QuestionRecord> = [];

    let keys = Object.keys(this.queRecords);
    if (keys && keys.length) {
      keys.forEach((_key: string) => {
        let questionRecord = new QuestionRecord();

        questionRecord.questionId = parseInt(_key);
        questionRecord.value = (Array.isArray(this.queRecords[_key])) ? this.queRecords[_key].toString() : this.queRecords[_key];
        records.push(questionRecord);
      })
    }

    return records;
  }
}

export class QuestionRecord {
  id: number = 0;
  recordId: number = 0;
  questionId: number = 0;
  value: string = '';
}

// export class FormRecordModel {
//   form: Form = new Form();
//   formRecord: FormRecord = new FormRecord();

//   constructor(_form: any, _formRecord: any) {
//     this.form = _form;
//     this.formRecord = (_formRecord) ? _formRecord : new FormRecord();
//   }
// }
