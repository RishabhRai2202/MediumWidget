const { ipcRenderer } = require('electron');

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('close-btn').addEventListener('click', () => {
        ipcRenderer.send('close-widget');
    });

    // const refreshBtn = document.createElement('button');
    // refreshBtn.innerText = "Refresh";
    // refreshBtn.className = "refresh-btn";
    // document.body.appendChild(refreshBtn);

    // refreshBtn.addEventListener('click', loadStories);

    async function loadStories() {
        try {
            const stories = await ipcRenderer.invoke('fetch-stories');
            const container = document.getElementById('stories-container');
            container.innerHTML = "";
            stories.forEach(story => {
                const storyDiv = document.createElement('div');
                storyDiv.className = 'story';
                storyDiv.innerHTML = `
                    <img src="${story.image || 'https://imgs.search.brave.com/JXNyc7dlbgD2KqdqJAGFI4cCImHQamHiiyFsBs6QPkE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzA0LzI4Lzk2/LzM2MF9GXzUwNDI4/OTYwNV96ZWhKaUsw/dEN1WkxQMk1kZkZC/cGNKZE9WeEtMblhn/MS5qcGc'}" alt="Story Image">
                    <div class="text">
                        <h3>${story.title}</h3>
                        <p>${story.summary}</p>
                        <a href="${story.link}" target="_blank">Read More</a>
                    </div>
                `;

                container.appendChild(storyDiv);
            });
        } catch (error) {
            console.error("Failed to load stories:", error);
        }
    }

    loadStories();
});