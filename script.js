let blogPosts = [];
let comments = {};
let currentPostId = null;
let currentFilter = 'all';
let currentSort = 'date-desc';
let searchTimeout = null;

// Enhanced sample data with more realistic content
const samplePosts = [
    {
        id: 1,
        title: "The Journey of Mixed Media Art",
        author: "Elena Rodriguez",
        category: "mixed-media",
        content: "Mixed media art has opened up a whole new world of creative possibilities for me. By combining traditional painting techniques with digital elements and found objects, I've discovered a unique voice that speaks to the complexity of modern life.\n\nThis piece represents the intersection of technology and humanity, using recycled circuit boards as a canvas for organic watercolor flows. The contrast between the rigid geometric patterns of the electronics and the fluid, organic movements of the watercolors creates a visual metaphor for our relationship with technology.\n\nThe process began with collecting discarded circuit boards from old computers and phones. I carefully cleaned and prepared each piece, considering how the existing patterns and components could enhance rather than compete with the painted elements. The watercolors were applied using both traditional brushwork and experimental techniques like salt texturing and alcohol drops.\n\nWhat fascinates me most about mixed media is how different materials can dialogue with each other, creating unexpected harmonies and tensions that neither medium could achieve alone.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        date: new Date('2025-01-15').toISOString(),
        excerpt: "Exploring the intersection of traditional and digital art through mixed media experimentation.",
        readTime: 4,
        tags: ["mixed-media", "watercolor", "technology", "sustainability"]
    },

    {
        id: 2,
        title: "Digital Landscapes: Creating Worlds",
        author: "Marcus Chen",
        category: "digital-art",
        content: "Creating digital landscapes allows me to build impossible worlds that exist only in imagination. Using a combination of 3D modeling software and digital painting techniques, I craft environments that tell stories without words.\n\nThis latest series explores themes of solitude and connection in vast, alien landscapes that somehow feel familiar. Each piece begins with a rough 3D model created in Blender, establishing the basic topography and lighting conditions. From there, I export the scene and continue working in Photoshop, adding atmospheric effects, detailed textures, and organic elements that breathe life into the digital space.\n\nThe color palettes I choose are deliberately muted, using grays, blues, and subtle earth tones to create a sense of melancholy and wonder. I want viewers to feel both the vastness of these spaces and their own small place within them.\n\nTechnology has become my paintbrush, but the emotions and stories I'm trying to convey remain fundamentally human. These digital worlds serve as mirrors for our own experiences of isolation, beauty, and the search for meaning.",
        image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=300&fit=crop",
        date: new Date('2025-01-10').toISOString(),
        excerpt: "Building impossible worlds through digital art and 3D modeling techniques.",
        readTime: 5,
        tags: ["digital-art", "3d-modeling", "landscapes", "photoshop"]
    },
    {
        id: 3,
        title: "Portrait Photography: Capturing Souls",
        author: "Sarah Johnson",
        category: "photography",
        content: "Portrait photography is about more than just capturing a person's appearance – it's about revealing their essence. Through careful lighting, composition, and genuine connection with my subjects, I aim to create images that tell the deeper story of who someone is.\n\nEach portrait session begins with conversation. I spend time getting to know my subjects, understanding their stories, their passions, their vulnerabilities. This connection is essential because the camera captures not just light, but energy and emotion.\n\nTechnically, I prefer natural light whenever possible, often shooting during the golden hour when the light is soft and warm. I use a combination of reflectors and subtle fill flash to sculpt the light around my subject's face, bringing out their best features while maintaining a natural look.\n\nThe post-processing phase is where the magic really happens. I work primarily in Lightroom and Photoshop, carefully adjusting contrast, color grading, and subtle retouching to enhance the mood and emotion of each image. The goal is always to reveal more of the person's true self, not to hide it behind heavy processing.\n\nEvery portrait is a collaboration between photographer and subject, a moment of vulnerability and trust that results in something neither could create alone.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop",
        date: new Date('2025-01-05').toISOString(),
        excerpt: "Exploring the art of revealing character and emotion through portrait photography.",
        readTime: 6,
        tags: ["photography", "portraits", "lighting", "human-connection"]
    },
    {
        id: 4,
        title: "Abstract Painting: Finding Form in Chaos",
        author: "David Kim",
        category: "painting",
        content: "Abstract painting challenges me to communicate without literal representation. Each brush stroke is a decision, each color choice an emotion. In this latest series, I've been exploring the balance between control and spontaneity, allowing the paint to guide me while maintaining intentional composition.\n\nMy process begins with meditation. I spend time in silence, clearing my mind and connecting with the emotions I want to express. Only then do I approach the canvas, armed with an intuitive understanding of color relationships and compositional balance.\n\nI work primarily with acrylics, which dry quickly and allow for layering and reworking. The paintings evolve organically, each layer responding to what came before. Sometimes I'll spend days on a single piece, building up complex relationships between forms and colors. Other times, a painting emerges in a single, focused session.\n\nColor is my primary language. Warm reds and oranges speak of passion and energy, while cool blues and greens whisper of tranquility and depth. The interaction between these colors creates visual tension and harmony, much like a musical composition.\n\nThe result is a dialogue between artist and medium, between intention and accident, between the conscious mind and the subconscious. Each painting is a journey of discovery, both for me as the creator and for the viewer who encounters it.",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
        date: new Date('2024-12-28').toISOString(),
        excerpt: "Discovering the balance between control and spontaneity in abstract expression.",
        readTime: 7,
        tags: ["painting", "abstract", "acrylics", "color-theory"]
    },
    {
        id: 5,
        title: "Sculpture in the Digital Age",
        author: "Maria Santos",
        category: "sculpture",
        content: "Traditional sculpture techniques meet modern fabrication methods in my latest body of work. Using a combination of hand-carving, 3D printing, and mixed materials, I explore how ancient art forms can evolve with contemporary technology.\n\nThe process begins with sketches and small clay maquettes, working out the basic forms and proportions. From there, I create detailed 3D models using ZBrush, which allows me to refine the forms digitally before committing to physical materials.\n\nSome elements are 3D printed in resin or metal, while others are carved by hand from stone or wood. The contrast between machine precision and human touch creates a dialogue about our relationship with technology and craftsmanship.\n\nMy latest piece combines marble carved using traditional techniques with algorithmically generated forms printed in titanium. The juxtaposition challenges viewers to consider questions about authenticity, craft, and the role of the artist in an age of digital fabrication.",
        image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop",
        date: new Date('2024-12-20').toISOString(),
        excerpt: "Merging traditional sculpture techniques with modern digital fabrication methods.",
        readTime: 5,
        tags: ["sculpture", "3d-printing", "traditional-craft", "mixed-materials"]
    },
    {
        id: 6,
        title: "The Art of Color Theory",
        author: "Lena Thompson",
        category: "art-theory",
        content: "Color theory is the foundation of all visual art. Understanding how colors interact, contrast, and harmonize is essential for creating compelling compositions. In this article, I delve into the principles of color theory and how I apply them in my own work.\n\nI start with the color wheel, exploring primary, secondary, and tertiary colors. Complementary colors create vibrant contrasts, while analogous colors offer harmonious blends. I also consider color temperature – warm colors evoke energy and passion, while cool colors suggest calm and introspection.\n\nIn my paintings, I often use a limited color palette to create a cohesive mood. By carefully selecting a few key colors and varying their saturation and value, I can achieve depth and interest without overwhelming the viewer.\n\nI also experiment with color symbolism, using specific hues to convey emotions or themes. For example, red can signify love or anger, while blue might represent tranquility or sadness. By being intentional with my color choices, I aim to enhance the narrative of each piece.\n\nUltimately, mastering color theory is an ongoing journey. Each project offers new challenges and opportunities to explore the endless possibilities of color in art.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
        date: new Date('2024-12-15').toISOString(),
        excerpt: "Exploring the principles of color theory and their application in visual art.",
        readTime: 6,
        tags: ["color-theory", "painting", "composition", "art-principles"]
        
    },
    {
        id: 7,
        title: "Finding Inspiration in Everyday Life",
        author: "James Lee",
        category: "inspiration",
        content: "Inspiration can be found in the most unexpected places. As an artist, I've learned to keep my eyes open to the beauty and stories that surround me every day. Whether it's a fleeting moment of light, a conversation overheard in a café, or the textures of urban decay, these small details fuel my creativity.\n\nI carry a sketchbook with me wherever I go, jotting down ideas, sketches, and observations. Photography is another tool I use to capture moments that resonate with me. These images often serve as reference material for later projects.\n\nTraveling is also a significant source of inspiration. Experiencing different cultures, landscapes, and artistic traditions broadens my perspective and introduces new visual languages into my work.\n\nUltimately, I believe that staying curious and open to the world around us is key to finding inspiration. By embracing everyday experiences and allowing them to inform our art, we can create work that feels authentic and deeply connected to our lives.",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=400&h=300&fit=crop",
        date: new Date('2024-12-05').toISOString(),
        excerpt: "Discovering creativity through everyday observations and experiences.",
        readTime: 4,
        tags: ["inspiration", "creativity", "sketching", "travel"]
    },
    {
        id: 8,
        title: "Techniques for Realistic Portrait Painting",
        author: "Olivia Martinez",
        category: "painting",
        content: "Realistic portrait painting is a challenging yet rewarding endeavor. It requires a deep understanding of anatomy, light, and color, as well as patience and attention to detail. In this article, I share some of the techniques I've developed over years of practice.\n\nI begin with a detailed sketch, focusing on accurate proportions and capturing the likeness of the subject. From there, I block in the basic shapes and values using a limited palette to establish the overall composition.\n\nLayering is key to achieving realism. I build up the painting gradually, starting with thin glazes to establish mid-tones and shadows, then adding thicker paint for highlights and texture. I pay close attention to the way light interacts with skin, using subtle color shifts to convey warmth and depth.\n\nBrushwork is another important aspect. I use a variety of brushes to create different textures, from soft blending for skin tones to more defined strokes for hair and clothing details.\n\nFinally, I step back frequently to assess the overall composition and make adjustments as needed. Realistic portrait painting is as much about observation and interpretation as it is about technical skill.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=300&fit=crop",
        date: new Date('2024-11-25').toISOString(),
        excerpt: "Mastering the art of realistic portrait painting through observation and technique.",
        readTime: 7,
        tags: ["painting", "portraits", "realism", "techniques"]
    },
    {
        id: 9,
        title: "The Role of Storytelling in Visual Art",
        author: "Ethan Brown",
        category: "art-theory",
        content: "Storytelling is a fundamental aspect of visual art. Every piece, whether abstract or representational, has the potential to convey a narrative or evoke emotions. As an artist, I strive to create work that tells a story, inviting viewers to engage with the piece on a deeper level.\n\nI often start with a concept or theme that resonates with me personally. This could be a social issue, a personal experience, or a universal human condition. From there, I consider how to visually represent this idea through composition, color, and symbolism.\n\nCharacters and settings can be literal or abstract, depending on the style of the work. Even in non-representational art, elements like color choice and form can suggest mood and meaning.\n\nUltimately, I believe that storytelling in art is about connection. By sharing our stories through visual means, we can foster empathy and understanding, bridging gaps between different experiences and perspectives.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
        date: new Date('2024-11-15').toISOString(),
        excerpt: "Exploring how visual art can convey narratives and evoke emotional connections.",
        readTime: 5,
        tags: ["art-theory", "storytelling", "narrative", "visual-art"]
    },
    {
        id: 10,
        title: "Exploring Texture in Mixed Media Art",
        author: "Sophia Green",
        category: "mixed-media",
        content: "Texture is a powerful element in mixed media art, adding depth and tactile interest to a piece. By combining different materials and techniques, I create surfaces that invite viewers to explore the artwork both visually and physically.\n\nIn my recent work, I've been experimenting with layering materials like fabric, paper, and found objects onto canvas. Each layer contributes its own texture, creating a rich, complex surface that tells a story of its own.\n\nI also use various painting techniques to enhance texture, such as impasto for thick, sculptural paint applications and dry brushing for subtle surface variations. The interplay between smooth and rough areas creates visual tension and draws the eye across the composition.\n\nIncorporating texture into mixed media art not only enhances the aesthetic experience but also adds meaning. The choice of materials can reflect themes of memory, decay, or transformation, making texture an integral part of the narrative.",
        image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=400&h=300&fit=crop",
        date: new Date('2024-11-05').toISOString(),
        excerpt: "Using texture to add depth and meaning in mixed media compositions.",
        readTime: 6,
        tags: ["mixed-media", "texture", "layering", "materials"]
    }
];

