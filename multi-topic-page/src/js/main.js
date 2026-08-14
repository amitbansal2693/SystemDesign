// This file contains the JavaScript code for the application. 
// It handles navigation between topics using embedded content (no server needed).

document.addEventListener('DOMContentLoaded', () => {
    const topicNav = document.getElementById('topic-nav');
    const topicContainer = document.getElementById('topic-container');
    const topicsData = document.getElementById('topics-data');

    // Get all topic data elements
    const topics = Array.from(topicsData.querySelectorAll('.topic-data')).map(elem => ({
        id: elem.getAttribute('data-topic-id'),
        title: elem.getAttribute('data-topic-title'),
        content: elem.innerHTML
    }));

    // Create navigation links
    topics.forEach(topic => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = topic.title;
        a.className = 'topic-link';
        a.setAttribute('data-topic-id', topic.id);

        a.addEventListener('click', (event) => {
            event.preventDefault();
            displayTopic(topic.id);
        });

        li.appendChild(a);
        topicNav.appendChild(li);
    });

    // Display the first topic by default
    if (topics.length > 0) {
        displayTopic(topics[0].id);
    }

    // Function to display a topic
    function displayTopic(topicId) {
        const topic = topics.find(t => t.id === topicId);
        if (topic) {
            // Update content with fade animation
            topicContainer.style.opacity = '0';
            setTimeout(() => {
                topicContainer.innerHTML = topic.content;
                topicContainer.style.opacity = '1';
            }, 150);

            // Update active link styling
            document.querySelectorAll('.topic-link').forEach(link => {
                link.style.fontWeight = 'normal';
                link.style.color = 'var(--nav-text)';
            });

            document.querySelector(`[data-topic-id="${topicId}"]`).style.fontWeight = 'bold';
            document.querySelector(`[data-topic-id="${topicId}"]`).style.color = '#ff6b6b';
        }
    }
});