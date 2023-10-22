import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormRecord } from 'src/app/core/models/form-record/form-record.model';
import { Form } from 'src/app/core/models/forms/form.model';
import { Page } from 'src/app/core/models/forms/page.model';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-form-entry',
  templateUrl: './form-entry.component.html',
  styleUrls: ['./form-entry.component.scss']
})
export class FormEntryComponent {

  id: string = '';

  mainForm: Form = new Form();
  formRecord: FormRecord = new FormRecord();

  currentPage: Page = new Page();

  showSaveButton: boolean = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '1';

    this.getFormData();
  }

  getFormData() {
    this.api.getData('Form/' + this.id).subscribe({
      next: (res: Form) => {
        this.mainForm = res;

        this.formRecord.prepareRecordsFromForm(this.mainForm);

        if (this.mainForm.pages.length) {
          this.currentPage = this.mainForm.pages[0];
        }

      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  submit() {
    let currentPageIndex = this.mainForm.pages.findIndex(x => x.id == this.currentPage.id);
    if (currentPageIndex > -1) {
      if (this.mainForm.pages.length != currentPageIndex + 1) {
        // Move To Next Page
        this.currentPage = this.mainForm.pages[currentPageIndex + 1];

        if (this.mainForm.pages.length == currentPageIndex + 2) {
          this.showSaveButton = true;
        }
      } else {
        // Submit Record
        this.save();
      }
    }
  }

  save() {

    this.api.postData('Record', this.formRecord.getExpose()).subscribe({
      next: (res: any) => {
        if (res && res.id) {
          this.router.navigate(['form-entry/view', this.id, res.id]);
        }
      }, error: (err: any) => {
        console.log(err);
      }
    })
  }

}
