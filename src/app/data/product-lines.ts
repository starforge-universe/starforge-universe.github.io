export type ProductStatus = 'available' | 'building' | 'retired';

export interface ProductStoryBlock {
  title: string;
  body: string;
}

/**
 * A concrete tool, template, or project nested under a product line.
 * Optional `children` support hierarchical catalogs (for example DevOps Template → language templates).
 * Optional `composedOf` lists building-block template slugs (same line) for composition products.
 */
export interface CatalogProduct {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  status: ProductStatus;
  statusLabel: string;
  repositoryUrl?: string;
  story: ProductStoryBlock[];
  children?: readonly CatalogProduct[];
  /** Slugs of peer templates this product composes (resolved within the same product line). */
  composedOf?: readonly string[];
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
  /** Optional nested tools/templates. Add entries here to grow a category line. */
  products?: readonly CatalogProduct[];
  /** Heading above nested products on the detail page. Defaults to "Tools". */
  productsHeading?: string;
}

/**
 * Extendable product catalog. Add a new entry here to surface it on the home
 * page and as a shareable `/lines/:slug` detail view. For category lines such
 * as Utilities, append nested `products`. For hierarchical lines such as
 * Project templating, nest `children` under a parent product.
 */
export const PRODUCT_LINES: readonly ProductLine[] = [
  {
    slug: 'project-templating',
    name: 'Starforge project templating',
    shortName: 'Project templating',
    tagline: 'Start every repository with the same clear foundation.',
    summary:
      'GitHub repository templates with sensible defaults—CI/CD, project layout, and shared conventions—so new work begins consistent and ready to grow. DevOps Template sits at the root; language and stack templates build on that foundation.',
    status: 'available',
    statusLabel: 'Available',
    productsHeading: 'Templates',
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
        title: 'Keep history, keep evolving',
        body:
          'Templates are designed to be cloned with git history preserved so later updates can be merged from a template remote—rather than a one-shot copy that drifts forever.'
      }
    ],
    products: [
      {
        slug: 'devops-template',
        name: 'DevOps Template',
        tagline: 'Reusable GitHub workflows at the root of every project.',
        summary:
          'A project skeleton focused on DevOps template elements in GitHub Actions: reusable build, checks, publish, and release workflows, Dependabot, and auto-merge for dependency updates—designed to be reused while preserving git history.',
        status: 'available',
        statusLabel: 'Available',
        repositoryUrl: 'https://github.com/starforge-universe/devops-template',
        story: [
          {
            title: 'Reusable workflow submodules',
            body:
              'Callable workflows for build, checks, publish, and release give every downstream project the same CI/CD building blocks.'
          },
          {
            title: 'Automation that stays current',
            body:
              'Dependabot and auto-merge keep Actions dependencies moving when checks pass, with careful mergeability retries.'
          },
          {
            title: 'Foundation for the stack',
            body:
              'Language and infrastructure templates build on this DevOps base so automation stays familiar across Spring, Terraform, Angular, and more.'
          }
        ],
        children: [
          {
            slug: 'spring-template',
            name: 'Spring Template',
            tagline: 'Java Spring with Gradle, tests, and DevOps automation.',
            summary:
              'A Java Spring starter with Gradle, JUnit 5, Mockito, Checkstyle, and the Starforge reusable GitHub Actions stack—ready to clone with history so template updates can still be merged later. Specialized Spring archetypes hang under this template.',
            status: 'available',
            statusLabel: 'Available',
            repositoryUrl: 'https://github.com/starforge-universe/spring-template',
            story: [
              {
                title: 'Spring and Gradle ready',
                body:
                  'Pre-configured Spring dependencies, Java 17, and a modern Gradle setup with dependency management.'
              },
              {
                title: 'Quality from day one',
                body:
                  'JUnit 5, Mockito, Spring Test, and Checkstyle run through reusable check workflows on every pull request.'
              }
            ],
            children: [
              {
                slug: 'spring-library-template',
                name: 'Spring Library Template',
                tagline: 'Reusable Spring libraries with Maven publishing.',
                summary:
                  'A Spring library skeleton using the Gradle java-library plugin, API dependency conventions, Checkstyle, tests, and publish workflows aimed at GitHub Packages—built to reuse while preserving git history.',
                status: 'available',
                statusLabel: 'Available',
                repositoryUrl: 'https://github.com/starforge-universe/spring-library-template',
                story: [
                  {
                    title: 'Library-first Gradle',
                    body:
                      'java-library plugin, api vs implementation boundaries, and Maven publishing for consumers of your shared Spring modules.'
                  },
                  {
                    title: 'Same quality bar',
                    body:
                      'JUnit 5, Mockito, Spring Test, and strict Checkstyle ride the reusable Starforge build and checks workflows.'
                  }
                ]
              },
              {
                slug: 'spring-service-template',
                name: 'Spring Service Template',
                tagline: 'Production Spring Boot services and APIs.',
                summary:
                  'A Spring Boot service starter for REST APIs and microservices—web, actuator, OpenAPI/SpringDoc, isolation tests, Checkstyle, and the shared DevOps automation stack on Java 21.',
                status: 'available',
                statusLabel: 'Available',
                repositoryUrl: 'https://github.com/starforge-universe/spring-service-template',
                story: [
                  {
                    title: 'Service-ready Spring Boot',
                    body:
                      'Web, actuator, config, and OpenAPI scaffolding so backend services start with operational and documentation basics in place.'
                  },
                  {
                    title: 'Isolation-aware testing',
                    body:
                      'Unit and isolation test layouts with Checkstyle across main and test sources, wired into reusable PR checks.'
                  }
                ]
              },
              {
                slug: 'spring-application-template',
                name: 'Spring Application Template',
                tagline: 'Experimental Spring Boot desktop and Swing apps.',
                summary:
                  'An experimental Spring Boot desktop application template exploring Swing and desktop UI on top of the familiar Gradle, Checkstyle, test, and GitHub Actions automation used across Starforge Spring projects.',
                status: 'available',
                statusLabel: 'Available',
                repositoryUrl: 'https://github.com/starforge-universe/spring-application-template',
                story: [
                  {
                    title: 'Desktop meets Spring Boot',
                    body:
                      'A concept template for extending Spring Boot into desktop and Swing capabilities without giving up CI quality gates.'
                  },
                  {
                    title: 'Same DevOps spine',
                    body:
                      'Reusable build, checks, publish, and release workflows keep the experimental UI stack aligned with other Spring templates.'
                  }
                ]
              },
              {
                slug: 'spring-function-template',
                name: 'Spring Function Template',
                tagline: 'Retired — Spring Cloud Functions on Azure.',
                summary:
                  'Previously a Spring Boot Azure Functions starter with Spring Cloud Function adapters, Gradle, Checkstyle, and DevOps workflows. This archetype is retired: Spring Functions lack strong ongoing support, and Starforge has stopped investing in it.',
                status: 'retired',
                statusLabel: 'Retired',
                repositoryUrl: 'https://github.com/starforge-universe/spring-function-template',
                story: [
                  {
                    title: 'Why it was retired',
                    body:
                      'Spring Functions are not receiving the support needed for a durable platform path, so Starforge chose to retire this archetype rather than keep promoting it.'
                  },
                  {
                    title: 'Prefer other Spring templates',
                    body:
                      'For new work, use Spring Service, Spring Library, or Spring Application templates—and Python Function Template when you need Azure Functions.'
                  }
                ]
              }
            ]
          },
          {
            slug: 'terraform-template',
            name: 'Terraform Template',
            tagline: 'Infrastructure as code with validated CI workflows.',
            summary:
              'A Terraform project skeleton with Starforge DevOps workflows—including validate and format checks—plus Dependabot for Actions and providers, designed for reuse with preserved git history.',
            status: 'available',
            statusLabel: 'Available',
            repositoryUrl: 'https://github.com/starforge-universe/terraform-template',
            story: [
              {
                title: 'Terraform-aware checks',
                body:
                  'Reusable checks cover Terraform validate and fmt so pull requests catch drift before it lands.'
              },
              {
                title: 'Same DevOps shape',
                body:
                  'Build, publish, and release workflow submodules mirror the rest of the templating family for consistent automation.'
              }
            ]
          },
          {
            slug: 'angular-webapp-template',
            name: 'Angular Webapp Template',
            tagline: 'Angular 22 web apps with Node 24 CI and Docker.',
            summary:
              'An Angular CLI webapp template on Node.js 24 with lint, build, ChromeHeadless tests, GitHub Pages-ready DevOps workflows, and optional Docker/nginx packaging for local inspection.',
            status: 'available',
            statusLabel: 'Available',
            repositoryUrl: 'https://github.com/starforge-universe/angular-webapp-template',
            story: [
              {
                title: 'Modern Angular baseline',
                body:
                  'Angular CLI 22, npm scripts for serve, build, lint, and coverage-enabled headless tests.'
              },
              {
                title: 'Ship with familiar automation',
                body:
                  'Reusable checks and Dependabot auto-merge keep the frontend stack aligned with the DevOps Template practices.'
              }
            ]
          },
          {
            slug: 'python-function-template',
            name: 'Python Function Template',
            tagline: 'Python Azure Functions with reusable DevOps workflows.',
            summary:
              'A Python Azure Functions skeleton with function_app entrypoint, Makefile and pyproject tooling, Azurite-friendly local flow, and the shared Starforge GitHub Actions automation.',
            status: 'available',
            statusLabel: 'Available',
            repositoryUrl: 'https://github.com/starforge-universe/python-function-template',
            story: [
              {
                title: 'Functions-first layout',
                body:
                  'Azure Functions host config, source package, tests, and Dockerfile targets for a clear serverless starting point.'
              },
              {
                title: 'Local and CI together',
                body:
                  'Azurite and `func start` for local work; reusable build, checks, publish, and release workflows for the remote pipeline.'
              }
            ]
          },
          {
            slug: 'app-tap-template',
            name: 'App TAP Template',
            tagline: 'Full-stack Azure apps from Terraform, Angular, and Python Functions.',
            summary:
              'An application template composed from Terraform infrastructure, an Angular web UI (MSAL), and a Python Azure Function API—use it as a starting point for full-stack apps on Azure with path-filtered CI for each area.',
            status: 'available',
            statusLabel: 'Available',
            repositoryUrl: 'https://github.com/starforge-universe/app-tap-template',
            composedOf: [
              'terraform-template',
              'angular-webapp-template',
              'python-function-template'
            ],
            story: [
              {
                title: 'Three stacks, one app',
                body:
                  'Infrastructure (Terraform), frontend (Angular with Entra ID), and a Python Functions greeting API ship together with dedicated workflows for each area.'
              },
              {
                title: 'Built from Starforge building blocks',
                body:
                  'App TAP composes the Terraform, Angular Webapp, and Python Function templates so full-stack work starts from the same foundations as standalone stack repos.'
              }
            ]
          },
          {
            slug: 'database-template',
            name: 'Database Template',
            tagline: 'PostgreSQL schema with Liquibase and LiquiSketch ERDs.',
            summary:
              'A PostgreSQL-focused skeleton using Liquibase XML changelogs, Gradle tasks, CI against PostgreSQL 17, and LiquiSketch-generated draw.io ERDs so schema docs stay tied to migration history.',
            status: 'available',
            statusLabel: 'Available',
            repositoryUrl: 'https://github.com/starforge-universe/database-template',
            story: [
              {
                title: 'Schema as source of truth',
                body:
                  'Versioned Liquibase changelogs define tables and constraints; CI validates and applies them on every pull request.'
              },
              {
                title: 'Diagrams from migrations',
                body:
                  'LiquiSketch syncs the ERD from the master changelog so documentation tracks change history instead of hand-drawn drift.'
              }
            ]
          },
          {
            slug: 'library-template',
            name: 'Library Template',
            tagline: 'Consistent release pipelines for shared libraries.',
            summary:
              'A reusable source template for library repos: PR checks, callable build/publish jobs, and a release-branch pipeline that bumps patch versions from `release/*.*.x` branches into `v*` tags across test and production GitHub Environments. Language-specific library templates extend this base.',
            status: 'available',
            statusLabel: 'Available',
            repositoryUrl: 'https://github.com/starforge-universe/library-template',
            story: [
              {
                title: 'Release by branch line',
                body:
                  'Push to `release/<major>.<minor>.x` to compute the next patch, run test and production publish, then tag `v<version>`.'
              },
              {
                title: 'Environments for shipping',
                body:
                  'Publish jobs target GitHub Environments so secrets and approvals stay separate for test and production packages.'
              }
            ],
            children: [
              {
                slug: 'python-library-template',
                name: 'Python Library Template',
                tagline: 'Modern Python packages with PyPI-ready tooling.',
                summary:
                  'A production-ready Python library foundation with pyproject.toml packaging, unittest/pytest, pylint and coverage, Makefile targets, Sphinx-ready docs, optional CLI entrypoints, and GitHub Actions for checks and publishing.',
                status: 'available',
                statusLabel: 'Available',
                repositoryUrl: 'https://github.com/starforge-universe/python-library-template',
                story: [
                  {
                    title: 'Packaging best practices',
                    body:
                      'pyproject.toml metadata, editable installs, type hints, and a clear package/tests layout for reusable Python modules.'
                  },
                  {
                    title: 'Test, lint, publish',
                    body:
                      'Make targets and Actions cover tests, coverage, lint, build, and PyPI publishing so library releases stay repeatable.'
                  }
                ]
              }
            ]
          }
        ]
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

export interface ProductNavMenuItem {
  label: string;
  /** Nested product slug — links to `/lines/:lineSlug#:productSlug`. */
  productSlug?: string;
  comingSoon?: boolean;
  retired?: boolean;
  children?: readonly ProductNavMenuItem[];
  /** Building-block templates for composition products (e.g. App TAP). */
  composedOf?: readonly ProductNavMenuItem[];
}

export function getProductLine(slug: string): ProductLine | undefined {
  return PRODUCT_LINES.find((line) => line.slug === slug);
}

function indexCatalogProducts(
  products: readonly CatalogProduct[]
): Map<string, CatalogProduct> {
  const index = new Map<string, CatalogProduct>();

  const walk = (list: readonly CatalogProduct[]): void => {
    for (const product of list) {
      index.set(product.slug, product);
      if (product.children?.length) {
        walk(product.children);
      }
    }
  };

  walk(products);
  return index;
}

/** Resolve `composedOf` slugs to catalog products within the same product line. */
export function resolveComposedProducts(
  line: ProductLine,
  product: CatalogProduct
): readonly CatalogProduct[] {
  if (!product.composedOf?.length || !line.products?.length) {
    return [];
  }

  const index = indexCatalogProducts(line.products);
  return product.composedOf
    .map((slug) => index.get(slug))
    .filter((entry): entry is CatalogProduct => entry !== undefined);
}

function toNavItem(
  product: CatalogProduct,
  resolveBySlug: (slug: string) => CatalogProduct | undefined
): ProductNavMenuItem {
  const composedOf = product.composedOf
    ?.map((slug) => resolveBySlug(slug))
    .filter((entry): entry is CatalogProduct => entry !== undefined)
    .map((entry) => ({
      label: entry.name,
      productSlug: entry.slug,
      retired: entry.status === 'retired'
    }));

  return {
    label: product.name,
    productSlug: product.slug,
    retired: product.status === 'retired',
    children: product.children?.map((child) => toNavItem(child, resolveBySlug)),
    composedOf
  };
}

/**
 * Mega-menu entries for a product line. Nested `products` (and their children)
 * become links; lines without products show a Coming soon placeholder.
 */
export function getNavMenuItems(line: ProductLine): readonly ProductNavMenuItem[] {
  if (line.products?.length) {
    const index = indexCatalogProducts(line.products);
    return line.products.map((product) => toNavItem(product, (slug) => index.get(slug)));
  }

  return [{ label: 'Coming soon', comingSoon: true }];
}
