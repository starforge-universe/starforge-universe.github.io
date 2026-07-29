export type ProductStatus = 'available' | 'building';

export interface ProductStoryBlock {
  title: string;
  body: string;
}

/** A concrete tool or project nested under a product line (for example Utilities). */
export interface CatalogProduct {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  status: ProductStatus;
  statusLabel: string;
  repositoryUrl?: string;
  story: ProductStoryBlock[];
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
  /** Optional nested tools. Add entries here to grow a category line. */
  products?: readonly CatalogProduct[];
}

/**
 * Extendable product catalog. Add a new entry here to surface it on the home
 * page and as a shareable `/lines/:slug` detail view. For category lines such
 * as Utilities, append nested `products` instead of hard-coding UI rows.
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
  },
  {
    slug: 'utilities',
    name: 'Utilities',
    shortName: 'Utilities',
    tagline: 'Focused developer tools that sharpen everyday productivity.',
    summary:
      'A growing category of practical utilities—small, purposeful tools that help developers move faster, keep documentation aligned with reality, and reduce repetitive maintenance.',
    status: 'available',
    statusLabel: 'Available',
    story: [
      {
        title: 'Productivity without the sprawl',
        body:
          'Utilities gather developer tools that contribute to day-to-day productivity: clearer schema insight, less manual upkeep, and smoother reviews—without demanding a new platform for every job.'
      },
      {
        title: 'Extend the toolbox',
        body:
          'This line is built to grow. New tools join the catalog as they mature, each remaining focused on a concrete workflow.'
      }
    ],
    products: [
      {
        slug: 'liquisketch',
        name: 'LiquiSketch',
        tagline: 'Liquibase in, diagrams out.',
        summary:
          'A Python utility that reads Liquibase changelogs and produces schema diagrams—so teams can sketch structure, relationships, and change history straight from migration history.',
        status: 'available',
        statusLabel: 'Available',
        repositoryUrl: 'https://github.com/starforge-universe/liquisketch',
        story: [
          {
            title: 'Schema docs that follow migrations',
            body:
              'Keep diagrams aligned with changelog history instead of redrawing by hand when tables, columns, or foreign keys change.'
          },
          {
            title: 'Less manual maintenance',
            body:
              'Synchronize Draw.io diagrams from your master changelog—create the file when needed, update what changed, and remove elements that no longer exist in schema.'
          },
          {
            title: 'Clearer reviews and onboarding',
            body:
              'Share a living picture of the database for design reviews and onboarding, and catch schema drift earlier while it is still cheap to fix.'
          }
        ]
      }
    ]
  }
];

export function getProductLine(slug: string): ProductLine | undefined {
  return PRODUCT_LINES.find((line) => line.slug === slug);
}
