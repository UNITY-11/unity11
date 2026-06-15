import { type SchemaTypeDefinition } from 'sanity'

import { blogSchema } from '../../features/blogs/schemas/blogSchema'
import { clientSchema } from '../../features/clients/schemas/clientSchema'
import { projectSchema } from '../../features/projects/schemas/projectSchema'
import { teamMemberSchema } from '../../features/team/schemas/teamMemberSchema'
import { notificationSchema } from '../../features/notifications/schemas/notificationSchema'
import { adminProfileSchema } from '../../features/profile/schemas/adminProfileSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogSchema, clientSchema, projectSchema, teamMemberSchema, notificationSchema, adminProfileSchema],
}
