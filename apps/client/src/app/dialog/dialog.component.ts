import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'tsm-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  data = inject<DialogData>(MAT_DIALOG_DATA);
  dialogType = signal<DialogType>(DialogType.Confirm);
  dialogTitle = signal<string>(DialogType.Confirm);
  dialogMessage = signal<string>('Are you sure?');
  ngOnInit(): void {
    this.dialogType.set(this.data.type ?? DialogType.Confirm);
    this.setTitle();
    this.setMessage();
  }

  private setTitle(): void {
    if (this.data.title) {
      this.dialogTitle.set(this.data.title);
    } else {
      switch (this.data.type ?? DialogType.Confirm) {
        case DialogType.Alert:
          this.dialogTitle.set('Alert!');
          break;
        case DialogType.Confirm:
          this.dialogTitle.set('Please Confirm');
          break;
        case DialogType.Delete:
          this.dialogTitle.set('Delete: Are You Sure?');
          break;
      }
    }
  }

  private setMessage(): void {
    if (this.data.message) {
      this.dialogMessage.set(this.data.message);
    } else {
      switch (this.data.type ?? DialogType.Confirm) {
        case DialogType.Alert:
          this.dialogMessage.set('Alert');
          break;
        case DialogType.Confirm:
          this.dialogMessage.set('Are you sure?');
          break;
        case DialogType.Delete:
          this.dialogMessage.set(
            'Are you sure you want to delete this? This action cannot be undone.',
          );
          break;
      }
    }
  }
}

export enum DialogType {
  Alert = 'Alert',
  Confirm = 'Confirm',
  Delete = 'Delete',
}

export interface DialogData {
  type?: DialogType;
  title?: string;
  message?: string;
}
