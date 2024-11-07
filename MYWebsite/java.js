// Initial Click Screen Setup
document.getElementById('click-screen').addEventListener('click', () => {
    const cS = document.getElementById('click-screen');
    cS.style.backgroundColor = 'black'; 
    cS.style.opacity = '0'; 
    setTimeout(() => {
        cS.style.display = 'none'; 
        document.getElementById('content').style.display
    }, 1000); 
});



//changed its osition from top to bottom to be able to install clickscreen
document.addEventListener('mousemove', (e) => {
    // Get mouse position
    const mouseX = e.clientX + 'px';
    const mouseY = e.clientY + 'px';

    // Update CSS variables for spotlight position
    document.body.style.setProperty('--mouseX', mouseX);
    document.body.style.setProperty('--mouseY', mouseY);
});

//not to touch the above code as its the spotlight holder




// Initialize feedback array to collect feedbacks
let feedbackCollection = [];

// Check if user has already liked or disliked
let hasLikedOrDisliked = localStorage.getItem('userLikedOrDisliked') === 'true';

// Set up the like and dislike counts
let likeCount = Number(localStorage.getItem('likeCount')) || 0;
let dislikeCount = Number(localStorage.getItem('dislikeCount')) || 0;
document.getElementById('like-count').textContent = likeCount;
document.getElementById('dislike-count').textContent = dislikeCount;

// Like Button Functionality
document.getElementById('button').addEventListener('click', () => {
    if (!hasLikedOrDisliked) {
        if (confirm("Are you sure you want to like this?")) {
            likeCount++;
            document.getElementById('like-count').textContent = likeCount;
            localStorage.setItem('likeCount', likeCount);
            hasLikedOrDisliked = true;
            localStorage.setItem('userLikedOrDisliked', 'true');
            disableButtons();
        }
    }
});

// Dislike Button Functionality with Feedback Collection
document.getElementById('button1').addEventListener('click', () => {
    if (!hasLikedOrDisliked) {
        if (confirm("Are you sure you want to dislike this?")) {
            dislikeCount++;
            document.getElementById('dislike-count').textContent = dislikeCount;
            localStorage.setItem('dislikeCount', dislikeCount);
            hasLikedOrDisliked = true;
            localStorage.setItem('userLikedOrDisliked', 'true');
            disableButtons();

            // Prompt for feedback and save it
            const feedback = prompt("Please tell how I can make it better.");
            if (feedback) {
                feedbackCollection.push(feedback); // Save feedback to array
                console.log("Feedback collected: ", feedbackCollection); // Check feedback in console
            }
        }
    }
});


// Function to disable both buttons after one is clicked
function disableButtons() {
    document.getElementById('button').disabled = true;
    document.getElementById('button1').disabled = true;
}

// To verify feedbacks in code
window.feedbackCollection = feedbackCollection; // Access the feedback collection through console


//view counter 

document.addEventListener('DOMContentLoaded', () => {
    const viewCounterElement = document.getElementById('views-count');
    let viewCount = parseInt(localStorage.getItem('viewCount')) || 0;

    // Check sessionStorage to avoid counting multiple times in the same session
    if (!sessionStorage.getItem('visited')) {
        viewCount++;
        localStorage.setItem('viewCount', viewCount); // Update count in local storage
        sessionStorage.setItem('visited', 'true'); // Mark session as visited
        console.log("New visit detected. Updated view count:", viewCount);
    } else {
        console.log("Session already marked as visited. Current view count:", viewCount);
    }

    // Display the updated view count
    viewCounterElement.textContent = viewCount;
});

