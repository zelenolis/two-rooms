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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['specialTimes']) {
      this.ref.markForCheck();
    }
  }

  formatTime(hour: number): string {
    return hour.toString().padStart(2, '0') + ':00';
  }

  isSpecialTime(time: string): boolean {
    const booked = this.specialTimes.filter((val) => val.time === time);
    return booked.length ? true : false
  }

  isSelected(time: string): boolean {
    return time === this.selectedHour ? true : false
  }

  selectTime(hour: string): void {
    this.selectedHour = hour;
    this.timeSelected.emit(hour);
  }
}
