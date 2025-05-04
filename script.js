// Handle comments
const commentForms = document.querySelectorAll(".comment-form");

commentForms.forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = this.querySelector("input").value;
    const comment = this.querySelector("textarea").value;
    const commentsDiv = this.nextElementSibling;

    if (name && comment) {
      const p = document.createElement("p");
      p.innerHTML = `<strong>${name}:</strong> ${comment}`;
      commentsDiv.appendChild(p);
      this.reset();
    }
  });
});

// Handle adding new blog posts
const addBlogForm = document.getElementById("add-blog-form");
const main = document.querySelector("main");

addBlogForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("new-title").value;
  const imageUrl = document.getElementById("new-image").value;
  const content = document.getElementById("new-content").value;

  if (title && imageUrl && content) {
    const newPost = document.createElement("section");
    newPost.className = "blog-post";
    newPost.innerHTML = `
      <h2>${title}</h2>
      <p class="date">Published on ${new Date().toLocaleDateString()}</p>
      <img src="${imageUrl}" alt="${title}">
      <p>${content}</p>

      <div class="comment-section">
        <h3>Leave a Comment:</h3>
        <form class="comment-form">
          <input type="text" placeholder="Your Name" required>
          <textarea placeholder="Your Comment" required></textarea>
          <button type="submit">Post Comment</button>
        </form>
        <div class="comments"></div>
      </div>
    `;

    main.appendChild(newPost);
    attachEventListeners(newPost);
    this.reset();
  }
});

// Reusable function to attach event listeners to forms and add-content buttons
function attachEventListeners(post) {
  const form = post.querySelector(".comment-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = this.querySelector("input").value;
    const comment = this.querySelector("textarea").value;
    const commentsDiv = this.nextElementSibling;

    if (name && comment) {
      const p = document.createElement("p");
      p.innerHTML = `<strong>${name}:</strong> ${comment}`;
      commentsDiv.appendChild(p);
      this.reset();
    }
  });

  const addContentBtn = post.querySelector(".add-content-btn");
  addContentBtn.addEventListener("click", () => {
    const extraContent = prompt("Enter the additional content:");
    if (extraContent) {
      const p = document.createElement("p");
      p.textContent = extraContent;
      addContentBtn.insertAdjacentElement("beforebegin", p);
    }
  });
}

// Initial setup for existing posts
document.querySelectorAll(".blog-post").forEach((post) => {
  const addContentBtn = document.createElement("button");
  addContentBtn.className = "add-content-btn";
  post.appendChild(addContentBtn);
  attachEventListeners(post);
});
