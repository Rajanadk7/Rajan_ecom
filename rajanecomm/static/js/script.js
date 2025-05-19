// Global Variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    const path = window.location.pathname;

    console.log("Current path:", path); // Optional debug line

    if (path === '/' || path === '/home/') {
        initHomePage();
    } else if (path === '/product/' || path === '/product/') {
        initProductsPage();
    } else if (path === '/about/' || path === '/about/') {
        initAboutPage();
    } else if (path === '/contact/') {
        initContactPage();
    }

    // Common scripts for all pages
    initMobileMenu();
    initCartIcon();
    initNewsletterForm();
});


// Initialize Home Page
function initHomePage() {
    // Load featured products
    loadProducts().then(() => {
        displayFeaturedProducts();
    });
    
    // Add hero section scroll effect
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        const scrollPosition = window.scrollY;
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
}

// Initialize Products Page
function initProductsPage() {
    loadProducts().then(() => {
        displayAllProducts();
        setupFiltering();
        setupSorting();
    });
    
    // Initialize product modal
    initProductModal();
}

// Initialize Contact Page
function initContactPage() {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            console.log('Contact form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle answer visibility
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
            
            // Rotate icon
            icon.style.transform = icon.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
            
            // Close other open answers
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.nextElementSibling.style.display = 'none';
                    q.querySelector('i').style.transform = 'rotate(0deg)';
                }
            });
        });
    });
}

// Initialize Mobile Menu
function initMobileMenu() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header .container').appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        const nav = document.querySelector('nav');
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });
    
    // Adjust for window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            document.querySelector('nav').style.display = '';
        }
    });
}

// Initialize Cart Icon
function initCartIcon() {
    const cartIcon = document.querySelector('.fa-shopping-cart').parentElement;
    updateCartCount();
    
    // Show cart preview on hover
    cartIcon.addEventListener('mouseenter', showCartPreview);
    cartIcon.addEventListener('mouseleave', hideCartPreview);
    
    // Click to go to cart page (you would create this page)
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'cart.html'; // You would need to create this page
    });
}

// Initialize Newsletter Form
function initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('#newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to a server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    });
}

