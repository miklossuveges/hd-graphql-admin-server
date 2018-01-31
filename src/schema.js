import {
  graphql,
  buildSchema,
  // introspectionQuery,
  // buildASTSchema,
  parse,
  visit,
  Kind
} from 'graphql'
// import { query } from './mysql/index'

const typeDefs = `
directive @auth(roles: [String]) on FIELD_DEFINITION
directive @column(name: String) on FIELD_DEFINITION
type Comment {
  # nop
  archived: Boolean!
    @auth(roles: ["admin"])
    @column(name: "comment_archived")
}
type dsa {
  comments(a: String): [Comment]
}
`

export const buildDirectiveRegistry = (schemaIDL = typeDefs) => {
  const schemaAST = parse(schemaIDL)
  const directiveRegistry = {}
  let currentType, currentField

  visit(schemaAST, {
    [Kind.OBJECT_TYPE_DEFINITION]: {
      enter ({ name: { value: name } }) {
        directiveRegistry[name] = {}
        currentType = name
      }
    },

    [Kind.FIELD_DEFINITION]: {
      enter (node, key, parent, path, ancestors) {
        const { name: { value: name } } = node
        directiveRegistry[currentType] = {
          ...directiveRegistry[currentType],
          [name]: []
        }
        currentField = name
      }
    },

    [Kind.DIRECTIVE]: {
      enter (node) {
        directiveRegistry[currentType][currentField] = [
          ...directiveRegistry[currentType][currentField],
          node
        ]
      }
    }
  })

  // console.log(JSON.stringify(directiveRegistry, null, 1))
  return directiveRegistry
}

// type FieldDefinition {
//   name: String!
//   directives: [DirectiveAST]
// }
// type TypeDefinition {
//   name: String!
//   fields: [FieldDefinition]
// }
export const DirectiveRegistryIDL = `
type DirectiveAST {
  name: String!
  ast: String!
}
type Query {
  getDirectives(type: String!, field: String!): [String]
}
schema {
  query: Query
}
`

export const createDirectiveRegistrySchema = async (schemaIDL) => {
  const directiveRegistry = buildDirectiveRegistry(schemaIDL)
  const resolvers = {
    getDirectives ({ type, field }) {
      console.log(type, field)
      if (directiveRegistry[type] && directiveRegistry[type][field]) { return directiveRegistry[type][field].map(JSON.stringify) }
      return null
    }
  }
  const schema = buildSchema(DirectiveRegistryIDL)
  const boi = await graphql(schema, 'query { getDirectives(type: "Comment", field: "archived") }', resolvers)
  console.log(boi)
}
