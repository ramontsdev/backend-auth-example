import { env } from '@/main/config/env';

import { emailColors } from './colors';

interface IWelcomeEmailData {
  name: string;
  verificationCode: string;
}

export function buildWelcomeEmailTemplate({ name, verificationCode }: IWelcomeEmailData): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bem-vindo ao ${env.app.name}</title>
    </head>
        <body style="margin: 0; padding: 0; background-color: ${emailColors.primary['50']}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: ${emailColors.white}; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, ${emailColors.primary['500']} 0%, ${emailColors.primary['700']} 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: ${emailColors.white}; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
            🎉 Bem-vindo ao ${env.app.name}!
          </h1>
          <p style="color: ${emailColors.primary['100']}; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
            Estamos felizes em tê-lo(a) conosco!
          </p>
        </div>

                <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: ${emailColors.black}; margin: 0 0 20px 0; font-size: 22px; font-weight: 600;">
            Olá, ${name}! 👋
          </h2>

          <p style="color: ${emailColors.primary['800']}; line-height: 1.6; margin: 0 0 25px 0; font-size: 16px;">
            Obrigado por se juntar ao <strong>${env.app.name}</strong>! Para começar a usar sua conta e ter acesso a todas as funcionalidades, você precisa verificar seu email.
          </p>

          <!-- Verification Code Box -->
          <div style="background: linear-gradient(135deg, ${emailColors.primary['50']} 0%, ${emailColors.primary['100']} 100%); border: 2px dashed ${emailColors.primary['300']}; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
            <p style="color: ${emailColors.black}; margin: 0 0 15px 0; font-size: 16px; font-weight: 500;">
              Seu código de verificação:
            </p>
            <div style="background-color: ${emailColors.primary['500']}; color: ${emailColors.white}; font-size: 32px; font-weight: 700; padding: 20px; border-radius: 8px; letter-spacing: 4px; font-family: 'Courier New', monospace;">
              ${verificationCode}
            </div>
            <p style="color: ${emailColors.primary['600']}; margin: 15px 0 0 0; font-size: 14px;">
              Este código expira em 15 dias
            </p>
          </div>

          <p style="color: ${emailColors.primary['800']}; line-height: 1.6; margin: 25px 0 0 0; font-size: 16px;">
            Insira este código no aplicativo para ativar sua conta e começar a gerenciar suas finanças de forma inteligente! 💰
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: ${emailColors.primary['50']}; padding: 30px; text-align: center; border-top: 1px solid ${emailColors.primary['200']};">
          <p style="color: ${emailColors.primary['700']}; margin: 0 0 10px 0; font-size: 14px;">
            Precisa de ajuda? Entre em contato conosco!
          </p>
          <p style="color: ${emailColors.primary['600']}; margin: 0; font-size: 12px;">
            Este é um email automático, por favor não responda.
          </p>
          <div style="margin-top: 20px;">
            <p style="color: ${emailColors.primary['600']}; margin: 0; font-size: 12px;">
              © 2024 ${env.app.name}. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
