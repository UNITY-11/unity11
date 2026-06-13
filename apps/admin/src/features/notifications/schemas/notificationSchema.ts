import { defineField, defineType } from 'sanity'

export const notificationSchema = defineType({
  name: 'notification',
  title: 'Notification',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Alert', value: 'alert' },
          { title: 'Message', value: 'message' },
          { title: 'Update', value: 'update' },
          { title: 'Success', value: 'success' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isRead',
      title: 'Read',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'timestampDesc',
      by: [{ field: 'timestamp', direction: 'desc' }],
    },
  ],
})
