// Blogs Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initCategoryFilter();
    initLoadMore();
    initNewsletter();
    initAnimations();
    initSmoothScrolling();
});

// Category Filtering
function initCategoryFilter() {
    const categoryButtons = document.querySelectorAll('[data-category]');
    const blogPosts = document.querySelectorAll('#blogPosts .col-lg-4');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedCategory = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter blog posts
            filterBlogPosts(selectedCategory, blogPosts);
        });
    });
}

function filterBlogPosts(category, blogPosts) {
    blogPosts.forEach(post => {
        const postCategories = post.getAttribute('data-category').split(' ');
        
        if (category === 'all' || postCategories.includes(category)) {
            post.style.display = 'block';
            post.classList.remove('filtered');
            setTimeout(() => {
                post.classList.add('fade-in', 'visible');
            }, 100);
        } else {
            post.classList.add('filtered');
            setTimeout(() => {
                post.style.display = 'none';
            }, 300);
        }
    });
}

// Load More Functionality
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentPage = 1;
    const postsPerPage = 6;
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMorePosts(currentPage, postsPerPage);
            currentPage++;
        });
    }
}

function loadMorePosts(page, postsPerPage) {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // Show loading state
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
    loadMoreBtn.classList.add('loading');
    
    // Simulate loading delay (replace with actual API call)
    setTimeout(() => {
        // Add more blog posts here
        const blogPostsContainer = document.getElementById('blogPosts');
        
        // Example of additional blog posts
        const additionalPosts = [
            {
                title: "Advanced Docker Containerization Strategies",
                excerpt: "Deep dive into Docker best practices, multi-stage builds, and container optimization techniques for production environments.",
                category: "devops docker",
                image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=250&fit=crop",
                date: "Nov 10, 2024",
                mediumUrl: "https://medium.com/@vishnu123sai/advanced-docker-containerization-strategies"
            },
            {
                title: "Building Serverless Applications with AWS Lambda",
                excerpt: "Complete guide to building scalable serverless applications using AWS Lambda, API Gateway, and related services.",
                category: "cloud serverless",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
                date: "Nov 5, 2024",
                mediumUrl: "https://medium.com/@vishnu123sai/building-serverless-applications-with-aws-lambda"
            },
            {
                title: "GitOps: Managing Infrastructure with Git",
                excerpt: "Understanding GitOps principles and implementing them for infrastructure management and deployment automation.",
                category: "devops gitops",
                image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
                date: "Oct 30, 2024",
                mediumUrl: "https://medium.com/@vishnu123sai/gitops-managing-infrastructure-with-git"
            }
        ];
        
        additionalPosts.forEach(post => {
            const postElement = createBlogPostElement(post);
            blogPostsContainer.appendChild(postElement);
        });
        
        // Reset button state
        loadMoreBtn.innerHTML = '<i class="fas fa-plus me-2"></i>Load More Articles';
        loadMoreBtn.classList.remove('loading');
        
        // Hide button if no more posts (you can implement actual logic)
        if (page >= 3) { // Example: hide after 3 pages
            loadMoreBtn.style.display = 'none';
        }
    }, 1500);
}

function createBlogPostElement(post) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    col.setAttribute('data-category', post.category);
    
    col.innerHTML = `
        <div class="blog-card">
            <div class="blog-image">
                <img src="${post.image}" alt="${post.title}" class="img-fluid">
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    ${post.category.split(' ').map(cat => `<span class="badge bg-primary">${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>`).join('')}
                    <small class="text-muted">${post.date}</small>
                </div>
                <h5 class="blog-title">${post.title}</h5>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="${post.mediumUrl}" class="btn btn-outline-primary btn-sm" target="_blank">
                    Read on Medium <i class="fas fa-external-link-alt ms-1"></i>
                </a>
            </div>
        </div>
    `;
    
    return col;
}

// Newsletter Subscription
function initNewsletter() {
    const subscribeBtn = document.getElementById('subscribeBtn');
    const emailInput = document.getElementById('newsletterEmail');
    
    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', function() {
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                subscribeToNewsletter(email);
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
        
        // Allow Enter key to submit
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeBtn.click();
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function subscribeToNewsletter(email) {
    const subscribeBtn = document.getElementById('subscribeBtn');
    const originalText = subscribeBtn.innerHTML;
    
    // Show loading state
    subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Subscribing...';
    subscribeBtn.disabled = true;
    
    // Simulate API call (replace with actual newsletter service)
    setTimeout(() => {
        showNotification('Successfully subscribed to newsletter!', 'success');
        document.getElementById('newsletterEmail').value = '';
        
        // Reset button
        subscribeBtn.innerHTML = originalText;
        subscribeBtn.disabled = false;
    }, 2000);
}

// Animations
function initAnimations() {
    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all blog cards
    document.querySelectorAll('.blog-card').forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Smooth scroll for navigation links
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
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} notification`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-radius: 8px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification {
        animation: slideInRight 0.3s ease;
    }
`;
document.head.appendChild(style);

// Search functionality (optional enhancement)
function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search blog posts...';
    searchInput.className = 'form-control mb-4';
    searchInput.style.maxWidth = '400px';
    
    const searchContainer = document.querySelector('.d-flex.flex-wrap.gap-2.justify-content-center');
    if (searchContainer) {
        searchContainer.parentNode.insertBefore(searchInput, searchContainer);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const blogPosts = document.querySelectorAll('#blogPosts .col-lg-4');
            
            blogPosts.forEach(post => {
                const title = post.querySelector('.blog-title').textContent.toLowerCase();
                const excerpt = post.querySelector('.blog-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }
}

// Initialize search if needed
// initSearch(); // Uncomment to enable search functionality

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();