// Enhanced sample comments
const sampleComments = {
    1: [
        {
            id: 1,
            name: "Art Lover",
            text: "This is absolutely beautiful! The way you combine traditional and digital elements is inspiring. I've been wanting to experiment with mixed media myself.",
            time: new Date('2025-01-16').toISOString()
        },
        {
            id: 2,
            name: "Creative Student",
            text: "As someone just starting with mixed media, this gives me so many ideas. Thank you for sharing your process in such detail!",
            time: new Date('2025-01-17').toISOString()
        },
        {
            id: 3,
            name: "Elena Rodriguez",
            text: "Thank you both for the kind words! I'd love to see what you create with mixed media. The key is to start experimenting and let the materials guide you.",
            time: new Date('2025-01-18').toISOString()
        }
    ],
    2: [
        {
            id: 1,
            name: "Digital Artist",
            text: "Your landscapes are incredible! What software do you primarily use for the 3D modeling? I'm trying to improve my environment work.",
            time: new Date('2025-01-11').toISOString()
        },
        {
            id: 2,
            name: "Marcus Chen",
            text: "Thanks! I use Blender for the base 3D work and Photoshop for painting and atmospheric effects. Happy to share more details if you're interested!",
            time: new Date('2025-01-12').toISOString()
        }
    ],
    3: [
        {
            id: 1,
            name: "Photography Enthusiast",
            text: "Your approach to connecting with subjects really resonates with me. How do you help shy people feel comfortable during shoots?",
            time: new Date('2025-01-06').toISOString()
        }
    ]
};

