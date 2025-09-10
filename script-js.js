// Menu mobile
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// Sistema de login simulado
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simular salvamento no localStorage
    const userData = {
        email: email,
        loginTime: new Date().toISOString(),
        status: 'loggedIn'
    };
    
    // Salvar no localStorage
    localStorage.setItem('userLogin', JSON.stringify(userData));
    
    // Mostrar mensagem de sucesso
    const successMsg = document.getElementById('loginSuccess');
    if (successMsg) {
        successMsg.style.display = 'block';
        
        // Limpar formulário
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        
        // Esconder mensagem após 3 segundos
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3000);
    }
}

// Sistema de contato
function handleContact(event) {
    event.preventDefault();
    
    // Simular envio da mensagem
    const successMsg = document.getElementById('contactSuccess');
    if (successMsg) {
        successMsg.style.display = 'block';
        
        // Limpar formulário
        event.target.reset();
        
        // Esconder mensagem após 3 segundos
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3000);
    }
}

// Sistema de reserva
function handleReservation(event) {
    event.preventDefault();
    
    const packageName = document.querySelector('.package-title').textContent;
    const userData = {
        package: packageName,
        reservationTime: new Date().toISOString(),
        status: 'pending'
    };
    
    // Salvar reserva no localStorage
    let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    reservations.push(userData);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    
    // Mostrar mensagem de sucesso
    const successMsg = document.getElementById('reservationSuccess');
    if (successMsg) {
        successMsg.style.display = 'block';
        
        // Limpar formulário
        event.target.reset();
        
        // Esconder mensagem após 5 segundos
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
    }
}

// Verificar se o usuário já está logado ao carregar a página
window.addEventListener('load', function() {
    const userData = localStorage.getItem('userLogin');
    if (userData) {
        const user = JSON.parse(userData);
        console.log('Usuário logado:', user.email);
        
        // Personalizar experiência para usuário logado
        const loginLinks = document.querySelectorAll('a[href="login.html"]');
        loginLinks.forEach(link => {
            link.textContent = 'Minha Conta';
            link.style.background = 'rgba(255,255,255,0.2)';
        });
    }
});

// Animações suaves ao rolar a página
window.addEventListener('scroll', function() {
    const features = document.querySelectorAll('.feature, .activity-card');
    features.forEach(feature => {
        const rect = feature.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }
    });
});

// Inicializar animações
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature, .activity-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });

    // Destacar link ativo no menu
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Fechar menu mobile ao clicar em um link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('navLinks').classList.remove('active');
        });
    });
});

// Smooth scroll para links internos
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Funcionalidades de autenticação
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        button.textContent = '🙈';
    } else {
        input.type = 'password';
        button.textContent = '👁️';
    }
}

function checkPasswordStrength(password) {
    const strengthElement = document.getElementById('passwordStrength');
    if (!strengthElement) return;
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    strengthElement.className = 'password-strength';
    if (strength >= 2) strengthElement.classList.add('weak');
    if (strength >= 3) strengthElement.classList.add('medium');
    if (strength >= 4) strengthElement.classList.add('strong');
}

function showRegister() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'block';
    document.getElementById('forgotSection').style.display = 'none';
}

function showLogin() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('forgotSection').style.display = 'none';
}

function showForgotPassword() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('forgotSection').style.display = 'block';
}

function handleRegister(event) {
    event.preventDefault();
    
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        document.getElementById('registerError').textContent = 'As senhas não coincidem';
        document.getElementById('registerError').style.display = 'block';
        return;
    }
    
    const userData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('registerEmail').value,
        phone: document.getElementById('phone').value,
        birthDate: document.getElementById('birthDate').value,
        interests: document.getElementById('interests').value,
        newsletter: document.getElementById('newsletter').checked,
        registrationTime: new Date().toISOString(),
        status: 'registered'
    };
    
    localStorage.setItem('userLogin', JSON.stringify(userData));
    
    document.getElementById('registerSuccess').style.display = 'block';
    document.getElementById('registerError').style.display = 'none';
    
    setTimeout(() => {
        showUserArea(userData);
    }, 2000);
}

function handleForgotPassword(event) {
    event.preventDefault();
    
    document.getElementById('forgotSuccess').style.display = 'block';
    
    setTimeout(() => {
        showLogin();
    }, 3000);
}

function loginWithGoogle() {
    // Simular login com Google
    const userData = {
        firstName: 'Usuário',
        lastName: 'Google',
        email: 'usuario@gmail.com',
        loginTime: new Date().toISOString(),
        status: 'loggedIn',
        provider: 'google'
    };
    
    localStorage.setItem('userLogin', JSON.stringify(userData));
    showUserArea(userData);
}

function loginWithFacebook() {
    // Simular login com Facebook
    const userData = {
        firstName: 'Usuário',
        lastName: 'Facebook',
        email: 'usuario@facebook.com',
        loginTime: new Date().toISOString(),
        status: 'loggedIn',
        provider: 'facebook'
    };
    
    localStorage.setItem('userLogin', JSON.stringify(userData));
    showUserArea(userData);
}

function showUserArea(userData) {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('forgotSection').style.display = 'none';
    document.getElementById('userArea').style.display = 'block';
    
    document.getElementById('userName').textContent = `Olá, ${userData.firstName}!`;
    document.getElementById('userEmail').textContent = userData.email;
    
    loadUserReservations();
}

function handleLogout() {
    localStorage.removeItem('userLogin');
    document.getElementById('userArea').style.display = 'none';
    showLogin();
    
    // Resetar estado do menu
    const loginLinks = document.querySelectorAll('a[href="login.html"]');
    loginLinks.forEach(link => {
        link.textContent = 'Login';
        link.style.background = '';
    });
}

function loadUserReservations() {
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    const reservationsContainer = document.getElementById('userReservations');
    
    if (reservations.length === 0) {
        reservationsContainer.innerHTML = `
            <div class="no-reservations">
                <p>Você ainda não tem reservas.</p>
                <a href="pacotes.html" class="btn btn-primary">Explorar Retiros</a>
            </div>
        `;
    } else {
        let reservationsHTML = '';
        reservations.forEach((reservation, index) => {
            reservationsHTML += `
                <div class="reservation-item">
                    <h4>${reservation.package}</h4>
                    <p>Status: ${reservation.status}</p>
                    <p>Data: ${new Date(reservation.reservationTime).toLocaleDateString()}</p>
                </div>
            `;
        });
        reservationsContainer.innerHTML = reservationsHTML;
    }
}

// Verificar login ao carregar página de login
window.addEventListener('load', function() {
    if (window.location.pathname.includes('login.html')) {
        const userData = localStorage.getItem('userLogin');
        if (userData) {
            const user = JSON.parse(userData);
            showUserArea(user);
        }
    }
    
    // Listener para força da senha
    const passwordInput = document.getElementById('registerPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }
});