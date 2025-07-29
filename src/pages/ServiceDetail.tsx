// pages/ServiceDetail.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SecondaryHeader from '../components/layouts/HeaderSec';
import SecondaryFooter from '../components/layouts/FooterSec';
import { Service } from '../types/service';
import LoadingLine from '../components/common/LoadingLine';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data based on serviceId
    const fetchServiceData = () => {
      setLoading(true);
      // In a real app, you would fetch this data from an API
      const servicesData: Service[] = [
        {
          id: 'web-development',
          title: 'Custom Web Development Solutions',
          tagline: 'Building high-performance websites tailored to your business needs with modern technologies and best practices.',
          description: 'I specialize in creating custom websites that not only look stunning but also deliver exceptional performance and user experiences. Every project begins with understanding your unique business requirements and target audience.',
          overview: [
            'From simple brochure sites to complex web applications, I leverage modern technologies to build solutions that grow with your business.',
            'Focus on clean code, scalability, and performance optimization to ensure your digital presence stands out.'
          ],
          features: [
            {
              title: 'Blazing Fast Performance',
              description: 'Optimized code and modern architectures ensure your website loads quickly and runs smoothly, improving user experience and SEO rankings.',
              icon: 'bolt'
            },
            {
              title: 'Fully Responsive',
              description: 'Your website will look and function perfectly on all devices, from desktop monitors to mobile phones.',
              icon: 'mobile-alt'
            },
            {
              title: 'Secure by Design',
              description: 'Built with security best practices to protect your data and your users\' information from potential threats.',
              icon: 'shield-alt'
            },
            {
              title: 'SEO Optimized',
              description: 'Clean code and proper structure help search engines understand and rank your content effectively.',
              icon: 'search'
            },
            {
              title: 'Easy Maintenance',
              description: 'Well-documented code and modern architectures make future updates and maintenance straightforward.',
              icon: 'sync-alt'
            },
            {
              title: 'Ongoing Support',
              description: 'Continued support after launch to ensure your website remains up-to-date and functioning optimally.',
              icon: 'headset'
            }
          ],
          process: [
            {
              step: 1,
              title: 'Discovery & Planning',
              description: 'We start by understanding your business goals, target audience, and project requirements to create a detailed project plan.'
            },
            {
              step: 2,
              title: 'Design & Prototyping',
              description: 'Creating wireframes and prototypes to visualize the user experience and gather feedback before development begins.'
            },
            {
              step: 3,
              title: 'Development',
              description: 'Building the website with clean, maintainable code while implementing all planned features and functionality.'
            },
            {
              step: 4,
              title: 'Testing & Quality Assurance',
              description: 'Rigorous testing across devices and browsers to ensure everything works perfectly before launch.'
            },
            {
              step: 5,
              title: 'Deployment & Support',
              description: 'Launching your website and providing ongoing support to ensure continued success.'
            }
          ],
          technologies: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'TypeScript', 'MongoDB'],
          imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'ui-ux-design',
          title: 'Human-Centered UI/UX Design',
          tagline: 'Creating intuitive and beautiful interfaces that enhance user engagement and satisfaction.',
          description: 'I focus on designing interfaces that are not only visually appealing but also highly functional and user-friendly.',
          overview: [
            'From user research to final designs, I ensure every element serves a purpose and enhances the user experience.',
            'Iterative design process with continuous testing and refinement.'
          ],
          features: [
            {
              title: 'User Research',
              description: 'In-depth understanding of your users through interviews, surveys, and analytics.',
              icon: 'user-friends'
            },
            {
              title: 'Wireframing',
              description: 'Creating structural blueprints of your interface to establish layout and functionality.',
              icon: 'project-diagram'
            },
            {
              title: 'Prototyping',
              description: 'Interactive models that allow for testing and validation of design concepts.',
              icon: 'cube'
            },
            {
              title: 'Visual Design',
              description: 'Beautiful, on-brand interfaces that create emotional connections with users.',
              icon: 'palette'
            },
            {
              title: 'Usability Testing',
              description: 'Real user testing to identify pain points and areas for improvement.',
              icon: 'tasks'
            },
            {
              title: 'Design Systems',
              description: 'Comprehensive style guides and component libraries for consistent design.',
              icon: 'layer-group'
            }
          ],
          process: [
            {
              step: 1,
              title: 'Research & Analysis',
              description: 'Understanding user needs, business goals, and market trends.'
            },
            {
              step: 2,
              title: 'Information Architecture',
              description: 'Structuring content and functionality in a logical, intuitive way.'
            },
            {
              step: 3,
              title: 'Wireframing',
              description: 'Creating low-fidelity layouts to establish structure and flow.'
            },
            {
              step: 4,
              title: 'Visual Design',
              description: 'Applying brand identity and visual polish to the interface.'
            },
            {
              step: 5,
              title: 'Prototyping & Testing',
              description: 'Validating designs with interactive prototypes and user feedback.'
            }
          ],
          technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Photoshop', 'Illustrator'],
          imageUrl: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'responsive-design',
          title: 'Responsive Web Design',
          tagline: 'Fluid layouts that adapt perfectly to any device, ensuring optimal viewing experience across all platforms.',
          description: 'In today\'s multi-device world, having a website that works flawlessly across all screen sizes is essential.',
          overview: [
            'I create websites that automatically adjust to provide the best possible experience on any device.',
            'Mobile-first approach ensures your content is accessible to everyone.'
          ],
          features: [
            {
              title: 'Mobile-First Approach',
              description: 'Designing for mobile devices first, then scaling up for larger screens.',
              icon: 'mobile'
            },
            {
              title: 'Fluid Grids',
              description: 'Layouts that smoothly adapt to different screen dimensions.',
              icon: 'th'
            },
            {
              title: 'Flexible Images',
              description: 'Images that scale appropriately without losing quality.',
              icon: 'image'
            },
            {
              title: 'Touch Optimization',
              description: 'Interface elements designed for touch interaction on mobile devices.',
              icon: 'hand-pointer'
            },
            {
              title: 'Performance Focused',
              description: 'Optimized assets and code for fast loading on mobile networks.',
              icon: 'tachometer-alt'
            },
            {
              title: 'Cross-Browser Compatible',
              description: 'Consistent experience across all modern web browsers.',
              icon: 'globe'
            }
          ],
          process: [
            {
              step: 1,
              title: 'Content Strategy',
              description: 'Prioritizing content for different device contexts.'
            },
            {
              step: 2,
              title: 'Breakpoint Planning',
              description: 'Identifying key screen sizes where layout should adapt.'
            },
            {
              step: 3,
              title: 'Flexible Layout Design',
              description: 'Creating designs that can fluidly adjust between breakpoints.'
            },
            {
              step: 4,
              title: 'Implementation',
              description: 'Coding with responsive techniques and best practices.'
            },
            {
              step: 5,
              title: 'Testing & Refinement',
              description: 'Ensuring perfect display across all target devices.'
            }
          ],
          technologies: ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'Media Queries', 'Tailwind CSS'],
          imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'e-commerce',
          title: 'E-Commerce Solutions',
          tagline: 'High-converting online stores with seamless checkout flows and integrated payment solutions.',
          description: 'I build e-commerce platforms that not only look great but also convert visitors into customers.',
          overview: [
            'From product showcases to secure checkout processes, I create complete online shopping experiences.',
            'Integration with payment gateways, inventory systems, and marketing tools.'
          ],
          features: [
            {
              title: 'Product Management',
              description: 'Easy-to-use systems for managing your product catalog.',
              icon: 'box-open'
            },
            {
              title: 'Secure Checkout',
              description: 'PCI-compliant payment processing with multiple payment options.',
              icon: 'credit-card'
            },
            {
              title: 'Inventory Tracking',
              description: 'Real-time inventory management to prevent overselling.',
              icon: 'warehouse'
            },
            {
              title: 'Mobile Shopping',
              description: 'Optimized shopping experience for mobile users.',
              icon: 'shopping-cart'
            },
            {
              title: 'Marketing Tools',
              description: 'Built-in SEO, discounts, and email integration.',
              icon: 'bullhorn'
            },
            {
              title: 'Analytics',
              description: 'Detailed reports on sales, traffic, and customer behavior.',
              icon: 'chart-line'
            }
          ],
          process: [
            {
              step: 1,
              title: 'Requirements Analysis',
              description: 'Understanding your product range and business model.'
            },
            {
              step: 2,
              title: 'Platform Selection',
              description: 'Choosing the right e-commerce platform for your needs.'
            },
            {
              step: 3,
              title: 'Design & Development',
              description: 'Creating the storefront and back-end systems.'
            },
            {
              step: 4,
              title: 'Payment Integration',
              description: 'Setting up secure payment processing.'
            },
            {
              step: 5,
              title: 'Launch & Optimization',
              description: 'Going live and continuously improving performance.'
            }
          ],
          technologies: ['Shopify', 'WooCommerce', 'Magento', 'Stripe', 'PayPal', 'React'],
          imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        }
      ];

      const foundService = servicesData.find(s => s.id === serviceId) || servicesData[0];
      setService(foundService);
      setLoading(false);
    };

    fetchServiceData();
  }, [serviceId]);

  useEffect(() => {
    // Animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.feature-card, .process-step');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.classList.add('animate-fadeInUp');
        }
      });
    };

    // Set initial state for animation
    document.querySelectorAll('.feature-card, .process-step').forEach(el => {
      el.classList.add('opacity-0', 'translate-y-5');
      el.classList.add('transition-all', 'duration-500', 'ease-out');
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger once on load

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, [service]); // Re-run when service data changes

  if (loading || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <SecondaryHeader />
      <LoadingLine />
      {/* Service Header */}
      <section className="service-header py-20 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
              {serviceId?.toUpperCase().replace('-', ' ')}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">{service.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{service.tagline}</p>
            <a 
              href="#contact" 
              className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Tailored Digital Experiences</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
              {service.overview.map((paragraph, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-300 mb-4">{paragraph}</p>
              ))}
              <div className="flex flex-wrap gap-4 mt-6">
                {service.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={service.imageUrl} 
                alt={service.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Why Choose My {serviceId?.replace('-', ' ')} Service</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Quality, performance, and attention to detail are at the core of every project I deliver.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <div 
                key={index}
                className="feature-card bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-6">
                  <i className={`fas fa-${feature.icon} text-2xl text-purple-600 dark:text-purple-400`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">My {serviceId?.replace('-', ' ')} Process</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              A structured approach to ensure quality and meet your expectations at every stage.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {service.process.map((step, index) => (
              <div 
                key={index}
                className={`process-step relative pl-16 ${index < service.process.length - 1 ? 'pb-12' : ''}`}
              >
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                {index < service.process.length - 1 && (
                  <div className="absolute left-6 top-12 h-full w-0.5 bg-gray-200 dark:bg-gray-600"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Let's discuss how I can help bring your vision to life with a custom solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/hireme" 
              className="px-8 py-3 bg-white text-purple-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Get in Touch
            </a>
            <a 
              href="/projects" 
              className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
            >
              View My Work
            </a>
          </div>
        </div>
      </section>

      <SecondaryFooter />
    </div>
  );
};

export default ServiceDetail;