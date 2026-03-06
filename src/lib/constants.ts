export const accountTypes = [
   { id: 1, name: 'Personal' },
   { id: 2, name: 'Designer' },
   { id: 3, name: 'Studio' },
   { id: 4, name: 'Brand / Startup' },
] as const;

export type AccountType = (typeof accountTypes)[number]['name'];

export const interests = [
   { id: 1, name: 'Web Design' },
   { id: 2, name: 'Branding' },
   { id: 3, name: 'Mobile Design' },
   { id: 4, name: 'Animation' },
   { id: 5, name: 'Illustration' },
   { id: 6, name: 'Product Design' },
   { id: 7, name: 'Media' },
   { id: 8, name: 'Navigation' },
   { id: 9, name: 'Sections' },
   { id: 10, name: 'UI Components' },
   { id: 11, name: 'Style or tone' },
   { id: 12, name: 'Visual Style' },
] as const;

export const interestsOptions = interests.map(interest => ({
   label: interest.name,
   value: interest.name.replace(/\s+/g, '_'),
}));

export type Interests = (typeof interestsOptions)[number]['value'];
