import { defineField, defineType } from 'sanity'

export const clientSchema = defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoUrl',
      title: 'Logo URL',
      type: 'url',
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'contactNumber',
      title: 'Contact Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'projectStatus',
      title: 'Project Status',
      type: 'string',
      options: {
        list: ['Active', 'Pending', 'On Hold', 'Completed'],
      },
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    }),
    defineField({
      name: 'scope',
      title: 'Project Scope',
      type: 'text',
    }),
    defineField({
      name: 'budget',
      title: 'Budget (USD)',
      type: 'number',
    }),
    defineField({
      name: 'milestones',
      title: 'Milestones',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'date', type: 'string', title: 'Date' },
            { name: 'status', type: 'string', title: 'Status' },
          ],
        },
      ],
    }),
    defineField({
      name: 'payments',
      title: 'Payments',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'description', type: 'string', title: 'Description' },
            { name: 'amount', type: 'number', title: 'Amount' },
            { name: 'date', type: 'string', title: 'Due Date' },
            { name: 'status', type: 'string', title: 'Status' },
          ],
        },
      ],
    }),
    defineField({
      name: 'assignedTeam',
      title: 'Assigned Team',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'role', type: 'string', title: 'Role' },
            { name: 'avatar', type: 'url', title: 'Avatar URL' },
            {
              name: 'teamMember',
              type: 'reference',
              title: 'Team Member',
              to: [{ type: 'teamMember' }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'documents',
      title: 'Documents',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
