import { UserDto } from '../proxy';

/**
 * Interface for the 'App' data
 */
export interface AppEntity {
  title: string;
  apiBaseUrl: string;
  token?: string;
  profile?: UserDto;
}
