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
            padding: 10px;
            text-align: center;
        }
        .header img{
          width: 70%;
          margin-left: 15%;
          margin-right: 15%;
      }

        .content {
            padding: 20px;
            margin-left: 15%;
            margin-right: 15%;
        }

        .saludo {
            font-weight: 600;
        }
        .informacion{
            background-color: #cfcfcf;
            border-radius: 15px;
            margin: 15px 0;
            padding: 15px;
        }
    </style>
</head>

<body>
    <div class="header">
        <img src="https://firebasestorage.googleapis.com/v0/b/mas-eu-6aa58.appspot.com/o/sitio%2FEncabezado.png?alt=media&token=036121e9-4fc8-44e6-bc0a-033f216ab20a"
            alt="Encabezado" />
    </div>
    <div class="content">
        <p class="saludo">Estimado cliente ${data.name},</p>
        <p>Le informamos que hemos creado su solicitud de cotización.</p> 
        <p>En nuestra empresa, nos esforzamos por brindar un
            servicio confiable y de alta calidad. Nuestro equipo está comprometido con la satisfacción del cliente y la
            transparencia en cada paso del proceso. Pronto uno de nuestros asesores se estara comunicando con usted.</p>
        <p>Si tiene alguna pregunta o necesita más detalles, no dude en ponerse en contacto con nosotros. ¡Gracias por
            confiar en nosotros!</p>

        <div class="informacion">
           <strong>Mantenimientos Asesorías y Servicios E.U.</strong>
        <p><strong>Telefax:</strong> 6412880</p>
        <p><strong>Teléfono:</strong> 6444372</p>
        <p><strong>Celular:</strong> 3102554944</p> 
        </div>
        
    </div>
</body>

</html>
`

export async function POST(request: Request) {
  const data = await request.json()

  await transporter.sendMail({
    from: mailOptions.from, // sender address
    to: data.email, // list of receivers
    subject: `Notificación: Cotizacion M.A.S`, // Subject line
    text: `M.A.S`, // plain text body
    // html: `<div>Hola ${data.name} te confirmamos que tu cotizacion a sido enviado pronto nos estaremos cominicando contigo </div>`, // html body
    html: htmlContent(data),
  })

  return NextResponse.json({ message: 'Success: email was sent' })
}
