import { JwtPayload } from "jsonwebtoken";

export default interface IJwt extends JwtPayload {
  id?: string;
}