// Product Data
async function loadProducts() {
    // In a real app, you would fetch this from an API
    // For demo purposes, we're using mock data
    products = [
        // Smartphones
        {
            id: 1,
            name: 'iPhone 14 Pro',
            category: 'smartphones',
            price: 999,
            rating: 4.8,
            image: 'static/images/iphone-14-pro.jpg',
            images: ['/static/images/iphone-14-pro.jpg', '/static/images/iphone-14-pro-2.jpg', 'images/iphone-14-pro-3.jpg'],
            description: 'The latest iPhone with A16 Bionic chip, Super Retina XDR display, and advanced camera system.',
            features: ['6.1-inch Super Retina XDR display', 'A16 Bionic chip', 'Pro camera system', 'Face ID'],
            stock: 15
        },
        {
            id: 2,
            name: 'Samsung Galaxy S23 Ultra',
            category: 'smartphones',
            price: 1199,
            rating: 4.7,
            image: 'static/images/samsung-s23-ultra.jpg',
            images: ['/static/images/samsung-s23-ultra.jpg', '/static/images/samsung-s23-ultra-2.jpg', '/static/images/samsung-s23-ultra-3.jpg'],
            description: 'Samsung\'s flagship with S Pen support, 200MP camera, and Snapdragon 8 Gen 2 processor.',
            features: ['6.8-inch Dynamic AMOLED 2X', 'S Pen support', '200MP camera', '5000mAh battery'],
            stock: 10
        },
        {
            id: 3,
            name: 'Google Pixel 7 Pro',
            category: 'smartphones',
            price: 899,
            rating: 4.6,
            image: 'static/images/google-pixel-7.jpg',
            images: ['/static/images/google-pixel-7.jpg', '/static/images/google-pixel-7-2.jpg', '/static/images/google-pixel-7-3.jpg'],
            description: 'Google\'s premium smartphone with Tensor G2 chip and advanced computational photography.',
            features: ['6.7-inch QHD+ OLED', 'Tensor G2 chip', 'Triple camera system', 'Face unlock + fingerprint'],
            stock: 8
        },
        
        // Laptops
        {
            id: 4,
            name: 'MacBook Pro 16"',
            category: 'laptops',
            price: 2499,
            rating: 4.9,
            image: 'static/images/macbook-pro-16.jpg',
            images: ['/static/images/macbook-pro-16.jpg', '/static/images/macbook-pro-16-2.jpg', '/static/images/macbook-pro-16-3.jpg'],
            description: 'Powerful MacBook Pro with M2 Pro chip, Liquid Retina XDR display, and up to 96GB RAM.',
            features: ['16.2-inch Liquid Retina XDR', 'M2 Pro or M2 Max chip', 'Up to 96GB unified memory', 'Up to 8TB SSD'],
            stock: 5
        },
        {
            id: 5,
            name: 'Dell XPS 15',
            category: 'laptops',
            price: 1799,
            rating: 4.7,
            image: 'static/images/dell-xps-15.jpg',
            images: ['/static/images/dell-xps-15.jpg', '/static/images/dell-xps-15-2.jpg', '/static/images/dell-xps-15-3.jpg'],
            description: 'Premium Windows laptop with InfinityEdge display, Intel Core i9, and NVIDIA graphics.',
            features: ['15.6-inch 4K UHD+ display', 'Intel Core i9 processor', 'NVIDIA GeForce RTX 3050 Ti', 'Up to 64GB RAM'],
            stock: 7
        },
        {
            id: 6,
            name: 'HP Spectre x360',
            category: 'laptops',
            price: 1499,
            rating: 4.5,
            image: 'static/images/hp-spectre.jpg',
            images: ['/static/images/hp-spectre.jpg', '/static/images/hp-spectre-2.jpg', '/static/images/hp-spectre-3.jpg'],
            description: 'Convertible laptop with OLED display, Intel Evo platform, and premium design.',
            features: ['13.5-inch 3K2K OLED', 'Intel Core i7 processor', '360-degree hinge', 'Thunderbolt 4 ports'],
            stock: 12
        },
        
        // Smartwatches
        {
            id: 7,
            name: 'Apple Watch Ultra',
            category: 'smartwatches',
            price: 799,
            rating: 4.8,
            image: 'static/images/apple-watch-ultra.jpg',
            images: ['/static/images/apple-watch-ultra.jpg', '/static/images/apple-watch-ultra-2.jpg', '/static/images/apple-watch-ultra-3.jpg'],
            description: 'Rugged Apple Watch with titanium case, larger display, and advanced fitness features.',
            features: ['49mm titanium case', 'Retina display', 'Dual-frequency GPS', 'Water resistant to 100m'],
            stock: 20
        },
        {
            id: 8,
            name: 'Samsung Galaxy Watch 5 Pro',
            category: 'smartwatches',
            price: 449,
            rating: 4.6,
            image: 'static/images/samsung-watch-5.jpg',
            images: ['/static/images/samsung-watch-5.jpg', '/static/images/samsung-watch-5-2.jpg', '/static/images/samsung-watch-5-3.jpg'],
            description: 'Premium Android smartwatch with sapphire crystal, GPS routing, and advanced health tracking.',
            features: ['1.4-inch Super AMOLED', 'Titanium case', 'BioActive sensor', 'Up to 80 hours battery'],
            stock: 15
        },
        {
            id: 9,
            name: 'Fitbit Sense 2',
            category: 'smartwatches',
            price: 299,
            rating: 4.3,
            image: 'static/images/fitbit-sense.jpg',
            images: ['/static/images/fitbit-sense.jpg', '/static/images/fitbit-sense-2.jpg', '/static/images/fitbit-sense-3.jpg'],
            description: 'Advanced health smartwatch with stress management, ECG, and SpO2 tracking.',
            features: ['AMOLED display', 'ECG and SpO2 tracking', '6+ day battery', 'Built-in GPS'],
            stock: 25
        },
        
        // Speakers
        {
            id: 10,
            name: 'Sonos Beam',
            category: 'speakers',
            price: 449,
            rating: 4.7,
            image: 'static/images/sonos-beam.jpg',
            images: ['/static/images/sonos-beam.jpg', '/static/images/sonos-beam-2.jpg', '/static/images/sonos-beam-3.jpg'],
            description: 'Compact smart soundbar with Dolby Atmos, voice control, and seamless streaming.',
            features: ['Compact soundbar', 'Dolby Atmos', 'Voice control', 'Works with 100+ services'],
            stock: 8
        },
        {
            id: 11,
            name: 'Bose SoundLink Revolve+',
            category: 'speakers',
            price: 329,
            rating: 4.5,
            image: 'static/images/bose-revolve.jpg',
            images: ['/static/images/bose-revolve.jpg', '/static/images/bose-revolve-2.jpg', '/static/images/bose-revolve-3.jpg'],
            description: 'Portable Bluetooth speaker with 360° sound, waterproof design, and 16-hour battery.',
            features: ['360° sound', 'Waterproof', '16-hour battery', 'Built-in mic'],
            stock: 12
        },
        {
            id: 12,
            name: 'JBL Flip 6',
            category: 'speakers',
            price: 129,
            rating: 4.4,
            image: 'static/images/jbl-flip.jpg',
            images: ['/static/images/jbl-flip.jpg', '/static/images/jbl-flip-2.jpg', '/static/images/jbl-flip-3.jpg'],
            description: 'Portable Bluetooth speaker with powerful sound, IP67 rating, and PartyBoost.',
            features: ['12 hours playtime', 'IP67 waterproof', 'PartyBoost', 'Dual passive radiators'],
            stock: 30
        }
    ];
    
    return Promise.resolve();
}

