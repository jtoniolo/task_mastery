import { emptyProps, props, createActionGroup } from '@ngrx/store';
import { LabelDto } from '../../proxy';

export const gmailPageActions = createActionGroup({
  source: 'Gmail Page',
  events: {
    open: emptyProps(),
  },
});

export const gmailApiActions = createActionGroup({
  source: 'Gmail API',
  events: {
    load: emptyProps(),
    loadLabels: emptyProps(), // Triggered by the dashboard effects
    loadSuccess: props<{ data: LabelDto[] }>(),
    loadFailure: props<{ error: any }>(),
  },
});
