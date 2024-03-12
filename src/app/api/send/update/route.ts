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

        .informacion {
            background-color: #cfcfcf;
            border-radius: 15px;
            margin: 15px 0;
            padding: 15px;
        }
        .rta{
            font-style: italic;
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
        <div>
            <p>
                Es un placer informarte que hemos creado una cotización personalizada para el servicio que solicitaste
                en nuestra página web. 
                <p>El precio total para el proyecto es de <strong>${data.price}</strong>, que incluye todos los
                detalles y beneficios que hemos diseñado especialmente para ti. </p>
            </p>
            <p>Nuestro especialista ha dejado las siguientes observaciones: <p class="rta">${data.answer}</p></p>
            <p>
                En MAS E.U, nos enorgullece ofrecer soluciones confiables y de alta calidad. Nuestro
                equipo de expertos se ha esforzado por crear una propuesta que se ajuste a tus necesidades y objetivos.
                Aquí algunos motivos por los que deberías considerar nuestra oferta:

                <p><strong>Calidad Garantizada:</strong> Nuestro servicio está respaldado por años de experiencia y un historial probado de
                satisfacción del cliente. Puedes confiar en que cumpliremos con tus expectativas y más.</p>
                <p><strong>Atención Personalizada:</strong> No somos solo una empresa, somos tus aliados. Estamos aquí para escucharte,
                responder a tus preguntas y adaptarnos a tus requerimientos específicos.</p>
                <p><strong>Transparencia:</strong> Hemos detallado cada componente de la cotización para que sepas exactamente en qué estás
                invirtiendo. Sin sorpresas ni costos ocultos.</p>
                <p><strong>Tiempo de Entrega:</strong>Trabajamos eficientemente para cumplir con los plazos acordados. Tu satisfacción es
                nuestra prioridad.</p> 
                <p>Te invitamos a considerar nuestra propuesta y a tomar una decisión informada. Si tienes alguna pregunta
                o necesitas más información, no dudes en contactarnos. Estamos ansiosos por comenzar este proyecto
                contigo.</p>
                <br/>
                <p>¡Gracias por confiar en nosotros!</p>
                <br/> 
                <p>Atentamente, El equipo de MAS E.U.</p>
            </p>
            
        </div>

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

  const info = await transporter.sendMail({
    from: mailOptions.from, // sender address
    to: data.email, // list of receivers
    subject: `Notificacion: Cotizacion M.A.S`, // Subject line
    text: `M.A.S`, // plain text body
    html: htmlContent(data), // html body
  })

  return NextResponse.json({ message: 'Success: email was sent' })
}
