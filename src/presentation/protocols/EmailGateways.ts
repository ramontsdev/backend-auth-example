export type SendEmailParams = {
  from?: string;
  to: string[];
  subject: string;
  html: string;
}

export interface IEmailGateway {
  sendEmail(params: SendEmailParams): Promise<void>;
}
