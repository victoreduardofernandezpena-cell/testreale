export const contact = { phone: '+1 829 893 1861', email: 'info@realengo.com', location: 'Santo Domingo, República Dominicana', hours: 'Horario por confirmar' }

const imgs = {
  bath: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=85',
  skin: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&w=1200&q=85',
  cut: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85',
  breed: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85',
  vet: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1200&q=85',
  dental: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1200&q=85',
}

export const services = [
  { slug:'bano-clasico-ozono', name:'Baño clásico y baño con ozono', short:'Higiene completa para cuidar la piel y devolverle brillo al pelaje.', description:'Un ritual de limpieza adaptado a las necesidades de tu mascota. Incluye corte de uñas y limpieza de oídos, según la información publicada por RealEngo.', benefits:['Limpieza cuidadosa del pelaje','Corte de uñas y limpieza de oídos','Opción de baño con ozono'], indications:'Cuéntanos sobre sensibilidades de piel, alergias o recomendaciones veterinarias antes de la cita.', image:imgs.bath },
  { slug:'banos-medicados', name:'Baños medicados', short:'Cuidado de higiene indicado para mascotas con necesidades particulares de piel.', description:'Servicio con productos específicos para la piel. La selección debe confirmarse con el equipo y seguir cualquier indicación veterinaria aplicable.', benefits:['Atención a necesidades particulares','Selección responsable de productos','Seguimiento de indicaciones comunicadas'], indications:'Consulta primero si tu mascota requiere evaluación veterinaria o tiene un producto indicado.', image:imgs.skin },
  { slug:'corte-comercial', name:'Corte comercial', short:'Un acabado práctico, limpio y cómodo para el día a día.', description:'Corte de mantenimiento pensado para facilitar la higiene y conservar una apariencia cuidada.', benefits:['Acabado limpio y funcional','Adaptado al estado del pelaje','Orientación sobre mantenimiento'], indications:'El resultado depende del tipo y condición actual del pelaje. Se confirma durante la evaluación.', image:imgs.cut },
  { slug:'cortes-por-raza', name:'Cortes por raza', short:'Un corte que respeta la silueta y las características propias de cada raza.', description:'Grooming especializado orientado a resaltar las características del manto y la silueta de tu mascota.', benefits:['Evaluación del tipo de pelaje','Acabado acorde con la raza','Cuidado de zonas sensibles'], indications:'Comparte una foto actual y cualquier preferencia al solicitar la cita.', image:imgs.breed },
  { slug:'consulta-veterinaria', name:'Consulta veterinaria', short:'Evaluación profesional para atender inquietudes sobre la salud de tu mascota.', description:'Espacio de evaluación veterinaria para consultas de rutina o preocupaciones específicas. El alcance se confirma directamente con RealEngo.', benefits:['Evaluación individual','Orientación sobre próximos pasos','Registro de información relevante'], indications:'En una emergencia, contacta de inmediato a un centro veterinario con servicio de urgencias.', image:imgs.vet },
  { slug:'profilaxis-dental', name:'Profilaxis dental', short:'Valoración y limpieza profesional para apoyar la salud oral de tu mascota.', description:'Servicio dental sujeto a valoración profesional previa. El equipo debe confirmar preparación, alcance y cuidados posteriores.', benefits:['Valoración del estado oral','Plan de cuidado según evaluación','Orientación para mantenimiento'], indications:'No suspendas alimentos ni administres medicamentos sin indicación profesional previa.', image:imgs.dental },
]

export const products = [
  {id:1, slug:'champu-piel-sensible', name:'Champú para piel sensible', category:'Higiene', price:0, image:imgs.skin, description:'Producto de demostración. Marca, fórmula, precio y disponibilidad pendientes de catálogo real.'},
  {id:2, slug:'cepillo-cuidado-diario', name:'Cepillo de cuidado diario', category:'Grooming', price:0, image:imgs.cut, description:'Producto de demostración. Modelo, precio y disponibilidad pendientes de catálogo real.'},
  {id:3, slug:'balsamo-para-patas', name:'Bálsamo para patas', category:'Bienestar', price:0, image:imgs.bath, description:'Producto de demostración. Ingredientes, precio y disponibilidad pendientes de catálogo real.'},
  {id:4, slug:'kit-higiene-dental', name:'Kit de higiene dental', category:'Higiene', price:0, image:imgs.dental, description:'Producto de demostración. Contenido, precio y disponibilidad pendientes de catálogo real.'},
]

export const posts = [
  {slug:'primer-perro', category:'Convivencia', title:'Cómo prepararte para recibir tu primer perro', excerpt:'Una guía práctica para organizar el hogar, las rutinas y los primeros cuidados.', date:'Contenido editorial por revisar', image:imgs.breed},
  {slug:'cuidado-del-pelaje', category:'Grooming', title:'Una rutina sencilla para cuidar el pelaje', excerpt:'Qué observar entre visitas de grooming y cuándo consultar con un profesional.', date:'Contenido editorial por revisar', image:imgs.cut},
  {slug:'piel-sensible', category:'Bienestar', title:'Señales que conviene observar en una piel sensible', excerpt:'Cambios visibles que puedes registrar y comunicar durante una consulta.', date:'Contenido editorial por revisar', image:imgs.skin},
]
