/* eslint-disable @typescript-eslint/ban-types */
export interface User {
  userPassword: any;
  userId: String;
  userName: String;
  userEmail: String;
  userPhone: String;
  created: number;
  roles: Roles;
}

export interface Roles {
  admin?: boolean;
  subscriber?: boolean; // Make a wallet sprint support
}
