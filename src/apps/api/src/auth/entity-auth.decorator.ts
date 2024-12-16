import { SetMetadata } from '@nestjs/common';

export const ENTITY_AUTH_KEY = 'entityAuth';

export function EntityAuth(entityName: string, ownerIdProperty: string) {
  // Pass the entity name and the owner id property to the SetMetadata function
  return SetMetadata(ENTITY_AUTH_KEY, { entityName, ownerIdProperty });
}
