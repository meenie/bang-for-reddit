import * as versionEffects from './version.effect';
import * as routerEffects from './router.effect';

export const effects: any[] = [versionEffects.VersionEffects, routerEffects.RouterEffects];

export * from './version.effect';
export * from './router.effect';