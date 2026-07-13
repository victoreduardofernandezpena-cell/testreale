import { PrismaClient } from '@prisma/client'

const db=new PrismaClient()
const services=[
 ['bano-clasico-ozono','Baño clásico y baño con ozono','Higiene completa para cuidar la piel y devolverle brillo al pelaje.'],
 ['banos-medicados','Baños medicados','Cuidado de higiene para mascotas con necesidades particulares de piel.'],
 ['corte-comercial','Corte comercial','Un acabado práctico, limpio y cómodo para el día a día.'],
 ['cortes-por-raza','Cortes por raza','Un corte que respeta la silueta y las características de cada raza.'],
 ['consulta-veterinaria','Consulta veterinaria','Evaluación profesional para inquietudes sobre la salud de tu mascota.'],
 ['profilaxis-dental','Profilaxis dental','Valoración y limpieza profesional para apoyar la salud oral.'],
]

for(const [slug,name,description] of services)await db.service.upsert({where:{slug},update:{name,description,active:true},create:{slug,name,description}})
await db.$disconnect()