// DOM elements
const elements = {
    // Navigation
    homeBtn: document.getElementById('homeBtn'),
    createPostBtn: document.getElementById('createPostBtn'),
    aboutBtn: document.getElementById('aboutBtn'),
    startBloggingBtn: document.getElementById('startBloggingBtn'),
    
    // Sections
    heroSection: document.getElementById('heroSection'),
    createPostSection: document.getElementById('createPostSection'),
    blogPostsSection: document.getElementById('blogPostsSection'),
    singlePostSection: document.getElementById('singlePostSection'),
    
    // Forms
    createPostForm: document.getElementById('createPostForm'),
    cancelPostBtn: document.getElementById('cancelPostBtn'),
    publishBtn: document.getElementById('publishBtn'),
    commentForm: document.getElementById('commentForm'),
    
    // Content areas
    postsGrid: document.getElementById('postsGrid'),
    singlePostContent: document.getElementById('singlePostContent'),
    commentsList: document.getElementById('commentsList'),
    commentCount: document.getElementById('commentCount'),
    
    // Navigation
    backToPostsBtn: document.getElementById('backToPostsBtn'),
    
    // UI elements
    loadingSpinner: document.getElementById('loadingSpinner'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    sortSelect: document.getElementById('sortSelect'),
    searchInput: document.getElementById('searchInput'),
    searchResults: document.getElementById('searchResults'),
    
    // Form inputs with character counting
    postTitle: document.getElementById('postTitle'),
    postAuthor: document.getElementById('postAuthor'),
    postContent: document.getElementById('postContent'),
    commentText: document.getElementById('commentText'),
    titleCount: document.getElementById('titleCount'),
    authorCount: document.getElementById('authorCount'),
    contentCount: document.getElementById('contentCount'),
    commentTextCount: document.getElementById('commentTextCount')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeBlog();
    attachEventListeners();
    setupFormValidation();
    setupCharacterCounters();
    console.log('Enhanced blog platform initialized successfully!');
});

