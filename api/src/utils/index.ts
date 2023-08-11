import bcrypt from 'bcrypt'

async function encrypt(text: string): Promise<string> {
  const salt = await bcrypt.genSalt()
  return await bcrypt.hash(text, salt)
}

export { encrypt }
