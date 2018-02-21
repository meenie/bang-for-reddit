import { LocalStorageService } from './local-storage.service';
import { RedditService } from './reddit.service';

export const services: any[] = [
  LocalStorageService,
  RedditService
];

export * from './local-storage.service';
export * from './reddit.service';