// Display Featured Products
function displayFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;
    
    // Get 4 random products (or you could mark some as featured in the data)
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const featured = shuffled.slice(0, 4);
    
    featuredContainer.innerHTML = featured.map(product => `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-actions">
                    <button class="quick-view" data-id="${product.id}"><i class="fas fa-eye"></i></button>
                    <button class="add-to-wishlist"><i class="far fa-heart"></i></button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price">$${product.price.toFixed(2)}</div>
                <div class="rating">
                    ${generateStarRating(product.rating)}
                    <span>(${Math.floor(Math.random() * 100 + 10)})</span>
                </div>
                <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners
    document.querySelectorAll('.quick-view').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            openProductModal(productId);
        });
    });
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Display All Products
function displayAllProducts() {
    const categories = {
        smartphones: document.getElementById('smartphone-products'),
        laptops: document.getElementById('laptop-products'),
        smartwatches: document.getElementById('smartwatch-products'),
        speakers: document.getElementById('speaker-products')
    };
    
    for (const [category, container] of Object.entries(categories)) {
        if (!container) continue;
        
        const categoryProducts = products.filter(p => p.category === category);
        
        container.innerHTML = categoryProducts.map(product => `
            <div class="product-card" data-id="${product.id}" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-actions">
                        <button class="quick-view" data-id="${product.id}"><i class="fas fa-eye"></i></button>
                        <button class="add-to-wishlist"><i class="far fa-heart"></i></button>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="price">$${product.price.toFixed(2)}</div>
                    <div class="rating">
                        ${generateStarRating(product.rating)}
                        <span>(${Math.floor(Math.random() * 100 + 10)})</span>
                    </div>
                    <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `).join('');
    }
    
    // Add event listeners
    document.querySelectorAll('.quick-view').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            openProductModal(productId);
        });
    });
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Product Filtering
function setupFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show/hide products based on filter
            document.querySelectorAll('.product-card').forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Scroll to products section
            document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Product Sorting
function setupSorting() {
    const sortSelect = document.getElementById('sort');
    
    sortSelect.addEventListener('change', function() {
        const value = this.value;
        const categoryContainers = document.querySelectorAll('.product-grid');
        
        categoryContainers.forEach(container => {
            const cards = Array.from(container.querySelectorAll('.product-card'));
            
            cards.sort((a, b) => {
                const aId = parseInt(a.getAttribute('data-id'));
                const bId = parseInt(b.getAttribute('data-id'));
                const aProduct = products.find(p => p.id === aId);
                const bProduct = products.find(p => p.id === bId);
                
                switch(value) {
                    case 'price-low':
                        return aProduct.price - bProduct.price;
                    case 'price-high':
                        return bProduct.price - aProduct.price;
                    case 'name-asc':
                        return aProduct.name.localeCompare(bProduct.name);
                    case 'name-desc':
                        return bProduct.name.localeCompare(aProduct.name);
                    default:
                        return 0;
                }
            });
            
            // Reappend sorted cards
            cards.forEach(card => container.appendChild(card));
        });
    });
}

// Product Modal
function initProductModal() {
    const modal = document.getElementById('productModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Close modal when clicking X
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function openProductModal(productId) {
    const modal = document.getElementById('productModal');
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Update modal content
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modalProductRating').innerHTML = generateStarRating(product.rating);
    document.getElementById('modalProductAvailability').textContent = product.stock > 0 ? 
        `<i class="fas fa-check-circle"></i> In Stock (${product.stock} available)` : 
        `<i class="fas fa-times-circle"></i> Out of Stock`;
    document.getElementById('modalProductDescription').textContent = product.description;
    
    // Set main image
    const mainImage = document.getElementById('modalMainImage');
    mainImage.src = product.images[0];
    mainImage.alt = product.name;
    
    // Set thumbnail images
    const thumbnailsContainer = document.querySelector('.thumbnail-images');
    thumbnailsContainer.innerHTML = product.images.map((img, index) => `
        <img src="${img}" alt="${product.name} ${index + 1}" class="${index === 0 ? 'active' : ''}">
    `).join('');
    
    // Add click events to thumbnails
    thumbnailsContainer.querySelectorAll('img').forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            // Update main image
            mainImage.src = product.images[index];
            
            // Update active thumbnail
            thumbnailsContainer.querySelectorAll('img').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Set product options (if any)
    const optionsContainer = document.querySelector('.product-options');
    if (product.features) {
        optionsContainer.innerHTML = `
            <h4>Key Features:</h4>
            <ul>
                ${product.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
    }
    
    // Set up add to cart button
    const addToCartBtn = document.querySelector('.modal .add-to-cart');
    addToCartBtn.onclick = function() {
        const quantity = parseInt(document.getElementById('quantity').value) || 1;
        addToCart(productId, quantity);
        modal.style.display = 'none';
    };
    
    // Show modal
    modal.style.display = 'block';
}

