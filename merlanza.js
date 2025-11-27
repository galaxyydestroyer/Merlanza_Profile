// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typing Effect for Hero Name
const names = ['Merlanza Rizki Tumangger', 'IPB University', 'J0404241062', 'Teknologi Rekayasa Komputer'];
let nameIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedName = document.getElementById('typedName');

function typeEffect() {
    const currentName = names[nameIndex];
    
    if (isDeleting) {
        typedName.textContent = currentName.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedName.textContent = currentName.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentName.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        nameIndex = (nameIndex + 1) % names.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

typeEffect();

// Hero Buttons - REMOVED (no longer needed)

// Animated Counter for Stats
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Intersection Observer for Stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            animateCounter(statNumber);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver.observe(item);
});

// Skills Data - Updated with specific percentages
const skills = [
    // Programming Skills
    { name: 'HTML5', icon: '🌐', level: 80 },
    { name: 'CSS3', icon: '🎨', level: 70 },
    { name: 'JavaScript', icon: '☕', level: 40 },
    { name: 'Bootstrap', icon: '🅱️', level: 50 },
    { name: 'jQuery', icon: '📜', level: 40 },
    { name: 'PHP', icon: '🐘', level: 50 },
    { name: 'MySQL', icon: '🗄️', level: 40 },
    { name: 'Git', icon: '📦', level: 60 },
    // Hardware & System Skills
    { name: 'Arduino/IoT', icon: '🤖', level: 80 },
    { name: 'Linux', icon: '🐧', level: 70 },
    { name: 'Elektro', icon: '⚡', level: 90 },
    { name: 'Jaringan', icon: '🌐', level: 65 }
];

// Generate Skills Cards - Without percentage text
const skillsGrid = document.getElementById('skillsGrid');

skills.forEach((skill, index) => {
    const skillCard = document.createElement('div');
    skillCard.className = 'skill-card';
    skillCard.style.animationDelay = `${index * 0.1}s`;
    
    skillCard.innerHTML = `
        <div class="skill-icon">${skill.icon}</div>
        <div class="skill-name">${skill.name}</div>
        <div class="skill-level">
            <div class="skill-progress" data-level="${skill.level}"></div>
        </div>
    `;
    
    skillsGrid.appendChild(skillCard);
});

// Animate skill progress bars
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const level = bar.getAttribute('data-level');
                setTimeout(() => {
                    bar.style.width = `${level}%`;
                }, 100);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillsObserver.observe(skillsGrid);

// Projects Data
const projects = [
    {
        title: 'Portofolio',
        description: 'Pengerjaan dan pengembangan situs web dengan fokus pada fungsionalitas dan tampilan modern.',
        icon: '📂',
        tags: ['HTML', 'CSS', 'javasScript']
    },
    {
        title: 'Konfigurasi server Linux',
        description: 'Proyek pengaturan dan optimasi server berbasis Linux untuk layanan jaringan.',
        icon: '🐧',
        tags: ['Linux', 'Jaringan']
    },
    {
        title: 'Clapia',
        description: 'Lampu inovatif yang menyala atau mati dengan sensor suara dari tepukan tangan.',
        icon: '💡',
        tags: ['Elektro', 'Arduino/IoT']
    },
    {
        title: 'Sensor suhu ruang',
        description: 'Sistem monitoring suhu ruangan secara real-time untuk kenyamanan dan efisiensi.',
        icon: '🌡️',
        tags: ['Elektro', 'Arduino/IoT']
    },
    {
        title: 'Power bank panel surya',
        description: 'Perangkat penyimpan energi dengan panel surya untuk pengisian ramah lingkungan.',
        icon: '🌞',
        tags: ['Elektro']
    },
    {
        title: 'quakewatch',
        description: 'Program berbasis terminal untuk monitoring informasi gempa, menampilkan data terkini secara sederhana.',
        icon: '💻',
        tags: ['Python']
    },

];

// Generate Project Cards
const projectsGrid = document.getElementById('projectsGrid');

projects.forEach((project, index) => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.style.animationDelay = `${index * 0.1}s`;
    
    projectCard.innerHTML = `
        <div class="project-image">${project.icon}</div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    projectsGrid.appendChild(projectCard);
});

// Add click animation to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Contact Form with Email Functionality
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Email tujuan - Ganti dengan email Anda yang sebenarnya
    const recipientEmail = 'your-email@example.com'; // GANTI DENGAN EMAIL ANDA
    
    // Format email subject dan body
    const subject = `Pesan dari Portfolio: ${name}`;
    const body = `Nama: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0APesan:%0D%0A${encodeURIComponent(message)}`;
    
    // Buka email client dengan data yang sudah diisi
    window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        padding: 2rem 3rem;
        border-radius: 15px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        text-align: center;
        animation: slideIn 0.3s ease;
    `;
    
    successMessage.innerHTML = `
        <h3 style="margin-bottom: 0.5rem; font-size: 1.5rem;">✨ Email Client Dibuka!</h3>
        <p style="margin: 0;">Silakan kirim email dari aplikasi email Anda, ${name}!</p>
    `;
    
    document.body.appendChild(successMessage);
    
    // Reset form
    contactForm.reset();
    
    // Remove message after 4 seconds
    setTimeout(() => {
        successMessage.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 300);
    }, 4000);
    
    console.log('Form submitted:', { name, email, message });
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translate(-50%, -60%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -40%);
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to floating cards
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.2);
        card.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
    });
});

console.log('🚀 Portfolio website loaded successfully!');