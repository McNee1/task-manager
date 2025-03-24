import { ProgressIndicator } from './progress-indicator';
import { ProgressLabel } from './progress-label';
import { ProgressRoot } from './progress-root';

export const Progress = {
  /**
   * The root container for the progress component.
   */
  Root: ProgressRoot,

  /**
   * The visual indicator that shows the progress.
   */
  Indicator: ProgressIndicator,

  /**
   * An optional label to display the progress value.
   */
  Label: ProgressLabel,
};
