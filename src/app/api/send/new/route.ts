import { NextResponse, NextRequest } from 'next/server'
import { transporter, mailOptions } from '@/nodemailer'

// Handles POST requests to /api

const htmlContent = (data: any) => `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .header {
          background-color: #3498db;
          color: white;
          padding: 10px;
          text-align: center;
        }
        .content {
          padding: 20px;
        }
        .saludo{
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Se Creo la solicitud</h1>
      </div>
      <div> 
        <p class="saludo">
        Hola ${data.name}
        </p>  
        <p>
          te confirmamos que tu cotizacion a sido enviado pronto nos estaremos cominicando contigo 
        </p>
      </div>
    </body>
  </html>
`

export async function POST(request: Request) {
  const data = await request.json()

  await transporter.sendMail({
    from: mailOptions.from, // sender address
    to: data.email, // list of receivers
    subject: `Notificacion: Cotizacion M.A.S`, // Subject line
    text: `M.A.S`, // plain text body
    // html: `<div>Hola ${data.name} te confirmamos que tu cotizacion a sido enviado pronto nos estaremos cominicando contigo </div>`, // html body
    html: htmlContent(data),
  })

  return NextResponse.json({ message: 'Success: email was sent' })
}
