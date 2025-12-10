import { env } from '@/main/config/env';

interface IResendVerificationCodeEmailData {
  verificationCode: string;
}

export function buildResendVerificationCodeEmailTemplate({ verificationCode }: IResendVerificationCodeEmailData): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Código de Verificação - ${env.app.name}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f7fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #38b2ac 0%, #319795 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
            📧 Verificação de Email
          </h1>
          <p style="color: #b2f5ea; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
            Novo código de verificação
          </p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #2d3748; margin: 0 0 20px 0; font-size: 22px; font-weight: 600;">
            Seu novo código chegou! ✨
          </h2>

          <p style="color: #4a5568; line-height: 1.6; margin: 0 0 25px 0; font-size: 16px;">
            Aqui está o novo código de verificação para ativar sua conta no <strong>${env.app.name}</strong>. Use-o para confirmar seu email.
          </p>

          <!-- Verification Code Box -->
          <div style="background: linear-gradient(135deg, #b2f5ea 0%, #81e6d9 100%); border: 2px dashed #4fd1c7; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
            <p style="color: #2d3748; margin: 0 0 15px 0; font-size: 16px; font-weight: 500;">
              Seu código de verificação:
            </p>
            <div style="background-color: #319795; color: #ffffff; font-size: 32px; font-weight: 700; padding: 20px; border-radius: 8px; letter-spacing: 4px; font-family: 'Courier New', monospace;">
              ${verificationCode}
            </div>
            <p style="color: #718096; margin: 15px 0 0 0; font-size: 14px;">
              Este código expira em 24 horas
            </p>
          </div>

          <p style="color: #4a5568; line-height: 1.6; margin: 25px 0 0 0; font-size: 16px;">
            Após verificar seu email, você terá acesso completo a todas as funcionalidades do ${env.app.name}! 🚀
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #718096; margin: 0 0 10px 0; font-size: 14px;">
            Precisa de ajuda? Entre em contato conosco!
          </p>
          <p style="color: #a0aec0; margin: 0; font-size: 12px;">
            Este é um email automático, por favor não responda.
          </p>
          <div style="margin-top: 20px;">
            <p style="color: #a0aec0; margin: 0; font-size: 12px;">
              © 2024 ${env.app.name}. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
