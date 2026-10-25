import type { GlobalConfig } from 'payload'

export const SearchSettings: GlobalConfig = {
  slug: 'search-settings',
  access: {
    read: () => true,
    update: () => true,
  },
  admin: { group: 'Job search' },
  fields: [
    {
      name: 'notionUrl',
      type: 'text',
      label: 'Applications database URL',
      validate: (value: unknown) => {
        if (!value) return true
        try {
          const url = new URL(String(value))
          return url.protocol === 'https:' ? true : 'Use a secure https:// URL.'
        } catch {
          return 'Enter a valid URL.'
        }
      },
    },
  ],
}
