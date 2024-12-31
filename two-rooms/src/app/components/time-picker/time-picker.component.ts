import { NgClass, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { BookTimeRoom } from '../../interfaces/interfaces';

@Component({
  selector: 'app-time-picker',
  imports: [NgFor, NgClass],
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerComponent implements OnChanges {
  @Input() specialTimes: BookTimeRoom[] = [];
  @Output() timeSelected = new EventEmitter<string>();

  protected hours: string[] = [];
  protected selectedHour: string = '';

  constructor(private ref: ChangeDetectorRef) {
    for (let i = 1; i <= 24; i++) {
      this.hours.push(this.formatTime(i));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['specialTimes']) {
      this.ref.markForCheck();
    }
  }

  formatTime(hour: number): string {
    return hour.toString().padStart(2, '0') + ':00';
  }

  isSpecialTime(time: string): boolean {
    const booked = this.specialTimes.filter((val) => val.time === time);
    if (booked.length) {
      return true;
    } else {
      return false;
    }
  }

  isSelected(time: string) {
    if (time === this.selectedHour) {
      return true;
    } else {
      return false;
    }
  }

  selectTime(hour: string) {
    this.selectedHour = hour;
    this.timeSelected.emit(hour);
    /*
    const closed = this.specialTimes.some((val) => val.time === hour);
    if (closed) {
      this.timeSelected.emit(undefined);
      return;
    }
    this.timeSelected.emit(hour);
        */
  }
}
