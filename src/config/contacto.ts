// Datos de contacto de la agencia. Lo que quede vacío ('') no se muestra.
// TODO: completar con tus datos reales
export const CONTACTO = {
  ubicacion: 'Buenos Aires, Argentina',
  // Solo números, con código de país y sin el 0 ni el 15. Ej: '5491112345678'
  whatsapp: '5491173660802',
  // Cómo se muestra el número en pantalla. Ej: '+54 9 11 1234-5678'
  telefonoVisible: '+54 9 11 73660802',
  email: '',
  // Mensaje que aparece precargado al abrir WhatsApp
  mensajeWhatsapp: 'Hola! Vi la web de Codelabs y quiero consultar por un proyecto.',
  // URL de la política de privacidad (cuando la tengas)
  privacidadUrl: '/privacidad.html',
}

export const whatsappUrl = () =>
  CONTACTO.whatsapp
    ? `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(CONTACTO.mensajeWhatsapp)}`
    : ''
