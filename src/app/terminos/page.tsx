export const metadata = {
  title: 'Términos y Condiciones – DetectordeIA.ai',
  description: 'Lee los términos y condiciones de uso de DetectordeIA.ai. Transparencia, derechos y obligaciones para usuarios de la plataforma.',
  alternates: {
    canonical: 'https://www.detectordeia.ai/terminos',
  },
};

export default function Terminos() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Términos y Condiciones</h1>
      <p className="text-gray-600 text-sm mb-8">Última actualización: Enero 2025</p>
      <p className="text-gray-700 mb-6">Bienvenido a DetectordeIA.ai. Al utilizar nuestro sitio web y servicios, aceptas los siguientes términos y condiciones. Por favor, léelos cuidadosamente.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">1. Descripción del Servicio</h2>
      <p className="text-gray-700 mb-4">DetectordeIA.ai es una plataforma online que ofrece tres herramientas de inteligencia artificial en español:</p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li><strong>Detector de IA:</strong> Analiza textos para identificar si fueron generados por inteligencia artificial</li>
        <li><strong>Humanizador de IA:</strong> Reescribe textos generados por IA para que parezcan más humanos</li>
        <li><strong>Parafraseador:</strong> Reformula textos manteniendo el significado original</li>
      </ul>
      <p className="text-gray-700 mb-4">Ofrecemos un Plan Free gratuito, Plan Express (pase de 24 horas) y Plan Pro (suscripción mensual/anual) con funcionalidades adicionales.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">2. Planes y Servicios</h2>
      <p className="text-gray-700 mb-2"><strong>Plan Free:</strong></p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>3 usos diarios del Humanizador</li>
        <li>15 análisis diarios del Detector</li>
        <li>10 usos diarios del Parafraseador</li>
        <li>Hasta 1,200 caracteres por análisis</li>
        <li>Acceso al modo estándar únicamente</li>
        <li>Sin necesidad de registro (usuarios anónimos)</li>
      </ul>
      <p className="text-gray-700 mb-2"><strong>Plan Express ($3.99/pago único):</strong></p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>Acceso completo por 24 horas</li>
        <li>Usos ilimitados en todas las herramientas</li>
        <li>Caracteres ilimitados por análisis</li>
        <li>Acceso a 5 modos premium</li>
        <li>Subida de archivos (PDF, DOCX, TXT)</li>
        <li>Perfecto para entregas urgentes</li>
      </ul>
      <p className="text-gray-700 mb-2"><strong>Plan Pro ($12.99/mes o $124.68/año):</strong></p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>Usos ilimitados diarios</li>
        <li>Caracteres ilimitados por análisis</li>
        <li>Acceso a 5 modos premium (Estándar, Formal, Creativo, Simplificado, Académico)</li>
        <li>Subida de archivos (PDF, DOCX, TXT)</li>
        <li>Historial completo de análisis</li>
        <li>Soporte prioritario</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">3. Uso Permitido</h2>
      <p className="text-gray-700 mb-4">El usuario se compromete a utilizar la plataforma de manera lícita y conforme a estos términos. <strong>No está permitido:</strong></p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>El uso automatizado mediante bots, scripts o scraping sin autorización</li>
        <li>La reventa del servicio o acceso a terceros</li>
        <li>El uso para actividades ilícitas, fraudulentas o que violen derechos de terceros</li>
        <li>Intentos de evadir límites de uso mediante múltiples cuentas o manipulación de identificadores</li>
        <li>Ingeniería inversa, descompilación o intento de extraer el código fuente</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">4. Propiedad Intelectual</h2>
      <p className="text-gray-700 mb-4">Todo el contenido, marca, software, diseño y metodologías de DetectordeIA.ai son propiedad exclusiva de sus creadores. No se permite la copia, distribución, modificación o uso no autorizado del contenido. Los textos analizados por los usuarios son propiedad de los mismos y no se almacenan ni se utilizan para entrenar modelos.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">5. Limitación de Responsabilidad</h2>
      <p className="text-gray-700 mb-4">DetectordeIA.ai ofrece resultados <strong>orientativos</strong> y no garantiza la precisión absoluta en la detección de textos generados por IA. La precisión puede variar según el tipo de texto, el modelo de IA utilizado y otros factores. El usuario acepta que:</p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>El uso del servicio es bajo su propio riesgo</li>
        <li>Los resultados no deben ser la única base para decisiones importantes (académicas, legales, profesionales)</li>
        <li>La plataforma no se responsabiliza por daños directos, indirectos o consecuentes derivados del uso del servicio</li>
        <li>No garantizamos disponibilidad ininterrumpida del servicio (puede haber mantenimiento, actualizaciones o fallos técnicos)</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">6. Pagos y Suscripciones</h2>
      <p className="text-gray-700 mb-4">Los pagos se procesan de forma segura a través de Stripe. Al suscribirte a un plan de pago:</p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>Autorizas cargos recurrentes según el plan elegido (mensual o anual)</li>
        <li>Puedes cancelar en cualquier momento desde el portal de gestión de suscripción</li>
        <li>Las cancelaciones surten efecto al final del período de facturación actual</li>
        <li>No ofrecemos reembolsos. Al suscribirte, aceptas esta política de no reembolso</li>
        <li>Al cancelar, mantendrás acceso hasta el final del período de facturación actual sin reembolso por días no utilizados</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">7. Privacidad y Datos</h2>
      <p className="text-gray-700 mb-4">El tratamiento de tus datos personales se rige por nuestra <a href="/privacidad" className="text-[#a259f7] underline">Política de Privacidad</a>, que forma parte integral de estos términos. Cumplimos con el GDPR y normativas de protección de datos aplicables.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">8. Terminación del Servicio</h2>
      <p className="text-gray-700 mb-4">Nos reservamos el derecho de suspender o terminar el acceso al servicio a cualquier usuario que viole estos términos, sin previo aviso y sin reembolso. El usuario puede cancelar su cuenta en cualquier momento.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">9. Modificaciones</h2>
      <p className="text-gray-700 mb-4">Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios importantes serán notificados a través del sitio web o por email. El uso continuado del servicio después de las modificaciones implica la aceptación de los nuevos términos.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">10. Ley Aplicable y Jurisdicción</h2>
      <p className="text-gray-700 mb-4">Estos términos se rigen por las leyes aplicables en la jurisdicción del servicio. Cualquier disputa será resuelta mediante arbitraje o en los tribunales competentes.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">11. Contacto</h2>
      <p className="text-gray-700 mb-4">Para consultas sobre estos términos, puedes escribirnos a <a href="mailto:buildbyagus@gmail.com" className="text-[#a259f7] underline font-semibold">buildbyagus@gmail.com</a>.</p>
    </div>
  );
} 