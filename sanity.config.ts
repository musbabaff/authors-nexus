import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { sanityEnv } from './src/sanity/env';
import { structure, SINGLETON_IDS } from './src/sanity/structure';
import * as schemas from './src/sanity/schemas';

export default defineConfig({
  name: 'authors-nexus-studio',
  title: "The Author's Nexus — Studio",

  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: sanityEnv.apiVersion }),
  ],

  schema: {
    types: Object.values(schemas),
    // Filter singleton types from the global "new document" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_IDS.includes(schemaType as typeof SINGLETON_IDS[number])),
  },

  document: {
    // Prevent users from creating additional singleton documents
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (template) =>
            !SINGLETON_IDS.includes(template.templateId as typeof SINGLETON_IDS[number]),
        );
      }
      return prev;
    },
    // For singleton documents, always use the fixed documentId
    actions: (prev, { schemaType }) => {
      if (SINGLETON_IDS.includes(schemaType as typeof SINGLETON_IDS[number])) {
        return prev.filter(({ action }) => action !== 'duplicate');
      }
      return prev;
    },
  },
});
