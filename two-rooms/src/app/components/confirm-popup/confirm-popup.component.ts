import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-popup',
  imports: [MatDialogModule, MatButtonModule, MatDialogTitle],
  templateUrl: './confirm-popup.component.html',
  styleUrl: './confirm-popup.component.scss',
})
export class ConfirmPopupComponent {
  private matDialogRef = inject(MatDialogRef);

  onConfirm(): void {
    this.matDialogRef.close(true);
  }

  onCancel(): void {
    this.matDialogRef.close(false);
  }
}
