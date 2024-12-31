import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Booking } from '../../interfaces/interfaces';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { DeleteItemService } from '../../services/delete-item.service';

@Component({
  selector: 'app-reservation',
  imports: [MatDialogModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationComponent {
  private readonly matDialog = inject(MatDialog)
  private readonly deleteItemService = inject(DeleteItemService)

  @Input()
  pickedDate: Booking = {
    objectId: '',
    team: '',
    time: '',
    date: '',
    duration: '',
    room: '',
  };

  onDelete() {
    const buttonElement = document.activeElement as HTMLElement;
    buttonElement.blur();
    const dialogRef = this.matDialog.open(ConfirmPopupComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItemService.delRequest(this.pickedDate.objectId)
      } else {
        return
      }
    });
  }

}
