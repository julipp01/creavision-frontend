import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ThreeScene from './ThreeScene.jsx';
import ThreeSceneAR from './ThreeSceneAR.jsx';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { FaLightbulb, FaRocket, FaChartLine, FaStar, FaUsers, FaCode, FaGlobe, FaVrCardboard, FaWhatsapp, FaComment, FaUser, FaBars, FaEye } from 'react-icons/fa';

function Home() {
  const heroRef = useRef(null);
  const portfolioRef = useRef(null);
  const servicesRef = useRef(null);
  const experienceRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('¡Mensaje enviado con éxito!');
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

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
    <div className="bg-gray-900 text-white font-sans overflow-hidden relative">
      <div className="cursor fixed w-6 h-6 bg-cyan-400 rounded-full pointer-events-none z-50 transition-transform duration-200 transform -translate-x-1/2 -translate-y-1/2 scale-100 hover:scale-150"></div>

      <Particles
        options={{
          background: { color: "#1a202c" },
          particles: {
            number: { value: 80 },
            size: { value: 2 },
            move: { enable: true, speed: 0.8 },
          },
        }}
        init={loadFull}
      />

      <header className="fixed top-0 w-full bg-gray-800 bg-opacity-90 z-40 py-2 shadow-lg">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 360, color: '#2dd4bf' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center text-2xl font-bold text-cyan-400 transition-all duration-500"
          >
            <FaLightbulb className="mr-1 text-4xl text-yellow-400" />
            <FaRocket className="ml-1 text-cyan-400" />
            CREAVISION
          </motion.div>
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1, color: '#2dd4bf' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white font-semibold"
            >
              <FaBars className="text-2xl" />
            </motion.button>
          </div>
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:flex md:space-x-6 absolute md:static top-12 right-6 md:top-0 bg-gray-800 md:bg-transparent p-4 md:p-0 rounded-md md:flex-row flex-col w-48 md:w-auto z-50`}>
            <motion.button onClick={() => { scrollToSection(heroRef); setIsMenuOpen(false); }} whileHover={{ scale: 1.1, color: '#2dd4bf' }} whileTap={{ scale: 0.95 }} className="text-white font-semibold block md:inline-block py-2">Inicio</motion.button>
            <motion.button onClick={() => { scrollToSection(portfolioRef); setIsMenuOpen(false); }} whileHover={{ scale: 1.1, color: '#2dd4bf' }} whileTap={{ scale: 0.95 }} className="text-white font-semibold block md:inline-block py-2">Portafolio</motion.button>
            <motion.button onClick={() => { scrollToSection(servicesRef); setIsMenuOpen(false); }} whileHover={{ scale: 1.1, color: '#2dd4bf' }} whileTap={{ scale: 0.95 }} className="text-white font-semibold block md:inline-block py-2">Servicios</motion.button>
            <motion.button onClick={() => { scrollToSection(experienceRef); setIsMenuOpen(false); }} whileHover={{ scale: 1.1, color: '#2dd4bf' }} whileTap={{ scale: 0.95 }} className="text-white font-semibold block md:inline-block py-2">Experiencia</motion.button>
            <motion.button onClick={() => { scrollToSection(testimonialsRef); setIsMenuOpen(false); }} whileHover={{ scale: 1.1, color: '#2dd4bf' }} whileTap={{ scale: 0.95 }} className="text-white font-semibold block md:inline-block py-2">Testimonios</motion.button>
            <motion.button onClick={() => { scrollToSection(contactRef); setIsMenuOpen(false); }} whileHover={{ scale: 1.1, color: '#2dd4bf' }} whileTap={{ scale: 0.95 }} className="text-white font-semibold block md:inline-block py-2">Contacto</motion.button>
          </nav>
        </div>
      </header>

      <section ref={heroRef} className="relative flex items-center justify-center h-[70vh] min-h-[500px] bg-gradient-to-b from-gray-800 to-gray-900 text-white mt-0 pt-12 overflow-hidden">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <iframe
            className="w-full h-full opacity-20 object-cover"
            src="https://www.youtube.com/embed/nuTtfFAmNcE?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&playlist=nuTtfFAmNcE"
            title="Background Video"
            frameBorder="0"
            allowFullScreen
            style={{ objectFit: 'cover', maxHeight: '100%' }}
          ></iframe>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl px-6 text-center">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 360, color: '#2dd4bf' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center text-4xl font-bold text-cyan-400 mb-4"
          >
            <FaLightbulb className="mr-2 text-5xl text-yellow-400" />
            <FaRocket className="ml-2 text-cyan-400" />
            CREAVISION
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, color: '#2dd4bf' }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-6xl md:text-8xl font-extrabold mb-0 drop-shadow-xl"
          >
            +39% Más de Ingresos
          </motion.h1>
          <p className="text-lg sm:text-xl">Con soluciones innovadoras a tu medida</p>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: '#2dd4bf' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection(contactRef)}
            className="px-8 sm:px-12 py-3 sm:py-5 bg-cyan-500 text-white text-lg sm:text-xl font-semibold rounded-full shadow-2xl transition-all"
          >
            Agenda una Consulta
          </motion.button>
        </div>
      </section>

      <section ref={portfolioRef} className="py-20 bg-gray-800 text-center">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <motion.h2
            whileHover={{ scale: 1.1, background: 'linear-gradient(90deg, #2dd4bf, #3b82f6)', WebkitBackgroundClip: 'text', color: 'transparent' }}
            whileTap={{ scale: 0.95 }}
            className="text-4xl sm:text-5xl font-extrabold mb-12 p-2 rounded-lg flex items-center justify-center"
          >
            <FaChartLine className="mr-2 text-yellow-400" />
            Explora nuestros proyectos destacados
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl items-start">
            <div className="flex flex-col items-center">
              <motion.h3
                whileHover={{ scale: 1.05, color: '#2dd4bf' }}
                whileTap={{ scale: 0.95 }}
                className="relative text-lg sm:text-xl text-gray-300 mb-8 flex items-center justify-center"
              >
                <FaEye className="mr-2 text-cyan-400" /> Descubre el impacto de nuestro trabajo
                <motion.span
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: '50%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
                {[1, 2, 3, 4].map((num) => (
                  <motion.div key={num} whileHover={{ scale: 1.05 }} className="relative group overflow-hidden rounded-lg shadow-lg bg-gray-700">
                    <img src={`https://source.unsplash.com/random/300x200?project=${num}`} alt={`Proyecto ${num}`} className="w-full h-48 object-cover transition-transform duration-300 transform group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                      <p className="text-white text-lg font-semibold">Proyecto {num}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: '#2dd4bf' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert('Ver más proyectos (funcionalidad a implementar)')}
                className="mt-6 px-6 py-3 bg-cyan-400 text-white font-semibold rounded-full shadow-md transition-all"
              >
                Ver Más Proyectos
              </motion.button>
            </div>
            <div className="flex flex-col items-center">
              <motion.h3
                whileHover={{ scale: 1.05, color: '#2dd4bf' }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl sm:text-3xl font-bold mb-6 flex items-center justify-center"
              >
                <FaVrCardboard className="mr-2 text-yellow-400" />
                Explora en 3D/VR
              </motion.h3>
              <div className="w-full max-w-md h-80 relative">
                <ThreeScene />
              </div>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: '#2dd4bf' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(contactRef)}
                className="mt-6 px-8 py-3 bg-cyan-500 text-white font-semibold rounded-full shadow-2xl transition-all"
              >
                Agenda tu Consulta
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-center">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <motion.h2
            whileHover={{ scale: 1.05, color: '#2dd4bf' }}
            whileTap={{ scale: 0.95 }}
            className="text-4xl sm:text-5xl font-extrabold mb-12 flex items-center justify-center"
          >
            <FaVrCardboard className="mr-2 text-yellow-400" />
            Modelo 3D con AR
          </motion.h2>
          <div className="w-full max-w-lg h-96 relative">
            <ThreeSceneAR />
          </div>
        </div>
      </section>

      <section ref={servicesRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <motion.h2
            whileHover={{ scale: 1.05, color: '#2dd4bf' }}
            whileTap={{ scale: 0.95 }}
            className="text-4xl sm:text-5xl font-extrabold mb-12 flex items-center justify-center"
          >
            <FaCode className="mr-2 text-yellow-400" />
            ¿Qué Hacemos?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 w-full max-w-4xl">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Estrategia Digital</h3>
              <p className="text-gray-400 text-sm sm:text-base">Diseños personalizados para tu éxito.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Expansión Global</h3>
              <p className="text-gray-400 text-sm sm:text-base">Lleva tu marca al mundo.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Desarrollo Tech</h3>
              <p className="text-gray-400 text-sm sm:text-base">Soluciones innovadoras al instante.</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={experienceRef} className="py-20 bg-gray-800">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <motion.h2
            whileHover={{ scale: 1.05, color: '#2dd4bf' }}
            whileTap={{ scale: 0.95 }}
            className="text-4xl sm:text-5xl font-extrabold mb-12 flex items-center justify-center"
          >
            <FaUsers className="mr-2 text-yellow-400" />
            Experiencia del Cliente
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 w-full max-w-4xl">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Marketing Dinámico</h3>
              <p className="text-gray-400 text-sm sm:text-base">Estrategias de crecimiento efectivo.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Análisis de Datos</h3>
              <p className="text-gray-400 text-sm sm:text-base">Insights para decisiones inteligentes.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Plataforma Personal</h3>
              <p className="text-gray-400 text-sm sm:text-base">Herramientas únicas para tus clientes.</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={testimonialsRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <motion.h2
            whileHover={{ scale: 1.05, color: '#2dd4bf' }}
            whileTap={{ scale: 0.95 }}
            className="text-4xl sm:text-5xl font-extrabold mb-12 flex items-center justify-center"
          >
            <FaGlobe className="mr-2 text-yellow-400" />
            Nuestro Impacto
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 w-full max-w-4xl">
            <div className="flex items-center space-x-4">
              <FaUser className="text-4xl text-cyan-400" />
              <div>
                <p className="text-lg text-gray-300 italic">"CREAVISION transformó nuestra visión con talento excepcional."</p>
                <p className="mt-2 text-gray-100 font-semibold">Ana Gómez, CEO de TechVision</p>
                <div className="flex mt-2">{renderStars(4.5)}</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaUser className="text-4xl text-cyan-400" />
              <div>
                <p className="text-lg text-gray-300 italic">"El equipo de CREAVISION superó nuestras expectativas con soluciones innovadoras."</p>
                <p className="mt-2 text-gray-100 font-semibold">Carlos Ruiz, Director de Innovación, GlobalTech</p>
                <div className="flex mt-2">{renderStars(4.7)}</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaUser className="text-4xl text-cyan-400" />
              <div>
                <p className="text-lg text-gray-300 italic">"Gracias a CREAVISION, nuestro negocio creció un 50% en meses."</p>
                <p className="mt-2 text-gray-100 font-semibold">María López, Fundadora de EcoSolutions</p>
                <div className="flex mt-2">{renderStars(4.8)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer ref={contactRef} className="py-20 bg-gradient-to-b from-gray-700 to-gray-900 text-white">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <motion.h2
            whileHover={{ scale: 1.05, color: '#2dd4bf' }}
            whileTap={{ scale: 0.95 }}
            className="text-3xl sm:text-4xl font-extrabold mb-8 flex items-center justify-center"
          >
            Contáctanos
          </motion.h2>
          <p className="text-center text-gray-300 mb-10 text-sm sm:text-base">Estamos aquí para ayudarte a llevar tu visión al siguiente nivel. ¡Déjanos tu mensaje!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mensaje</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    rows="4"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#2dd4bf' }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-md transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </motion.button>
                {submitMessage && <p className="text-center text-green-400 mt-4">{submitMessage}</p>}
              </form>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-semibold">Recursos</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-300">
                  <a href="#" className="hover:text-cyan-400 transition-colors">Blog</a>
                  <a href="#" className="hover:text-cyan-400 transition-colors">Carreras</a>
                  <a href="#" className="hover:text-cyan-400 transition-colors">Webinars</a>
                  <a href="#" className="hover:text-cyan-400 transition-colors">eBooks</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="py-4 bg-gray-800 text-center text-gray-400">
        <p>© 2025 CREAVISION. Todos los derechos reservados. | <a href="#" className="text-cyan-400 hover:underline">Política de Privacidad</a></p>
      </footer>

      <motion.div className="fixed bottom-8 right-8 z-50 group" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: 1, duration: 0.5 } }}>
        <motion.a
          href="https://wa.me/51936578570"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, rotate: 360, backgroundColor: '#25D366', transition: { duration: 0.5 } }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg"
        >
          <FaWhatsapp className="text-3xl animate-bounce" />
        </motion.a>
        <motion.div
          className="absolute bottom-16 right-0 bg-gray-800 text-white text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          ¡Contáctanos!
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;








