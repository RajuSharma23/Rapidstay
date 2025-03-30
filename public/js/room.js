document.addEventListener("DOMContentLoaded", () => {
    const roomButtons = document.querySelectorAll(".view-details");

    roomButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const roomCard = event.target.closest(".room");

            if (!roomCard) return;

            const roomDetails = {
                type: roomCard.querySelector("h4").innerText,
                description: roomCard.querySelector(".desc").innerText,
                guests: roomCard.querySelector(".guests").innerText.replace('Up to ', '').replace(' guests', ''),
                size: roomCard.querySelector(".size").innerText,
                price: roomCard.querySelector(".price").innerText.replace('$', '').replace(' / night', '').trim(),
                image: roomCard.querySelector("img").src
            };

            // Store room details in localStorage
            localStorage.setItem("selectedRoom", JSON.stringify(roomDetails));

            // Redirect to room details page
            window.location.href = "/room-details";
        });
    });

    // DEBUG: Check if 10 rooms exist
    const rooms = document.querySelectorAll(".room");
    if (rooms.length < 10) {
        console.warn("Warning: Less than 10 rooms are displayed on the page.");
    }
});
