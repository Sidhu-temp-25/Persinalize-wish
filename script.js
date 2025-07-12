document.addEventListener('DOMContentLoaded', () => {
    // --- Elements for the link generation page (index.html) ---
    const nameInput = document.getElementById('nameInput');
    const generateLinkBtn = document.getElementById('generateLinkBtn');
    const linkOutput = document.getElementById('linkOutput');
    const generatedLinkInput = document.getElementById('generatedLink');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const whatsappShareBtn = document.getElementById('whatsappShareBtn');

    // Check if we are on the link generation page (index.html)
    if (generateLinkBtn && nameInput && linkOutput && generatedLinkInput && copyLinkBtn && whatsappShareBtn) {
        // Initially hide the link output and WhatsApp button
        linkOutput.style.display = 'none';
        whatsappShareBtn.style.display = 'none'; // Ensure it's hidden on load

        generateLinkBtn.addEventListener('click', () => {
            const name = nameInput.value.trim(); // Get and trim the name
            if (name) {
                // Construct the base URL for wish.html
                // This ensures it works correctly whether hosted or run locally.
                const baseUrl = window.location.origin + window.location.pathname.replace('index.html', 'wish.html');
                // Encode the name to handle spaces and special characters safely in the URL
                const encodedName = encodeURIComponent(name);
                const wishLink = `${baseUrl}?name=${encodedName}`;

                // Display the generated link
                generatedLinkInput.value = wishLink;
                linkOutput.style.display = 'block'; // Show the link output section

                // Enable and set up the Copy Link button
                copyLinkBtn.addEventListener('click', () => {
                    generatedLinkInput.select(); // Select the text in the input
                    generatedLinkInput.setSelectionRange(0, 99999); // For mobile devices
                    document.execCommand('copy'); // Copy the selected text
                    alert('Link copied to clipboard!');
                });

                // Show and set up the WhatsApp Share button
                whatsappShareBtn.style.display = 'inline-block'; // Show it
                whatsappShareBtn.onclick = () => {
                    const shareMessage = `🎉 Happy Birthday! Click this link for a special wish from me: ${wishLink}`;
                    const encodedShareMessage = encodeURIComponent(shareMessage);

                    // WhatsApp share URL: wa.me is the most robust for web & mobile
                    const whatsappUrl = `https://wa.me/?text=${encodedShareMessage}`;

                    // Open WhatsApp in a new tab/window
                    window.open(whatsappUrl, '_blank');
                };

            } else {
                alert('Please enter a name to generate the wish link!');
                linkOutput.style.display = 'none'; // Hide if no name entered
                whatsappShareBtn.style.display = 'none'; // Hide WhatsApp button too
            }
        });
    }

    // --- Elements for the wish display page (wish.html) ---
    const wishMessageElement = document.getElementById('wishMessage');
    const recipientNameSpan = document.getElementById('recipientName');

    // Check if we are on the wish display page (wish.html)
    if (wishMessageElement && recipientNameSpan) {
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name'); // Get the 'name' parameter from the URL

        if (name) {
            // Decode the name and display it
            recipientNameSpan.textContent = decodeURIComponent(name);
        } else {
            // Fallback if no name is provided (e.g., someone just types wish.html)
            recipientNameSpan.textContent = 'Dear Friend';
            wishMessageElement.innerHTML = `Happy Birthday! We hope you have a fantastic day filled with joy and laughter.`;
            // You could also redirect them back to index.html if a name is strictly required
            // alert('No name provided in the link. Please generate a personalized link from the main page.');
            // window.location.href = 'index.html';
        }
    }
});