function initializeBlog() {
    // Load sample data
    blogPosts = [...samplePosts];
    comments = JSON.parse(JSON.stringify(sampleComments));
    
    // Display initial posts
    displayPosts();
    
    // Show hero section by default
    showSection('hero');
    
    // Set initial sort value
    if (elements.sortSelect) {
        elements.sortSelect.value = currentSort;
    }
}

// ===== EVENT LISTENERS =====
function attachEventListeners() {
    // Navigation buttons
    elements.homeBtn?.addEventListener('click', () => showSection('hero'));
    elements.createPostBtn?.addEventListener('click', () => showSection('create-post'));
    elements.aboutBtn?.addEventListener('click', showAbout);
    elements.startBloggingBtn?.addEventListener('click', () => showSection('posts'));
    
    // Form handlers
    elements.createPostForm?.addEventListener('submit', handleCreatePost);
    elements.cancelPostBtn?.addEventListener('click', () => {
        if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
            elements.createPostForm.reset();
            clearFormErrors();
            showSection('posts');
        }
    });
    elements.commentForm?.addEventListener('submit', handleAddComment);
    
    // Navigation
    elements.backToPostsBtn?.addEventListener('click', () => showSection('posts'));
    
    // Filter and sort
    elements.filterBtns?.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            filterPosts(category);
        });
    });
    
    elements.sortSelect?.addEventListener('change', (e) => {
        currentSort = e.target.value;
        displayPosts();
    });
    
    // Search functionality
    elements.searchInput?.addEventListener('input', handleSearch);
    elements.searchInput?.addEventListener('focus', () => {
        if (elements.searchInput.value.length > 0) {
            elements.searchResults.style.display = 'block';
        }
    });
    
    // Hide search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            elements.searchResults.style.display = 'none';
        }
    });
    
    // Handle post card clicks
    document.addEventListener('click', (e) => {
        const postCard = e.target.closest('.post-card');
        if (postCard && !e.target.closest('.search-results')) {
            const postId = parseInt(postCard.dataset.postId);
            showSinglePost(postId);
        }
        
        // Handle search result clicks
        const searchResultItem = e.target.closest('.search-result-item');
        if (searchResultItem) {
            const postId = parseInt(searchResultItem.dataset.postId);
            showSinglePost(postId);
            elements.searchResults.style.display = 'none';
            elements.searchInput.value = '';
        }
    });
}

// ===== FORM VALIDATION =====
function setupFormValidation() {
    // Real-time validation for create post form
    elements.postTitle?.addEventListener('blur', validateTitle);
    elements.postAuthor?.addEventListener('blur', validateAuthor);
    elements.postContent?.addEventListener('blur', validateContent);
    document.getElementById('postImage')?.addEventListener('blur', validateImageURL);
    document.getElementById('postCategory')?.addEventListener('change', validateCategory);
    
    // Comment form validation
    document.getElementById('commentName')?.addEventListener('blur', validateCommentName);
    elements.commentText?.addEventListener('blur', validateCommentText);
}

