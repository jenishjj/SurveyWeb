import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormRecord } from 'src/app/core/models/form-record/form-record.model';
import { Form } from 'src/app/core/models/forms/form.model';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss']
})
export class FormViewComponent {

  id: string = '';
  recordId: string = '';

  mainForm: Form = new Form();
  formRecord: FormRecord = new FormRecord();

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '1';
    this.recordId = this.route.snapshot.paramMap.get('recordId') || '1';

    this.getFormData();
  }

  getFormData() {
    this.api.getData('Form/' + this.id).subscribe({
      next: (res: Form) => {
        this.mainForm = res;

        this.getFormRecordData();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getFormRecordData() {
    this.api.getData('Record/' + this.recordId).subscribe({
      next: (res: FormRecord) => {
        this.formRecord = new FormRecord(res);

        this.formRecord.setRecordsValues();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

}
