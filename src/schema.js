import {
  // graphql,
  // buildSchema,
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

  console.log(JSON.stringify(directiveRegistry, null, 1))
  return directiveRegistry
}
