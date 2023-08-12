interface Session {
  id: bigint
  external_id: string
  user_id: bigint
  created_at: Date
  expires_at: Date
}

export { Session }
