const { ipcRenderer } = require("electron");
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('close-btn').addEventListener('click', () => {
        ipcRenderer.send('close-widget');
    });

    const topicInput = document.getElementById("topic-input");
    console.log("topicInput", topicInput);
    const container = document.getElementById("stories-container");

    // Load topic from localStorage
    let topic = localStorage.getItem("selectedTopic") || "Technology";
    topicInput.value = topic;
    fetchStories(topic);

    async function fetchStories(topic) {
        try {
            const stories = await ipcRenderer.invoke("fetch-stories", topic);
            container.innerHTML = ""; // Clear old stories

            stories.forEach(story => {
                const storyDiv = document.createElement("div");
                storyDiv.className = "story";
                storyDiv.innerHTML = `
                        <img src="${story.image || 'https://imgs.search.brave.com/JXNyc7dlbgD2KqdqJAGFI4cCImHQamHiiyFsBs6QPkE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzA0LzI4Lzk2/LzM2MF9GXzUwNDI4/OTYwNV96ZWhKaUsw/dEN1WkxQMk1kZkZC/cGNKZE9WeEtMblhn/MS5qcGc'}" alt="Story Image">                    <div class="story-text">
                        <h3 class="story-title">${story.title}</h3>
                        <p class="story-summary">${story.summary}</p>
                        <a href="${story.link}" target="_blank">Read More</a>
                    </div>
                `;

                container.appendChild(storyDiv);
            });
        } catch (error) {
            console.error("Failed to fetch stories:", error);
        }
    }

    // Update stories when topic changes
    topicInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            localStorage.setItem("selectedTopic", topicInput.value);
            fetchStories(topicInput.value);
        }
    });
});