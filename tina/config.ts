import { defineConfig } from "tinacms"

// Tina não compreende imports relativos
import { FeaturedIcons } from "../components/icons"
import { IconSelector } from "./icon-select"

export default defineConfig({
  branch: "",
  clientId: "",
  token: "",
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "",
    }
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Page",
        path: "content/pages",
        format: "md",
        ui: {
          router: (props) => {
            return props.document._sys.breadcrumbs.join("/")
          },
        },
        fields: [
          {
            name: "title",
            type: "string",
          },
          {
            name: "blocks",
            label: "Blocks",
            type: "object",
            list: true,
            templates: [
              {
                name: "welcomeHero",
                label: "Welcome Hero",
                fields: [
                  {
                    name: "message",
                    type: "rich-text",
                  },
                  {
                    name: "links",
                    label: "Links",
                    type: "object",
                    list: true,
                    fields: [
                      { type: "string", name: "link" },
                      { type: "string", name: "label" },
                      {
                        type: "string",
                        name: "style",
                        options: ["simple", "button"],
                      },
                    ],
                  },
                ],
              },
              {
                name: 'featureList',
                label: 'Feature List',
                fields: [
                  {
                    name: 'byline',
                    type: 'string',
                  },
                  {
                    name: "message",
                    type: "rich-text",
                  },
                  {
                    name: "features",
                    label: "Features",
                    type: "object",
                    list: true,
                    ui: {
                      itemProps: item => {
                        return {label: item.label}
                      },
                      defaultItem: {
                        icon: Object.keys(FeaturedIcons)[0],
                        label: 'Llama feature',
                        description: 'This is a feature'
                      }
                    },
                    fields: [
                      {
                        type: 'string',
                        name: 'icon',
                        options: Object.keys(FeaturedIcons),
                        ui: {
                          component: IconSelector
                        },
                      },
                      { type: "string", name: "label" },
                      {
                        type: "string",
                        name: "description",
                        ui: {
                          component: 'textarea',
                        }
                      },
                    ],
                  },
                ]
              },
              {
                name: 'featuredReading',
                label: 'Featured Reading',
                fields: [
                  {
                    name: 'label',
                    label: 'Label',
                    type: 'string',
                  },
                  {
                    name: 'featuredPost',
                    label: 'Featured Post',
                    type: 'reference',
                    collections: ["post"]
                  }
                ]
              },
              {
                name: 'todosList',
                label: 'TODOs list',
                // entender a possibilidade de ocultar os "fields" na edição
                fields: [
                  {
                    name: "title",
                    type: "string",
                  }
                ]
              }
            ],
          },
        ],
      },
      {
        name: 'post',
        label: 'Post',
        path: 'content/posts',
        format: 'md',
        fields: [
          {
            name: 'title',
            label: 'Title',
            type: 'string',
          },
          {
            name: 'author',
            label: 'Author',
            type: 'reference',
            collections: ['author']
          },
          {
            name: 'image',
            label: 'Image',
            type: 'image',
          },
          {
            name: 'description',
            label: 'Description',
            type: 'string',
            ui: {
              component: 'textarea'
            }
          },
          {
            name: 'body',
            label: 'Body',
            type: 'rich-text',
            // markdown body
            isBody: true,
          },
        ]
      },
      {
        name: 'author',
        label: 'Author',
        path: 'content/authors',
        format: 'md',
        fields: [
          {
            name: 'name',
            label: 'Name',
            type: 'string',
          },
          {
            name: 'image',
            label: 'Image',
            type: 'image',
          },
        ]
      },
      {
        name: 'nav',
        label: 'Nav',
        path: 'content/nav',
        format: 'md',
        ui: {
          // evita alterações na collection
          allowedActions: {
            create: false,
            delete: false,
          },
          // não aparece na raiz da visualização de blocos
          global: true,
        },
        fields: [
          {
            name: 'links',
            label: 'Links',
            type: 'object',
            list: true,
            ui: {
              itemProps: item => {
                return {label: item.label}
              },
            },
            fields: [
              {
                type: 'string',
                name: 'label',
                label: 'Label'
              },
              // TODO: converter para usar referências de páginas
              {
                type: 'string',
                name: 'link',
                label: 'Link'
              }
            ]
          },
        ]
      },
    ],
  },
})
