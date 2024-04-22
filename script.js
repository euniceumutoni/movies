// Sample post data (moved outside the function scope)
let posts = JSON.parse(localStorage.getItem('posts')) || [
    {
        title: 'Stranger Things Season 4',
        content: 'The latest season of Stranger Things was mind-blowing! The plot twists and character development were incredible.',
        likes: 0,
        comments: []
    },
    {
        title: 'Top Gun: Maverick',
        content: 'Top Gun: Maverick was an adrenaline-pumping action movie with amazing aerial sequences. Highly recommended!',
        likes: 0,
        comments: []
    }
];

// Function to save posts data to localStorage
function savePosts() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Function to render post cards
function renderPosts() {
    const postsSection = document.getElementById('posts');
    postsSection.innerHTML = '';

    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList.add('post-card');

        const title = document.createElement('h2');
        title.textContent = post.title;

        const content = document.createElement('p');
        content.textContent = post.content;

        const likesCount = document.createElement('p');
        likesCount.textContent = `Likes: ${post.likes}`;

        const likeButton = document.createElement('button');
        likeButton.textContent = 'Like';
        likeButton.addEventListener('click', () => likePost(post));

        const postReviewButton = document.createElement('button');
        postReviewButton.textContent = 'Post a Review';
        postReviewButton.addEventListener('click', () => showReviewForm());

        const commentsSection = document.createElement('div');
        commentsSection.classList.add('comments');

        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Leave a comment...';

        const commentButton = document.createElement('button');
        commentButton.textContent = 'Comment';
        commentButton.addEventListener('click', () => addComment(post, commentInput.value));

        const comments = document.createElement('ul');
        post.comments.forEach(comment => {
            const commentItem = document.createElement('li');
            commentItem.textContent = comment;
            comments.appendChild(commentItem);
        });

        commentsSection.appendChild(commentInput);
        commentsSection.appendChild(commentButton);
        commentsSection.appendChild(comments);

        postCard.appendChild(title);
        postCard.appendChild(content);
        postCard.appendChild(likesCount);
        postCard.appendChild(likeButton);
        postCard.appendChild(postReviewButton);
        postCard.appendChild(commentsSection);

        postsSection.appendChild(postCard);
    });
}

// Function to like a post
function likePost(post) {
    post.likes++;
    savePosts();
    renderPosts();
}

// Function to add a comment to a post
function addComment(post, comment) {
    if (comment.trim() !== '') {
        post.comments.push(comment);
        savePosts();
        renderPosts();
    }
}

// Function to show the review form
// Function to show the review form
function showReviewForm() {
    const reviewForm = document.createElement('div');
    reviewForm.id = 'review-form';

    const container = document.createElement('div');
    container.classList.add('review-container');

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Enter the title of the movie/show';
    titleInput.classList.add('title-input'); // Add a class for styling

    const reviewTextarea = document.createElement('textarea');
    reviewTextarea.maxLength = 300;
    reviewTextarea.placeholder = 'Write your review here (300 words max)';
    reviewTextarea.classList.add('review-textarea'); // Add a class for styling

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Review';
    submitButton.classList.add('submit-button'); // Add a class for styling
    submitButton.addEventListener('click', submitReview);

    container.appendChild(titleInput);
    container.appendChild(reviewTextarea);
    container.appendChild(submitButton);
    
    reviewForm.appendChild(container);

    document.body.appendChild(reviewForm);
}

// Function to submit a review
function submitReview() {
    const titleInput = document.querySelector('.title-input');
    const reviewTextarea = document.querySelector('.review-textarea');

    const title = titleInput.value;
    const review = reviewTextarea.value;

    if (title.trim() !== '' && review.trim() !== '') {
        const newPost = {
            title,
            content: review,
            likes: 0,
            comments: []
        };

        posts.push(newPost);
        savePosts();
        renderPosts();
    }

    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        document.body.removeChild(reviewForm);
    }
}

// Initial render of posts
renderPosts();
