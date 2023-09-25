import { JwtPayload } from 'jsonwebtoken'

export default interface IJWT extends JwtPayload {
  id?: string
}
