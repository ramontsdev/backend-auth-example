export const authConfig = {
  accessTokenExpiresIn: process.env.JWT_EXPIRES_IN ?? '15m',
  emailVerificationCodeExpiresInMs: 30 * 60 * 1000,
  passwordResetCodeExpiresInMs: 15 * 60 * 1000,
};

