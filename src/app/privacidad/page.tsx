export const metadata = {
  title: 'Política de Privacidad – DetectordeIA.ai',
  description: 'Lee la política de privacidad de DetectordeIA.ai. Transparencia sobre el uso y protección de tus datos personales.',
  alternates: {
    canonical: 'https://www.detectordeia.ai/privacidad',
  },
};

export default function Privacidad() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Política de Privacidad</h1>
      <p className="text-gray-600 text-sm mb-8">Última actualización: Enero 2025</p>
      <p className="text-gray-700 mb-6">En DetectordeIA.ai nos tomamos muy en serio la privacidad de nuestros usuarios y cumplimos con el Reglamento General de Protección de Datos (GDPR) de la Unión Europea y normativas de protección de datos aplicables. A continuación, detallamos de manera transparente cómo recopilamos, usamos, almacenamos y protegemos tu información personal.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">1. Responsable del Tratamiento</h2>
      <p className="text-gray-700 mb-4">El responsable del tratamiento de tus datos personales es DetectordeIA.ai. Para cualquier consulta relacionada con la privacidad de tus datos, puedes contactarnos en <a href="mailto:buildbyagus@gmail.com" className="text-[#a259f7] underline font-semibold">buildbyagus@gmail.com</a>.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">2. Datos que Recopilamos</h2>
      <p className="text-gray-700 mb-4">Los datos que recopilamos dependen de tu tipo de usuario y del uso que hagas de la plataforma:</p>

      <p className="text-gray-700 mb-2"><strong>Usuarios Anónimos (sin registro):</strong></p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>Identificadores de sesión anónimos (localStorage) para gestionar límites diarios</li>
        <li>Datos de uso agregados y anónimos (Google Analytics)</li>
        <li>Dirección IP (temporalmente, para prevenir abuso y análisis de tráfico)</li>
      </ul>

      <p className="text-gray-700 mb-2"><strong>Usuarios Registrados (Plan Free):</strong></p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>Email y nombre (obtenidos a través de Google OAuth)</li>
        <li>Foto de perfil (opcional, desde Google)</li>
        <li>Historial de análisis (últimos 10 usos por herramienta)</li>
        <li>Fecha de registro y última actividad</li>
        <li>Información de autenticación (tokens de sesión)</li>
      </ul>

      <p className="text-gray-700 mb-2"><strong>Usuarios Premium (Plan Pro):</strong></p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>Todos los datos de usuarios registrados</li>
        <li>Información de pago procesada por Stripe (nombre, email, método de pago)</li>
        <li>ID de cliente de Stripe y suscripción</li>
        <li>Historial completo de análisis sin límite</li>
        <li>Datos de facturación y transacciones</li>
      </ul>

      <p className="text-gray-700 mb-4"><strong>Importante:</strong> Los textos que analices usando nuestras herramientas (Detector, Humanizador, Parafraseador) <strong>no se almacenan permanentemente</strong> en nuestros servidores y <strong>no se utilizan para entrenar modelos de IA</strong>. Solo se procesan temporalmente para devolver el resultado y luego se eliminan.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">3. Finalidad del Tratamiento</h2>
      <p className="text-gray-700 mb-4">Utilizamos tus datos personales para las siguientes finalidades:</p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li><strong>Provisión del servicio:</strong> Permitir el acceso y uso de las herramientas de IA</li>
        <li><strong>Gestión de cuenta:</strong> Autenticación, gestión de perfil y preferencias</li>
        <li><strong>Procesamiento de pagos:</strong> Gestión de suscripciones y facturación (a través de Stripe)</li>
        <li><strong>Aplicación de límites:</strong> Control de uso diario según tu plan</li>
        <li><strong>Historial de uso:</strong> Permitir que consultes tus análisis anteriores</li>
        <li><strong>Comunicaciones:</strong> Envío de notificaciones importantes sobre el servicio, cambios en términos o actualizaciones</li>
        <li><strong>Soporte al cliente:</strong> Responder consultas y resolver problemas técnicos</li>
        <li><strong>Análisis y mejora:</strong> Analizar el uso agregado de la plataforma para mejorar el servicio (Google Analytics)</li>
        <li><strong>Seguridad y prevención de fraude:</strong> Detectar y prevenir uso indebido, abusos o actividades fraudulentas</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">4. Base Legal del Tratamiento</h2>
      <p className="text-gray-700 mb-4">Tratamos tus datos personales basándonos en las siguientes bases legales:</p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li><strong>Consentimiento:</strong> Al registrarte o suscribirte, das tu consentimiento explícito</li>
        <li><strong>Ejecución de contrato:</strong> Necesario para prestarte el servicio al que te suscribiste</li>
        <li><strong>Interés legítimo:</strong> Para análisis de uso, mejora del servicio y prevención de fraude</li>
        <li><strong>Obligación legal:</strong> Para cumplir con normativas fiscales y de protección de datos</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">5. Compartición de Datos con Terceros</h2>
      <p className="text-gray-700 mb-4">No vendemos ni compartimos tus datos personales con terceros con fines comerciales. Sin embargo, utilizamos servicios de terceros esenciales para la operación de la plataforma:</p>

      <p className="text-gray-700 mb-2"><strong>Proveedores de servicios que utilizamos:</strong></p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li><strong>Supabase:</strong> Base de datos y autenticación (servidores en la nube)</li>
        <li><strong>Google (OAuth):</strong> Autenticación mediante Google Sign-In</li>
        <li><strong>Stripe:</strong> Procesamiento de pagos y gestión de suscripciones</li>
        <li><strong>Google Analytics:</strong> Análisis de tráfico web y uso del sitio (datos anónimos)</li>
        <li><strong>Vercel:</strong> Hosting de la aplicación web</li>
        <li><strong>OpenAI:</strong> Procesamiento de textos para análisis y transformación (datos no se almacenan)</li>
      </ul>

      <p className="text-gray-700 mb-4">Todos estos proveedores cumplen con estándares de seguridad y privacidad adecuados y solo procesan tus datos según nuestras instrucciones.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">6. Cookies y Tecnologías de Seguimiento</h2>
      <p className="text-gray-700 mb-4">DetectordeIA.ai utiliza las siguientes tecnologías de seguimiento:</p>

      <p className="text-gray-700 mb-2"><strong>Cookies esenciales:</strong></p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>Cookies de sesión para autenticación (necesarias para el funcionamiento del servicio)</li>
        <li>Tokens de sesión de Supabase</li>
      </ul>

      <p className="text-gray-700 mb-2"><strong>LocalStorage:</strong></p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>Gestión de límites diarios para usuarios anónimos</li>
        <li>Preferencias de usuario (tema, idioma, etc.)</li>
        <li>Cache temporal de resultados</li>
      </ul>

      <p className="text-gray-700 mb-2"><strong>Cookies analíticas:</strong></p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>Google Analytics (análisis de tráfico y comportamiento agregado)</li>
        <li>Estas cookies son opcionales y puedes rechazarlas</li>
      </ul>

      <p className="text-gray-700 mb-4">Puedes gestionar las cookies desde la configuración de tu navegador. Ten en cuenta que bloquear cookies esenciales puede afectar el funcionamiento de la plataforma.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">7. Retención de Datos</h2>
      <p className="text-gray-700 mb-4">Conservamos tus datos personales durante el tiempo necesario para cumplir con las finalidades descritas:</p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li><strong>Usuarios anónimos:</strong> Identificadores de sesión se eliminan tras 24 horas de inactividad</li>
        <li><strong>Usuarios registrados Free:</strong> Datos se conservan mientras la cuenta esté activa. Historial limitado a últimos 10 usos</li>
        <li><strong>Usuarios Premium:</strong> Datos se conservan mientras la suscripción esté activa + 30 días tras cancelación</li>
        <li><strong>Datos de facturación:</strong> Se conservan durante 5 años para cumplir obligaciones legales y fiscales</li>
        <li><strong>Textos analizados:</strong> Se eliminan inmediatamente tras procesar y devolver el resultado</li>
      </ul>
      <p className="text-gray-700 mb-4">Puedes solicitar la eliminación de tu cuenta y datos en cualquier momento escribiendo a <a href="mailto:buildbyagus@gmail.com" className="text-[#a259f7] underline">buildbyagus@gmail.com</a>.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">8. Tus Derechos bajo GDPR</h2>
      <p className="text-gray-700 mb-4">Como usuario, especialmente si resides en la Unión Europea, tienes los siguientes derechos:</p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li><strong>Derecho de acceso:</strong> Puedes solicitar una copia de todos los datos personales que tenemos sobre ti</li>
        <li><strong>Derecho de rectificación:</strong> Puedes corregir datos incorrectos o incompletos</li>
        <li><strong>Derecho de supresión ("derecho al olvido"):</strong> Puedes solicitar la eliminación de tus datos</li>
        <li><strong>Derecho de limitación:</strong> Puedes solicitar que limitemos el tratamiento de tus datos</li>
        <li><strong>Derecho de portabilidad:</strong> Puedes solicitar tus datos en formato estructurado y legible</li>
        <li><strong>Derecho de oposición:</strong> Puedes oponerte al tratamiento de tus datos en ciertos casos</li>
        <li><strong>Derecho a retirar el consentimiento:</strong> Puedes retirar tu consentimiento en cualquier momento</li>
        <li><strong>Derecho a presentar reclamación:</strong> Puedes presentar una queja ante la autoridad de protección de datos de tu país</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">9. Cómo Ejercer tus Derechos</h2>
      <p className="text-gray-700 mb-4">Para ejercer cualquiera de tus derechos, puedes:</p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>Enviar un email a <a href="mailto:buildbyagus@gmail.com" className="text-[#a259f7] underline font-semibold">buildbyagus@gmail.com</a></li>
        <li>Incluir en el asunto: "Ejercicio de Derechos GDPR"</li>
        <li>Especificar claramente qué derecho deseas ejercer</li>
        <li>Proporcionar información suficiente para verificar tu identidad</li>
      </ul>
      <p className="text-gray-700 mb-4">Responderemos a tu solicitud en un plazo máximo de 30 días y sin costo alguno, en cumplimiento con la normativa europea.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">10. Seguridad de los Datos</h2>
      <p className="text-gray-700 mb-4">Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos personales:</p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>Cifrado HTTPS/TLS en todas las comunicaciones</li>
        <li>Autenticación mediante OAuth 2.0 con Google</li>
        <li>Tokens de sesión seguros con expiración</li>
        <li>Procesamiento de pagos delegado a Stripe (certificado PCI DSS)</li>
        <li>Bases de datos con acceso restringido y cifrado en reposo</li>
        <li>Monitoreo continuo de seguridad y actualizaciones regulares</li>
        <li>Política de acceso limitado al personal necesario</li>
      </ul>
      <p className="text-gray-700 mb-4">Sin embargo, ningún sistema es 100% seguro. Te recomendamos mantener la confidencialidad de tus credenciales de acceso.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">11. Privacidad de Menores</h2>
      <p className="text-gray-700 mb-4">DetectordeIA.ai no está dirigido a menores de 13 años. No recopilamos intencionalmente datos personales de menores de 13 años. Si descubrimos que hemos recopilado datos de un menor sin consentimiento parental, eliminaremos dicha información de inmediato. Si eres padre/madre y crees que tu hijo nos ha proporcionado datos personales, contáctanos en <a href="mailto:buildbyagus@gmail.com" className="text-[#a259f7] underline">buildbyagus@gmail.com</a>.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">12. Transferencias Internacionales de Datos</h2>
      <p className="text-gray-700 mb-4">Algunos de nuestros proveedores de servicios pueden estar ubicados fuera del Espacio Económico Europeo (EEE). En estos casos, nos aseguramos de que existan garantías adecuadas de protección de datos mediante:</p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>Cláusulas contractuales estándar aprobadas por la Comisión Europea</li>
        <li>Certificaciones de Privacy Shield o equivalentes</li>
        <li>Medidas de seguridad adicionales</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">13. Cambios en esta Política</h2>
      <p className="text-gray-700 mb-4">Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento para reflejar cambios en nuestras prácticas o por requisitos legales. Los cambios importantes serán notificados mediante:</p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>Aviso destacado en el sitio web</li>
        <li>Notificación por email a usuarios registrados (para cambios sustanciales)</li>
        <li>Actualización de la fecha "Última actualización" al inicio de este documento</li>
      </ul>
      <p className="text-gray-700 mb-4">Te recomendamos revisar esta política periódicamente. El uso continuado del servicio tras las modificaciones implica la aceptación de la política actualizada.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">14. Contacto y Consultas</h2>
      <p className="text-gray-700 mb-4">Si tienes dudas, consultas o inquietudes sobre esta Política de Privacidad o sobre cómo tratamos tus datos personales, no dudes en contactarnos:</p>
      <ul className="list-none mb-4 text-gray-700 space-y-2">
        <li><strong>Email:</strong> <a href="mailto:buildbyagus@gmail.com" className="text-[#a259f7] underline font-semibold">buildbyagus@gmail.com</a></li>
        <li><strong>Asunto sugerido:</strong> "Consulta sobre Privacidad"</li>
      </ul>
      <p className="text-gray-700 mb-4">Responderemos a la brevedad y con la mayor claridad posible.</p>
    </div>
  );
} 