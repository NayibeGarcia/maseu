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
        <h1>Cotizacion</h1>
      </div>
      <div>Hola ${data.name} <p>Informacion: ${data.answer}</p> ${
  data.price ? ` <p>precio: ${data.price}<p>` : ''
} 
      </div>
    </body>
  </html>
`

export async function POST(request: Request) {
  const data = await request.json()

  const info = await transporter.sendMail({
    from: mailOptions.from, // sender address
    to: data.email, // list of receivers
    subject: `Notificacion: Cotizacion M.A.S`, // Subject line
    text: `M.A.S`, // plain text body
    html: htmlContent(data), // html body
  })

  return NextResponse.json({ message: 'Success: email was sent' })
}