function validateTitle() {
    const titleInput = elements.postTitle;
    const titleGroup = titleInput?.closest('.form-group');
    const title = titleInput?.value.trim();
    
    if (!title || title.length < 3) {
        showFieldError(titleGroup, 'Title must be at least 3 characters long');
        return false;
    } else if (title.length > 100) {
        showFieldError(titleGroup, 'Title must be less than 100 characters');
        return false;
    } else {
        hideFieldError(titleGroup);
        return true;
    }
}

function validateAuthor() {
    const authorInput = elements.postAuthor;
    const authorGroup = authorInput?.closest('.form-group');
    const author = authorInput?.value.trim();
    
    if (!author || author.length < 2) {
        showFieldError(authorGroup, 'Author name must be at least 2 characters long');
        return false;
    } else if (author.length > 50) {
        showFieldError(authorGroup, 'Author name must be less than 50 characters');
        return false;
    } else {
        hideFieldError(authorGroup);
        return true;
    }
}

function validateContent() {
    const contentInput = elements.postContent;
    const contentGroup = contentInput?.closest('.form-group');
    const content = contentInput?.value.trim();
    
    if (!content || content.length < 50) {
        showFieldError(contentGroup, 'Content must be at least 50 characters long');
        return false;
    } else if (content.length > 5000) {
        showFieldError(contentGroup, 'Content must be less than 5000 characters');
        return false;
    } else {
        hideFieldError(contentGroup);
        return true;
    }
}

function validateCategory() {
    const categorySelect = document.getElementById('postCategory');
    const categoryGroup = categorySelect?.closest('.form-group');
    
    if (!categorySelect?.value) {
        showFieldError(categoryGroup, 'Please select a category');
        return false;
    } else {
        hideFieldError(categoryGroup);
        return true;
    }
}

function validateImageURL() {
    const imageInput = document.getElementById('postImage');
    const imageGroup = imageInput?.closest('.form-group');
    const url = imageInput?.value.trim();
    
    if (url && !isValidURL(url)) {
        showFieldError(imageGroup, 'Please enter a valid URL');
        return false;
    } else {
        hideFieldError(imageGroup);
        return true;
    }
}

function validateCommentName() {
    const nameInput = document.getElementById('commentName');
    const nameGroup = nameInput?.closest('.form-group');
    const name = nameInput?.value.trim();
    
    if (!name || name.length < 2) {
        showFieldError(nameGroup, 'Name must be at least 2 characters long');
        return false;
    } else if (name.length > 50) {
        showFieldError(nameGroup, 'Name must be less than 50 characters');
        return false;
    } else {
        hideFieldError(nameGroup);
        return true;
    }
}

function validateCommentText() {
    const textInput = elements.commentText;
    const textGroup = textInput?.closest('.form-group');
    const text = textInput?.value.trim();
    
    if (!text || text.length < 5) {
        showFieldError(textGroup, 'Comment must be at least 5 characters long');
        return false;
    } else if (text.length > 500) {
        showFieldError(textGroup, 'Comment must be less than 500 characters');
        return false;
    } else {
        hideFieldError(textGroup);
        return true;
    }
}

function showFieldError(fieldGroup, message) {
    if (!fieldGroup) return;
    fieldGroup.classList.add('error');
    const errorMessage = fieldGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.textContent = message;
    }
}

function hideFieldError(fieldGroup) {
    if (!fieldGroup) return;
    fieldGroup.classList.remove('error');
}

function clearFormErrors() {
    document.querySelectorAll('.form-group.error').forEach(group => {
        group.classList.remove('error');
    });
}

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// ===== CHARACTER COUNTERS =====
function setupCharacterCounters() {
    const counters = [
        { input: elements.postTitle, counter: elements.titleCount, max: 100 },
        { input: elements.postAuthor, counter: elements.authorCount, max: 50 },
        { input: elements.postContent, counter: elements.contentCount, max: 5000 },
        { input: elements.commentText, counter: elements.commentTextCount, max: 500 }
    ];
    
    counters.forEach(({ input, counter, max }) => {
        if (input && counter) {
            input.addEventListener('input', () => {
                const count = input.value.length;
                counter.textContent = count;
                
                // Color coding for character count
                const percentage = count / max;
                if (percentage >= 0.9) {
                    counter.style.color = 'var(--error-color)';
                } else if (percentage >= 0.8) {
                    counter.style.color = 'var(--warning-color)';
                } else {
                    counter.style.color = 'var(--text-light)';
                }
            });
        }
    });
}