// Cart Functions
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show added notification
    showNotification(`${product.name} added to cart!`);
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    
    if (count > 0) {
        if (!cartCount) {
            const cartIcon = document.querySelector('.fa-shopping-cart');
            const countElement = document.createElement('span');
            countElement.className = 'cart-count';
            countElement.textContent = count;
            cartIcon.parentElement.appendChild(countElement);
        } else {
            cartCount.textContent = count;
        }
    } else if (cartCount) {
        cartCount.remove();
    }
}

function showCartPreview() {
    // Create cart preview if it doesn't exist
    let preview = document.querySelector('.cart-preview');
    
    if (!preview) {
        preview = document.createElement('div');
        preview.className = 'cart-preview';
        document.querySelector('header').appendChild(preview);
    }
    
    if (cart.length === 0) {
        preview.innerHTML = '<p>Your cart is empty</p>';
    } else {
        preview.innerHTML = `
            <h4>Your Cart (${cart.reduce((total, item) => total + item.quantity, 0)} items)</h4>
            <div class="cart-items">
                ${cart.slice(0, 3).map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="item-info">
                            <h5>${item.name}</h5>
                            <div>${item.quantity} x $${item.price.toFixed(2)}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="cart-total">
                <strong>Total: $${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</strong>
            </div>
            <div class="cart-actions">
                <a href="cart.html" class="btn">View Cart</a>
                <a href="checkout.html" class="btn">Checkout</a>
            </div>
        `;
    }
    
    preview.style.display = 'block';
}

function hideCartPreview() {
    const preview = document.querySelector('.cart-preview');
    if (preview) {
        preview.style.display = 'none';
    }
}

// Helper Functions
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    return `
        ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
        ${halfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
        ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
    `;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}