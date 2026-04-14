import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  groups: [
      {name: 'details', title: 'Details'},
      {name: 'editorial', title: 'Editorial'},
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'details',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required().error('Slug is required'),
      hidden: ({document}) => !document?.name, // hide slug field until name is filled out
    }),
    defineField({
      name: 'eventType',
      type: 'string',
      group: 'details',
      options: {
        list: ['in-person', 'virtual'],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      group: 'details',
    }),
    defineField({
      name: 'doorsOpen',
      description: 'Time when the doors open',
      type: 'number',
      initialValue: 60,
      group: 'details',
    }),
    defineField({
      name: 'venue',
      type: 'reference',
      group: 'details',
      to: [{type: 'venue'}],
      readOnly: ({value, document}) => !value && document?.eventType === 'virtual', // make venue field read-only if event type is virtual
      validation: (Rule) =>
        Rule.custom((value, context) => {
          // custom built-in validation function that allows you to write your own validation logic
          if (value && context?.document?.eventType === 'virtual') {
            // context?.document is the current document being validated
            return 'Only in-person events can have a venue'
          }
          return true
        }),
    }),
    defineField({
      name: 'headline',
      type: 'reference',
      group: 'editorial',
      to: [{type: 'artist'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'editorial',
    }),
    defineField({
      name: 'details',
      type: 'array',
      group: 'editorial',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'tickets',
      group: 'editorial',
      type: 'url',
    }),
  ],
})
