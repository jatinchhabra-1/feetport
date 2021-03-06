import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { CreateLeaveService } from '../create-leave.service';

@Component({
  selector: 'app-create-leave',
  templateUrl: './create-leave.component.html',
  styleUrls: ['./create-leave.component.css'],
  providers: [MessageService, CreateLeaveService],
})
export class CreateLeaveComponent implements OnInit {
  purpose = new FormArray([this.createPurpose()], this.validatePurpose);
  leaveForm = this.fb.group({
    leavetype: new FormControl('', Validators.required),
    is_caary_forward: new FormControl(false, Validators.required),
    priority: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    is_proof_required: new FormControl(false, Validators.required),
    purpose: this.purpose,
  });
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private createLeaveService: CreateLeaveService
  ) {}

  ngOnInit() {
    console.log(this.leaveForm.valid);
  }

  addPurpose() {
    //(this.leaveForm.get('purpose') as FormArray).push(this.createPurpose());
    this.purpose.push(new FormControl('', Validators.required));
    console.log(this.leaveForm.value);
  }
  createPurpose() {
    return new FormControl('', Validators.required);
  }
  removePurpose(index: number) {
    this.purpose.removeAt(index);
  }
  validatePurpose(control: AbstractControl): { [key: string]: any } | null {
    console.log(control.value);
    console.log(control.valid);
    if (control.value.length <= 0) {
      return { invalid: true  };
    }
    let tempVal = null;
    control.value.forEach((val: any) => {
      if (val === ''){
        tempVal = false;
       }
    });
    if(tempVal === false){
      return { invalid: true };
    }

    return null;
  }

  onSubmit(value: string) {
    this.submitted = true;
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'Form Submitted',
      sticky: true,
    });
    console.log(this.leaveForm.value);
    this.createLeaveService.createLeaveRequest(this.leaveForm.value).subscribe(data => console.log(data));
  }
}
