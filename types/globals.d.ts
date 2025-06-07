export {}

// Create a type for the roles
export type Roles = 'admin' | 'author'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}