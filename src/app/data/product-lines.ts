export type ProductStatus = 'available' | 'building';

export interface ProductStoryBlock {
  title: string;
  body: string;
}

export interface ProductLine {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  summary: string;
  status: ProductStatus;
  statusLabel: string;
  story: ProductStoryBlock[];
}

/**
 * Extendable product catalog. Add a new entry here to surface it on the home
 * page and as a shareable `/lines/:slug` detail view.
 */
export const PRODUCT_LINES: readonly ProductLine[] = [
  {
    slug: 'project-templating',
    name: 'Starforge project templating',
    shortName: 'Project templating',
    tagline: 'Start every repository with the same clear foundation.',
    summary:
      'GitHub repository templates with sensible defaults—CI/CD, project layout, and shared conventions—so new work begins consistent and ready to grow.',
    status: 'available',
    statusLabel: 'Available',
    story: [
      {
        title: 'Sensible defaults, not blank pages',
        body:
          'Templates carry CI/CD, structure, and conventions so each new repository inherits the standards of your universe instead of reinventing them.'
      },
      {
        title: 'Consistency that scales',
        body:
          'As the number of projects grows, shared templates keep layout and automation aligned—reducing drift across teams and repositories.'
      },
      {
        title: 'Built for GitHub workflows',
        body:
          'Designed around how teams already ship: clone, adjust, and move forward with a foundation that matches the rest of Starforge Universe.'
      }
    ]
  },
  {
    slug: 'all-seeing-eye',
    name: 'All Seeing Eye',
    shortName: 'All Seeing Eye',
    tagline: 'See the architecture of your project universe.',
    summary:
      'Discoverability and monitoring of codebase state across many GitHub repositories—dependencies, integrations, and an architectural overview for compliance and clarity. Actively being built, with room to grow.',
    status: 'building',
    statusLabel: 'In progress',
    story: [
      {
        title: 'Discoverability across the universe',
        body:
          'Find how repositories relate, what they expose, and where ownership and structure live—without hopping between dozens of project pages.'
      },
      {
        title: 'Monitoring codebase state',
        body:
          'Track the health and shape of code across projects so the universe stays understandable as it expands.'
      },
      {
        title: 'Compliance through clarity',
        body:
          'Describe dependencies and integrations to support compliance and give a greater architectural overview of your GitHub repositories.'
      },
      {
        title: 'Growing with potential',
        body:
          'All Seeing Eye is still being built. Early access framing stays honest: the foundation is forming, and the vision is larger than the first release.'
      }
    ]
  }
];

export function getProductLine(slug: string): ProductLine | undefined {
  return PRODUCT_LINES.find((line) => line.slug === slug);
}
