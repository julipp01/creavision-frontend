import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ThreeScene from './ThreeScene.jsx';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { FaLightbulb, FaRocket, FaChartLine, FaStar, FaUsers, FaCode, FaGlobe, FaWhatsapp, FaUser, FaBars, FaChevronLeft, FaChevronRight, FaEnvelope, FaPhone, FaReact, FaNodeJs, FaJava, FaPython, FaSearch, FaDatabase, FaPhp, FaJs, FaCss3, FaHtml5 } from 'react-icons/fa';

function Home() {
  // Referencias a las secciones para el desplazamiento suave
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  const seoRef = useRef(null);
  const languagesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);

  // Estados para controlar el menú y los carruseles
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentProject, setCurrentProject] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState(0);

  // Datos para los carruseles
  const testimonials = [
    { text: "CREAVISION optimizó nuestro sitio web y duplicó nuestras ventas online.", author: "Juan Pérez, CEO de EcoTech", rating: 4.8 },
    { text: "Su software a medida transformó nuestra gestión interna.", author: "Lucía Ramírez, Gerente de Innovatech", rating: 4.7 },
    { text: "El equipo nos posicionó en Google en tiempo récord.", author: "Marcos Silva, Fundador de Green Solutions", rating: 4.9 },
    { text: "Resultados sorprendentes con su estrategia de marketing digital.", author: "Ana Torres, Directora de Marketing", rating: 4.6 },
  ];

  const projects = [
    { title: "Sistema ERP Personalizado", description: "Gestión empresarial integral con módulos a medida.", image: "https://images.unsplash.com/photo-1551288049-b5dcea69d47e?q=80&w=600&h=400&auto=format&fit=crop" },
    { title: "Tienda Online de Moda", description: "E-commerce con diseño atractivo y pagos seguros.", image: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=600&h=400&auto=format&fit=crop" },
    { title: "Plataforma Educativa", description: "Sistema de aprendizaje con cursos interactivos.", image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=600&h=400&auto=format&fit=crop" },
    { title: "App de Gestión de Tareas", description: "Aplicación móvil para equipos de trabajo.", image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?q=80&w=600&h=400&auto=format&fit=crop" },
    { title: "Sitio Web Corporativo", description: "Diseño moderno y optimizado para SEO.", image: "https://images.unsplash.com/photo-1460925895917-afdab8276844?q=80&w=600&h=400&auto=format&fit=crop" },
    { title: "Campaña SEO Exitosa", description: "Aumento del 80% en tráfico orgánico.", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&h=400&auto=format&fit=crop" },
    { title: "Software de Inventario", description: "Control de stock en tiempo real.", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3a8a9f7?q=80&w=600&h=400&auto=format&fit=crop" },
    { title: "Landing Page Promocional", description: "Página de aterrizaje con alta conversión.", image: "https://images.unsplash.com/photo-1556157382-91ed4a5d529c?q=80&w=600&h=400&auto=format&fit=crop" },
    { title: "Sistema de Reservas", description: "Plataforma para hoteles y restaurantes.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&h=400&auto=format&fit=crop" },
    { title: "Dashboard Analítico", description: "Panel de datos para decisiones estratégicas.", image: "https://images.unsplash.com/photo-1551288049-b5dcea69d47e?q=80&w=600&h=400&auto=format&fit=crop" },
  ];

  const languages = [
    { icon: <FaReact className="text-5xl text-cyan-400 mb-2" />, name: "React" },
    { icon: <FaNodeJs className="text-5xl text-green-500 mb-2" />, name: "Node.js" },
    { icon: <FaJava className="text-5xl text-red-600 mb-2" />, name: "Java" },
    { icon: <FaPython className="text-5xl text-blue-400 mb-2" />, name: "Python" },
    { icon: <FaDatabase className="text-5xl text-purple-500 mb-2" />, name: "MySQL" },
    { icon: <FaPhp className="text-5xl text-blue-600 mb-2" />, name: "PHP" },
    { icon: <FaJs className="text-5xl text-yellow-400 mb-2" />, name: "JavaScript" },
    { icon: <FaCss3 className="text-5xl text-blue-500 mb-2" />, name: "CSS3" },
    { icon: <FaHtml5 className="text-5xl text-orange-500 mb-2" />, name: "HTML5" },
  ];

  // Función memoizada para el desplazamiento suave
  const scrollToSection = useCallback((ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Funciones memoizadas para los carruseles
  const nextTestimonial = useCallback(() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length), [testimonials.length]);
  const prevTestimonial = useCallback(() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length), [testimonials.length]);
  const nextProject = useCallback(() => setCurrentProject((prev) => (prev + 3) % projects.length), [projects.length]);
  const prevProject = useCallback(() => setCurrentProject((prev) => (prev - 3 + projects.length) % projects.length), [projects.length]);
  const nextLanguage = useCallback(() => setCurrentLanguage((prev) => (prev + 3) % languages.length), [languages.length]);
  const prevLanguage = useCallback(() => setCurrentLanguage((prev) => (prev - 3 + languages.length) % languages.length), [languages.length]);

  // Efecto para el cambio automático de carruseles
  useEffect(() => {
    const interval = setInterval(() => {
      nextProject();
      nextTestimonial();
      nextLanguage();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextProject, nextTestimonial, nextLanguage]);

  // Función para renderizar estrellas de calificación
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= Math.floor(rating) ? 'text-yellow-400' : i === Math.ceil(rating) && rating % 1 !== 0 ? 'text-yellow-400 opacity-50' : 'text-gray-500'}
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-gray-900 text-white font-poppins overflow-hidden relative min-h-screen">
      {/* Cursor personalizado */}
      <div className="cursor fixed w-6 h-6 bg-cyan-400 rounded-full pointer-events-none z-50 transition-transform duration-200 transform -translate-x-1/2 -translate-y-1/2 scale-100 hover:scale-150"></div>

      {/* Fondo de partículas optimizado */}
      <Particles
        options={{
          background: { color: "#1a202c" },
          particles: { number: { value: 50 }, size: { value: 2 }, move: { enable: true, speed: 0.5 } },
        }}
        init={loadFull}
      />

      {/* Encabezado fijo */}
      <header className="fixed top-0 w-full bg-gray-800 bg-opacity-90 z-40 py-3 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center text-xl font-bold text-cyan-400 transition-all duration-300"
          >
            <FaLightbulb className="mr-2 text-3xl text-yellow-400" />
            CREAVISION
          </motion.div>
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1, color: '#2dd4bf' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              <FaBars className="text-2xl" />
            </motion.button>
          </div>
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:flex md:space-x-6 absolute md:static top-14 right-4 md:top-0 bg-gray-800 md:bg-transparent p-4 md:p-0 rounded-md md:flex-row flex-col w-48 md:w-auto z-50`}>
            {[
              { ref: heroRef, label: 'Inicio' },
              { ref: servicesRef, label: 'Servicios' },
              { ref: portfolioRef, label: 'Portafolio' },
              { ref: seoRef, label: 'SEO' },
              { ref: languagesRef, label: 'Tecnologías' },
              { ref: testimonialsRef, label: 'Testimonios' },
              { ref: contactRef, label: 'Contacto' },
            ].map((item, idx) => (
              <motion.button
                key={idx}
                onClick={() => { scrollToSection(item.ref); setIsMenuOpen(false); }}
                whileHover={{ scale: 1.1, color: '#2dd4bf' }}
                whileTap={{ scale: 0.95 }}
                className="text-white font-semibold block md:inline-block py-2 md:py-0"
              >
                {item.label}
              </motion.button>
            ))}
          </nav>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="pt-16 relative z-10">
        {/* Sección Hero */}
        <section ref={heroRef} className="relative flex items-center justify-center h-[60vh] bg-gradient-to-b from-gray-800 to-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 w-full h-full z-0">
            <iframe
              className="w-full h-full opacity-20 object-cover"
              src="https://www.youtube.com/embed/nuTtfFAmNcE?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&playlist=nuTtfFAmNcE"
              title="Background Video"
              frameBorder="0"
              allowFullScreen
              style={{ objectFit: 'cover' }}
            ></iframe>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              Soluciones Digitales a Medida
            </motion.h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">Desarrollo de software, diseño web y estrategias SEO para tu éxito.</p>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: '#2dd4bf' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(contactRef)}
              className="px-8 py-3 bg-cyan-500 text-white text-lg font-semibold rounded-full shadow-lg transition-all"
            >
              ¡Contáctanos Ahora!
            </motion.button>
          </div>
        </section>

        {/* Sección Servicios */}
        <section ref={servicesRef} className="py-12 sm:py-16 bg-gray-900 text-center">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              <FaCode className="mr-2 text-yellow-400 text-3xl md:text-4xl" />
              Nuestros Servicios
            </motion.h2>
            <p className="text-gray-300 mb-8 sm:mb-12 max-w-xl mx-auto text-sm sm:text-base">Transformamos tus ideas en soluciones efectivas.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <motion.h3
                  whileHover={{ scale: 1.1, color: '#2dd4bf' }}
                  className="text-lg sm:text-xl font-semibold mb-2 text-cyan-400 flex items-center justify-center"
                >
                  <FaCode className="mr-2 text-xl sm:text-2xl" />
                  Software a Medida
                </motion.h3>
                <p className="text-gray-300 text-sm sm:text-base">Aplicaciones y Software de Gestión con automatización de procesos y el uso de la información para la toma de decisiones.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <motion.h3
                  whileHover={{ scale: 1.1, color: '#2dd4bf' }}
                  className="text-lg sm:text-xl font-semibold mb-2 text-cyan-400 flex items-center justify-center"
                >
                  <FaGlobe className="mr-2 text-xl sm:text-2xl" />
                  Desarrollo Web
                </motion.h3>
                <p className="text-gray-300 text-sm sm:text-base">Diseño y desarrollo de sitios web cumpliendo los estándares que dicta la W3C y Google, para un rápido posicionamiento orgánico.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <motion.h3
                  whileHover={{ scale: 1.1, color: '#2dd4bf' }}
                  className="text-lg sm:text-xl font-semibold mb-2 text-cyan-400 flex items-center justify-center"
                >
                  <FaChartLine className="mr-2 text-xl sm:text-2xl" />
                  Marketing Digital
                </motion.h3>
                <p className="text-gray-300 text-sm sm:text-base">Diseñamos e implementamos el siguiente paso que su Web necesita, Google Adwords, Facebook Ads, Mailing, Landpages.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Portafolio */}
        <section ref={portfolioRef} className="py-12 sm:py-16 bg-gray-800 text-center">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              <FaChartLine className="mr-2 text-yellow-400 text-3xl md:text-4xl" />
              Nuestro Portafolio
            </motion.h2>
            <p className="text-gray-300 mb-8 sm:mb-12 max-w-xl mx-auto text-sm sm:text-base">Proyectos que destacan por su innovación.</p>
            <div className="relative max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {[0, 1, 2].map((offset) => {
                  const index = (currentProject + offset) % projects.length;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="bg-gray-700 p-6 rounded-xl shadow-xl border border-gray-600 hover:shadow-2xl transition-all duration-300"
                    >
                      <img src={projects[index].image} alt={projects[index].title} className="w-full h-48 object-cover rounded-lg mb-4 transform hover:scale-105 transition-transform duration-300" loading="lazy" />
                      <motion.h3
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-lg sm:text-xl font-semibold text-cyan-400 flex items-center justify-center"
                      >
                        <FaRocket className="mr-2 text-xl sm:text-2xl" />
                        {projects[index].title}
                      </motion.h3>
                      <p className="text-gray-300 text-sm sm:text-base mt-2">{projects[index].description}</p>
                    </motion.div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-6">
                <motion.button
                  whileHover={{ scale: 1.2, backgroundColor: '#2dd4bf', rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevProject}
                  className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <FaChevronLeft className="text-xl" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.2, backgroundColor: '#2dd4bf', rotate: -90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextProject}
                  className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <FaChevronRight className="text-xl" />
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* Sección SEO */}
        <section ref={seoRef} className="py-12 sm:py-16 bg-gray-900 text-center">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              <FaSearch className="mr-2 text-yellow-400 text-3xl md:text-4xl" />
              Posicionamiento Orgánico (SEO)
            </motion.h2>
            <p className="text-gray-300 mb-8 sm:mb-12 max-w-xl mx-auto text-sm sm:text-base">Optimizar el posicionamiento orgánico de su Website en los buscadores ya no es una opción, es una necesidad para todo proyecto web.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <motion.h3
                  whileHover={{ scale: 1.1, color: '#2dd4bf' }}
                  className="text-lg sm:text-xl font-semibold mb-2 text-cyan-400 flex items-center justify-center"
                >
                  <FaSearch className="mr-2 text-xl sm:text-2xl" />
                  Optimización On-Page
                </motion.h3>
                <p className="text-gray-300 text-sm sm:text-base">Mejoramos tu sitio con palabras clave.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <motion.h3
                  whileHover={{ scale: 1.1, color: '#2dd4bf' }}
                  className="text-lg sm:text-xl font-semibold mb-2 text-cyan-400 flex items-center justify-center"
                >
                  <FaGlobe className="mr-2 text-xl sm:text-2xl" />
                  Link Building
                </motion.h3>
                <p className="text-gray-300 text-sm sm:text-base">Enlaces de calidad para tu autoridad.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Tecnologías */}
        <section ref={languagesRef} className="py-12 sm:py-16 bg-gray-800 text-center">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              <FaCode className="mr-2 text-yellow-400 text-3xl md:text-4xl" />
              Tecnologías que Dominamos
            </motion.h2>
            <p className="text-gray-300 mb-8 sm:mb-12 max-w-xl mx-auto text-sm sm:text-base">Herramientas avanzadas para tus proyectos.</p>
            <div className="relative max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {[0, 1, 2].map((offset) => {
                  const index = (currentLanguage + offset) % languages.length;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="bg-gray-700 p-6 rounded-xl shadow-xl border border-gray-600 hover:shadow-2xl transition-all duration-300 flex flex-col items-center"
                    >
                      {languages[index].icon}
                      <motion.h3
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-lg sm:text-xl font-semibold text-cyan-400 flex items-center justify-center mt-4"
                      >
                        <FaCode className="mr-2 text-xl sm:text-2xl" />
                        {languages[index].name}
                      </motion.h3>
                    </motion.div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-6">
                <motion.button
                  whileHover={{ scale: 1.2, backgroundColor: '#2dd4bf', rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevLanguage}
                  className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <FaChevronLeft className="text-xl" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.2, backgroundColor: '#2dd4bf', rotate: -90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextLanguage}
                  className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <FaChevronRight className="text-xl" />
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Testimonios */}
        <section ref={testimonialsRef} className="py-12 sm:py-16 bg-gray-900 text-center">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              <FaUsers className="mr-2 text-yellow-400 text-3xl md:text-4xl" />
              Testimonios de Éxito
            </motion.h2>
            <p className="text-gray-300 mb-8 sm:mb-12 max-w-xl mx-auto text-sm sm:text-base">Voces de nuestros clientes satisfechos.</p>
            <div className="relative max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {[0, 1].map((offset) => {
                  const index = (currentTestimonial + offset) % testimonials.length;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-600 hover:shadow-2xl transition-all duration-300 flex items-center space-x-4"
                    >
                      <FaUser className="text-3xl text-cyan-400 flex-shrink-0" />
                      <div className="text-left">
                        <motion.h3
                          initial={{ opacity: 0, y: -20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="text-lg sm:text-xl font-semibold text-cyan-400 flex items-center"
                        >
                          <FaStar className="mr-2 text-xl sm:text-2xl" />
                          {testimonials[index].author}
                        </motion.h3>
                        <p className="text-sm sm:text-base text-gray-300 italic mt-2">"{testimonials[index].text}"</p>
                        <div className="flex mt-2">{renderStars(testimonials[index].rating)}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-6">
                <motion.button
                  whileHover={{ scale: 1.2, backgroundColor: '#2dd4bf', rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevTestimonial}
                  className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <FaChevronLeft className="text-xl" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.2, backgroundColor: '#2dd4bf', rotate: -90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextTestimonial}
                  className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <FaChevronRight className="text-xl" />
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Contacto */}
        <section ref={contactRef} className="py-12 sm:py-16 bg-gray-900 text-white relative">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-12 flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              <FaGlobe className="mr-2 text-yellow-400 text-3xl md:text-4xl" />
              Contáctanos
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg backdrop-blur-sm">
                <form className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Correo Electrónico</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Mensaje</label>
                    <textarea
                      name="message"
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      rows="3"
                      required
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: '#2dd4bf' }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full px-4 py-2 bg-cyan-500 text-white font-semibold rounded-full shadow-md transition-all"
                  >
                    Enviar Mensaje
                  </motion.button>
                </form>
              </div>
              <div className="flex flex-col items-center">
                <motion.h3
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl sm:text-2xl font-bold mb-4 flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                >
                  <FaRocket className="mr-2 text-yellow-400 text-3xl" />
                  ¡Un Tiburón Quiere Hablar Contigo!
                </motion.h3>
                <div className="relative w-full max-w-[300px] h-[200px] bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden">
                  <ThreeScene />
                </div>
                <p className="text-gray-300 mt-4 mb-4 text-sm text-center">Explora cómo podemos ayudarte en 3D.</p>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: '#2dd4bf' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(contactRef)}
                  className="mt-4 px-6 py-2 bg-cyan-500 text-white font-semibold rounded-full shadow-lg transition-all"
                >
                  ¡Hablemos Ahora!
                </motion.button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Pie de página */}
      <footer className="bg-gray-800 text-white py-8 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaLightbulb className="mr-2 text-yellow-400" />
              CREAVISION
            </h3>
            <p className="text-gray-300 text-sm">Soluciones digitales innovadoras.</p>
            <p className="text-gray-300 text-sm mt-2">© 2025 CREAVISION. Todos los derechos reservados.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Inicio</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Servicios</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Portafolio</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contáctanos</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-cyan-400" />
                <a href="mailto:info@creavision.com" className="hover:text-cyan-400 transition-colors">info@creavision.com</a>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 text-cyan-400" />
                <a href="tel:+51936578570" className="hover:text-cyan-400 transition-colors">+51 936 578 570</a>
              </li>
              <li className="flex items-center">
                <FaGlobe className="mr-2 text-cyan-400" />
                <a href="https://creavision.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">www.creavision.com</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Botón de WhatsApp */}
      <motion.div className="fixed bottom-6 right-6 z-50 group" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: 1, duration: 0.5 } }}>
        <motion.a
          href="https://wa.me/51936578570"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, rotate: 360, backgroundColor: '#25D366' }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg"
        >
          <FaWhatsapp className="text-2xl animate-bounce" />
        </motion.a>
        <motion.div
          className="absolute bottom-14 right-0 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          ¡Chatea con Nosotros!
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;








