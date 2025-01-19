import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'label',
})
export class LabelPipe implements PipeTransform {
  transform(
    labelId: string | undefined,
    labels: LabelEntity[] | undefined,
  ): string {
    if (labels && labelId) {
      const label = labels.find((l) => l.labelId === labelId);
      return label ? label.name : labelId;
    }
    return '';
  }
}
interface LabelEntity {
  labelId: string;
  name: string;
}
