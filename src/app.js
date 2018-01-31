import joinMonster from 'join-monster'
import joinMonsterAdapt from 'join-monster-graphql-tools-adapter'
import { makeExecutableSchema } from 'graphql-tools'
import { queryResult } from './mysql/index'
import { graphql } from 'graphql'

const typeDefs = `
type Comment {
  id: Int!,
  body: String!,
  postId: Int,
  authorId: Int,
  archived: Boolean
}

type Post {
  id: Int!,
  body: String!,
  authorId: Int,
  numComments: Int!,
  comments: [Comment]
}

type User {
  id: Int!,
  email: String!,
  fullName: String!,
  favNums: [Int],
  posts: [Post]
}

type Query {
  user(id: Int!): User
}
`

const resolvers = {
  Query: {
    user (parent, args, ctx, resolveInfo) {
      return joinMonster(resolveInfo, ctx, async sql => {
        console.log(sql)
        const results = await queryResult(sql)
        return results
      }, { dialect: 'mysql' })
    }
  },
  User: {
    fullName (user) {
      // console.log(user)
      return user.first_name + ' ' + user.last_name
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

joinMonsterAdapt(schema, {
  Query: {
    fields: {
      // add a function to generate the "where condition"
      user: {
        where: (table, args) => `${table}.id = ${args.id}`
      }
    }
  },
  User: {
    // map the User object type to its SQL table
    sqlTable: 'accounts',
    uniqueKey: 'id',
    // tag the User's fields
    fields: {
      email: {
        sqlColumn: 'email_address'
      },
      fullName: {
        sqlDeps: [ 'first_name', 'last_name' ]
      },
      posts: {
        sqlJoin: (userTable, postTable) => `${userTable}.id = ${postTable}.author_id`
      }
    }
  },
  Post: {
    sqlTable: 'posts',
    uniqueKey: 'id',
    fields: {
      numComments: {
        // count with a correlated subquery
        sqlExpr: table => `(SELECT count(*) FROM comments where ${table}.id = comments.post_id)`
      },
      comments: {
        // fetch the comments in another batch request instead of joining
        sqlBatch: {
          thisKey: 'post_id',
          parentKey: 'id'
        }
      }
    }
  },
  Comment: {
    sqlTable: 'comments',
    uniqueKey: 'id',
    fields: {
      postId: {
        sqlColumn: 'post_id'
      },
      authorId: {
        sqlColumn: 'author_id'
      }
    }
  }
})

const q = `{
  user(id: 42) {
    id
    fullName
    email
    posts {
      id
      body
      numComments
      comments {
        id
        body
        authorId
        archived
      }
    }
  }
}`
export const run = async () => {
  const eee = await graphql(schema, q)
  console.log(JSON.stringify(eee, null, 2))
}
