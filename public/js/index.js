
    let index = 0;
    function showSlides() {
        let slides = document.querySelectorAll(".slide");
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.opacity = "0";
        }
        index++;
        if (index > slides.length) {
            index = 1;
        }
        slides[index - 1].style.opacity = "1";
        setTimeout(showSlides, 3000); // Change slide every 3 seconds
    }
    showSlides();