// ===== SEARCH FUNCTIONALITY =====
function handleSearch() {
    const query = elements.searchInput.value.trim().toLowerCase();
    
    // Clear previous timeout
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    
    if (query.length === 0) {
        elements.searchResults.style.display = 'none';
        return;
    }
    
    // Debounce search
    searchTimeout = setTimeout(() => {
        performSearch(query);
    }, 300);
}

function performSearch(query) {
    const results = blogPosts.filter(post => {
        return post.title.toLowerCase().includes(query) ||
            post.content.toLowerCase().includes(query) ||
            post.author.toLowerCase().includes(query) ||
            post.tags?.some(tag => tag.toLowerCase().includes(query));
    });
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    if (results.length === 0) {
        elements.searchResults.innerHTML = '<div style="padding: var(--space-sm); color: var(--text-secondary);">No results found</div>';
    } else {
        elements.searchResults.innerHTML = results.slice(0, 5).map(post => `
            <div class="search-result-item" data-post-id="${post.id}">
                <div class="search-result-title">${post.title}</div>
                <div class="search-result-excerpt">${post.excerpt}</div>
            </div>
        `).join('');
    }
    
    elements.searchResults.style.display = 'block';
}

// ===== SECTION MANAGEMENT =====
function showSection(sectionName) {
    // Hide all sections
    elements.heroSection?.classList.add('hidden');
    elements.createPostSection?.classList.add('hidden');
    elements.blogPostsSection?.classList.add('hidden');
    elements.singlePostSection?.classList.add('hidden');
    
    // Show requested section with animation
    setTimeout(() => {
        switch(sectionName) {
            case 'hero':
                elements.heroSection?.classList.remove('hidden');
                elements.heroSection?.classList.add('fade-in');
                break;
            case 'create-post':
                elements.createPostSection?.classList.remove('hidden');
                elements.createPostSection?.classList.add('slide-up');
                break;
            case 'posts':
                elements.blogPostsSection?.classList.remove('hidden');
                elements.blogPostsSection?.classList.add('fade-in');
                displayPosts();
                break;
            case 'single-post':
                elements.singlePostSection?.classList.remove('hidden');
                elements.singlePostSection?.classList.add('slide-up');
                break;
        }
    }, 100);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function showAbout() {
  // Hide other sections
    elements.heroSection?.classList.add("hidden");
    elements.blogPostsSection?.classList.add("hidden");
    elements.createPostSection?.classList.add("hidden");
    elements.singlePostSection?.classList.add("hidden");

  // Show About
    document.getElementById("aboutSection")?.classList.remove("hidden");

  // Update stats dynamically
    document.getElementById("totalPosts").textContent = blogPosts.length;
    document.getElementById("totalArtists").textContent = new Set(blogPosts.map(p => p.author)).size;
    document.getElementById("totalComments").textContent = Object.values(comments).flat().length;
}

    

// ===== POST MANAGEMENT =====
function displayPosts() {
    if (!elements.postsGrid) return;
    
    showLoading(true);
    
    // Filter posts
    let filteredPosts = blogPosts;
    if (currentFilter !== 'all') {
        filteredPosts = blogPosts.filter(post => post.category === currentFilter);
    }
    
    // Sort posts
    filteredPosts = sortPosts(filteredPosts, currentSort);
    
    setTimeout(() => {
        elements.postsGrid.innerHTML = '';
        
        if (filteredPosts.length === 0) {
            elements.postsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <h3>No posts found</h3>
                    <p>No posts match your current filter. Try selecting a different category or create a new post!</p>
                </div>
            `;
        } else {
            filteredPosts.forEach((post, index) => {
                const postCard = createPostCard(post);
                postCard.style.animationDelay = `${index * 0.1}s`;
                elements.postsGrid.appendChild(postCard);
            });
        }
        
        showLoading(false);
    }, 500);
}

function sortPosts(posts, sortType) {
    const sortedPosts = [...posts];
    
    switch(sortType) {
        case 'date-desc':
            return sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        case 'date-asc':
            return sortedPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
        case 'title-asc':
            return sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
        case 'title-desc':
            return sortedPosts.sort((a, b) => b.title.localeCompare(a.title));
        case 'author-asc':
            return sortedPosts.sort((a, b) => a.author.localeCompare(b.author));
        default:
            return sortedPosts;
    }
}

function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'post-card scale-in';
    card.dataset.postId = post.id;
    
    const postDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const commentCount = comments[post.id] ? comments[post.id].length : 0;
    
    card.innerHTML = `
        <div class="post-card-image">
            ${post.image ? 
                `<img src="${post.image}" alt="${post.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display: none; width: 100%; height: 100%; background: var(--gradient-primary); color: white; align-items: center; justify-content: center; font-size: var(--font-size-lg); font-weight: 600;">
                    ${post.category.charAt(0).toUpperCase() + post.category.slice(1).replace('-', ' ')}
                </div>` :
                `<div style="width: 100%; height: 100%; background: var(--gradient-primary); color: white; display: flex; align-items: center; justify-content: center; font-size: var(--font-size-lg); font-weight: 600;">
                    ${post.category.charAt(0).toUpperCase() + post.category.slice(1).replace('-', ' ')}
                </div>`
            }
        </div>
        <div class="post-card-content">
            <span class="post-category">${post.category.replace('-', ' ')}</span>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.excerpt || post.content.substring(0, 120) + '...'}</p>
            <div class="post-meta">
                <span class="post-author">By ${post.author}</span>
                <span class="post-date">${postDate}</span>
            </div>
            <div class="post-stats">
                <span>${post.readTime || 5} min read</span>
                <span>${commentCount} comments</span>
            </div>
        </div>
    `;
    
    return card;
}

function handleCreatePost(e) {
    e.preventDefault();
    
    // Validate all fields
    const isValid = validateTitle() && validateAuthor() && validateCategory() && 
                validateContent() && validateImageURL();
    
    if (!isValid) {
        showNotification('Please fix the errors in the form before submitting.', 'error');
        return;
    }
    
    showLoading(true);
    elements.publishBtn.disabled = true;
    elements.publishBtn.textContent = 'Publishing...';
    
    const formData = new FormData(e.target);
    const content = formData.get('content');
    const estimatedReadTime = Math.ceil(content.split(' ').length / 200); // 200 words per minute
    
    const newPost = {
        id: blogPosts.length + 1,
        title: formData.get('title').trim(),
        author: formData.get('author').trim(),
        category: formData.get('category'),
        content: content.trim(),
        image: formData.get('image').trim() || null,
        date: new Date().toISOString(),
        excerpt: content.substring(0, 150) + '...',
        readTime: estimatedReadTime,
        tags: extractTags(formData.get('title'), content)
    };
    
    setTimeout(() => {
        blogPosts.unshift(newPost);
        e.target.reset();
        clearFormErrors();
        resetCharacterCounters();
        showLoading(false);
        elements.publishBtn.disabled = false;
        elements.publishBtn.textContent = 'Publish Post';
        showSection('posts');
        
        showNotification('Post created successfully!', 'success');
    }, 1000);
}

function extractTags(title, content) {
    // Simple tag extraction based on common art terms
    const artTerms = ['painting', 'sculpture', 'digital', 'photography', 'mixed-media', 'abstract', 
                    'portrait', 'landscape', 'color', 'technique', 'inspiration', 'tutorial'];
    const text = (title + ' ' + content).toLowerCase();
    return artTerms.filter(term => text.includes(term));
}

function resetCharacterCounters() {
    elements.titleCount.textContent = '0';
    elements.authorCount.textContent = '0';
    elements.contentCount.textContent = '0';
    elements.commentTextCount.textContent = '0';
}

function showSinglePost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;
    
    currentPostId = postId;
    
    const postDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    elements.singlePostContent.innerHTML = `
        <div class="single-post-header">
            <span class="post-category">${post.category.replace('-', ' ')}</span>
            <h1 class="single-post-title">${post.title}</h1>
            <div class="single-post-meta">
                <span class="post-author">By ${post.author}</span>
                <span class="post-date">${postDate}</span>
                <span>${post.readTime || 5} min read</span>
            </div>
        </div>
        
        ${post.image ? `
            <div class="single-post-image">
                <img src="${post.image}" alt="${post.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display: none; width: 100%; height: 300px; background: var(--gradient-primary); color: white; align-items: center; justify-content: center; font-size: var(--font-size-lg); font-weight: 600;">
                    ${post.category.charAt(0).toUpperCase() + post.category.slice(1).replace('-', ' ')}
                </div>
            </div>
        ` : ''}
        
        <div class="single-post-content">
            ${post.content.split('\n').map(paragraph => 
                paragraph.trim() ? `<p>${paragraph}</p>` : ''
            ).join('')}
        </div>
        
        ${post.tags && post.tags.length > 0 ? `
            <div style="margin-top: var(--space-lg); padding-top: var(--space-lg); border-top: 1px solid var(--border-color);">
                <strong>Tags:</strong> ${post.tags.map(tag => `<span style="background: var(--bg-secondary); padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); margin-right: 0.5rem; font-size: var(--font-size-sm);">${tag}</span>`).join('')}
            </div>
        ` : ''}
    `;
    
    displayComments(postId);
    showSection('single-post');
}

// ===== COMMENT MANAGEMENT =====
function displayComments(postId) {
    const postComments = comments[postId] || [];
    
    // Update comment count
    if (elements.commentCount) {
        elements.commentCount.textContent = postComments.length;
    }
    
    elements.commentsList.innerHTML = '';
    
    if (postComments.length === 0) {
        elements.commentsList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
        `;
        return;
    }
    
    postComments.forEach((comment, index) => {
        const commentElement = createCommentElement(comment);
        commentElement.style.animationDelay = `${index * 0.1}s`;
        elements.commentsList.appendChild(commentElement);
    });
}

function createCommentElement(comment) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment fade-in';
    
    const commentDate = new Date(comment.time).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    commentDiv.innerHTML = `
        <div class="comment-author">${comment.name}</div>
        <div class="comment-text">${comment.text}</div>
        <div class="comment-time">${commentDate}</div>
    `;
    
    return commentDiv;
}

function handleAddComment(e) {
    e.preventDefault();
    
    if (!currentPostId) return;
    
    // Validate comment fields
    const isValid = validateCommentName() && validateCommentText();
    
    if (!isValid) {
        showNotification('Please fix the errors in the comment form.', 'error');
        return;
    }
    
    const formData = new FormData(e.target);
    const newComment = {
        id: (comments[currentPostId] || []).length + 1,
        name: formData.get('name').trim(),
        text: formData.get('text').trim(),
        time: new Date().toISOString()
    };
    
    // Initialize comments array if it doesn't exist
    if (!comments[currentPostId]) {
        comments[currentPostId] = [];
    }
    
    comments[currentPostId].push(newComment);
    
    // Clear form
    e.target.reset();
    clearFormErrors();
    elements.commentTextCount.textContent = '0';
    
    // Refresh comments display
    displayComments(currentPostId);
    
    // Show success message
    showNotification('Comment added successfully!', 'success');
    
    // Scroll to new comment
    setTimeout(() => {
        const commentsList = elements.commentsList;
        const newCommentElement = commentsList.lastElementChild;
        if (newCommentElement && !newCommentElement.textContent.includes('No comments yet')) {
            newCommentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
}

// ===== FILTER FUNCTIONALITY =====
function filterPosts(category) {
    currentFilter = category;
    
    // Update active filter button
    elements.filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    // Refresh posts display
    displayPosts();
}

// ===== UTILITY FUNCTIONS =====
function showLoading(show) {
    if (elements.loadingSpinner) {
        if (show) {
            elements.loadingSpinner.classList.remove('hidden');
        } else {
            elements.loadingSpinner.classList.add('hidden');
        }
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Debounce function for search and other operations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images
function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading and other performance features
document.addEventListener('DOMContentLoaded', function() {
    setupLazyLoading();
    console.log('Performance optimizations loaded');
});

// ===== KEYBOARD NAVIGATION SUPPORT =====
document.addEventListener('keydown', function(e) {
    // Escape key to close search results or forms
    if (e.key === 'Escape') {
        elements.searchResults.style.display = 'none';
        
        // Close create post form if open
        if (!elements.createPostSection.classList.contains('hidden')) {
            if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
                elements.createPostForm.reset();
                clearFormErrors();
                showSection('posts');
            }
        }
    }
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        elements.searchInput?.focus();
    }
    
    // Enter key navigation in search results
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const searchItems = elements.searchResults.querySelectorAll('.search-result-item');
        if (searchItems.length > 0 && elements.searchResults.style.display === 'block') {
            e.preventDefault();
            // Basic keyboard navigation implementation would go here
        }
    }
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.textContent = message;
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.setAttribute('aria-live', 'polite');
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Announce important changes to screen readers
function displayPosts() {
    if (!elements.postsGrid) return;
    
    showLoading(true);
    
    let filteredPosts = blogPosts;
    if (currentFilter !== 'all') {
        filteredPosts = blogPosts.filter(post => post.category === currentFilter);
    }
    
    filteredPosts = sortPosts(filteredPosts, currentSort);
    
    setTimeout(() => {
        elements.postsGrid.innerHTML = '';
        
        if (filteredPosts.length === 0) {
            elements.postsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <h3>No posts found</h3>
                    <p>No posts match your current filter. Try selecting a different category or create a new post!</p>
                </div>
            `;
            announceToScreenReader('No posts found matching current filter');
        } else {
            filteredPosts.forEach((post, index) => {
                const postCard = createPostCard(post);
                postCard.style.animationDelay = `${index * 0.1}s`;
                postCard.setAttribute('tabindex', '0');
                postCard.setAttribute('role', 'button');
                postCard.setAttribute('aria-label', `Read post: ${post.title} by ${post.author}`);
                elements.postsGrid.appendChild(postCard);
            });
            announceToScreenReader(`${filteredPosts.length} posts loaded`);
        }
        
        showLoading(false);
    }, 500);
}

console.log('Enhanced Artist Blog Platform loaded successfully!')