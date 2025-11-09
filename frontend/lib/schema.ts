import Ajv from 'ajv';

export const planSchema = {
  type: 'object',
  properties: {
    brand: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        tone: { type: 'array', items: { type: 'string' } },
        palette: { type: 'array', items: { type: 'string' } },
        logo: {
          type: 'object',
          properties: { status: { type: 'string' } },
          required: ['status']
        }
      },
      required: ['tone', 'palette', 'logo']
    },
    goals: { type: 'array', items: { type: 'string' } },
    audience: { type: 'string' },
    siteMap: {
      type: 'array',
      items: {
        type: 'object',
        properties: { slug: { type: 'string' }, title: { type: 'string' } },
        required: ['slug', 'title']
      }
    },
    pages: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          slug: { type: 'string' },
          title: { type: 'string' },
          wireframe: { type: 'array', items: { type: 'object' } },
          copy: { type: 'object' },
          seo: { type: 'object' }
        },
        required: ['slug', 'title']
      }
    },
    contact: { type: 'object' }
  },
  required: ['brand', 'goals', 'siteMap', 'pages']
} as const;

const ajv = new Ajv({ allErrors: true });
export const validatePlan = ajv.compile(planSchema);
