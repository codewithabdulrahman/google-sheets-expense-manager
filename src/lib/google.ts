import { google } from "googleapis";

export function getOAuth2Client(accessToken: string) {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.NEXTAUTH_URL ? `${process.env.NEXTAUTH_URL}/api/auth/callback/google` : undefined,
  );
  auth.setCredentials({ access_token: accessToken });
  return auth;
}

export function getSheets(accessToken: string) {
  const auth = getOAuth2Client(accessToken);
  return google.sheets({ version: "v4", auth });
}

export function getDrive(accessToken: string) {
  const auth = getOAuth2Client(accessToken);
  return google.drive({ version: "v3", auth });
}
