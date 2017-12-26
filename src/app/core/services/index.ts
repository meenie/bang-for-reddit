import { LocalStorageService } from './local-storage.service'
import { RedditService } from './reddit.service';
import { VersionService } from './version.service';

export const services: any[] = [LocalStorageService, RedditService, VersionService];

export * from './local-storage.service';
export * from './reddit.service';
export * from './version.service';