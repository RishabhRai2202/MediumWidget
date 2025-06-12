const { ipcRenderer } = require("electron");

        document.addEventListener("DOMContentLoaded", () => {
            const topicInput = document.getElementById("topic-input");
            const storiesContainer = document.getElementById("stories-container");
            const closeBtn = document.getElementById('close-btn');

            closeBtn.addEventListener('click', () => {
                ipcRenderer.send('close-widget');
            });

            // Load initial topic from localStorage or use a default
            let topic = localStorage.getItem("selectedTopic") || "Technology";
            topicInput.value = topic;
            fetchStories(topic);

            async function fetchStories(currentTopic) {
                // Show skeleton loaders
                let skeletonHTML = '';
                for (let i = 0; i < 3; i++) {
                    skeletonHTML += '<div class="skeleton bg-gray-800 rounded-lg h-28"></div>';
                }
                storiesContainer.innerHTML = skeletonHTML;

                try {
                    const stories = await ipcRenderer.invoke("fetch-stories", currentTopic);
                    storiesContainer.innerHTML = ""; // Clear loaders

                    if (stories.length === 0) {
                        storiesContainer.innerHTML = `<p class="text-center text-gray-500 col-span-full py-10">No stories found for "${currentTopic}".</p>`;
                        return;
                    }

                    stories.forEach(story => {
                        const storyDiv = document.createElement("div");
                        storyDiv.className = "story-card bg-gray-800 rounded-lg flex items-center p-3 cursor-pointer";
                        storyDiv.onclick = () => require('electron').shell.openExternal(story.link);
                        
                        // Use a placeholder if no image is found
                        const imageUrl = story.image || 'https://placehold.co/100x100/1F2937/4B5563?text=N/A';
                        
                        storyDiv.innerHTML = `
                            <img src="${imageUrl}" alt="Story thumbnail" class="w-20 h-20 object-cover rounded-md mr-4 flex-shrink-0" onerror="this.onerror=null;this.src='https://placehold.co/100x100/1F2937/4B5563?text=Error';">
                            <div class="story-text overflow-hidden">
                                <h3 class="story-title font-bold text-md text-gray-200 truncate">${story.title}</h3>
                                <p class="story-summary text-sm text-gray-400 mt-1" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${story.summary}</p>
                            </div>
                        `;
                        storiesContainer.appendChild(storyDiv);
                    });
                } catch (error) {
                    console.error("Failed to fetch stories:", error);
                    storiesContainer.innerHTML = `<p class="text-center text-red-500 col-span-full py-10">Failed to fetch stories. Check console.</p>`;
                }
            }

            // Update stories when topic changes
            topicInput.addEventListener("keypress", (event) => {
                if (event.key === "Enter") {
                    const newTopic = topicInput.value.trim();
                    if (newTopic) {
                        localStorage.setItem("selectedTopic", newTopic);
                        fetchStories(newTopic);
                    }
                }
            });
        });