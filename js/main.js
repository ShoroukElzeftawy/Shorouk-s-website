document.addEventListener('DOMContentLoaded', function () {
    const h2 = document.querySelector('#homePageStartContent h2');
    const h2M = document.querySelector('#homePageStartContentM h2');
    const h1Elements = document.querySelectorAll('#secondRow h1');
    const artistDescription = document.getElementById('homePageArtistDescription');
    const closeImage = document.querySelector('#homePageArtistDescription .close');
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const sideMenu = document.getElementById('sideMenu');
    const projects = document.querySelectorAll('.project');
    const projectShows = document.querySelectorAll('.projectShow');

    function changeVerticalPosition() {
        // Get the maximum height for the element's top margin, which is 80% of the viewport height
        const maxHeight = window.innerHeight * 0.8;
        // Calculate the height of the h2 element itself
        const h2Height = h2.offsetHeight;
        // Ensure the random top margin leaves enough space for the h2 element, within the 80vh limit
        const maxMarginTop = maxHeight - h2Height;
        // Generate a random margin-top, adjusted to stay within the calculated max height
        const newMarginTop = Math.random() * maxMarginTop;
        h2.style.top = `${newMarginTop}px`;
    }

    function changeVerticalPositionM() {
        // Get the maximum height for the element's top margin, which is 80% of the viewport height
        const maxHeight = window.innerHeight * 0.8;
        // Calculate the height of the h2 element itself
        const h2MHeight = h2M.offsetHeight;
        // Ensure the random top margin leaves enough space for the h2 element, within the 80vh limit
        const maxMarginTop = maxHeight - h2MHeight;
        // Generate a random margin-top, adjusted to stay within the calculated max height
        const newMarginTop = Math.random() * maxMarginTop;
        h2M.style.top = `${newMarginTop}px`;
    }

    // Listen for the end of the animation
    h2.addEventListener('animationiteration', changeVerticalPosition);
    h2M.addEventListener('animationiteration', changeVerticalPositionM);

    // Initialize the first position
    changeVerticalPosition();
    changeVerticalPositionM();

    // Function to show the artist description randomly
    h1Elements.forEach(h1 => {
        h1.addEventListener('click', () => {
            const maxX = window.innerWidth - artistDescription.offsetWidth;
            const maxY = window.innerHeight - artistDescription.offsetHeight;
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;
            artistDescription.style.left = `${randomX}px`;
            artistDescription.style.top = `${randomY}px`;
            artistDescription.style.display = 'block';
        });
    });

    // Function to close the artist description
    closeImage.addEventListener('click', () => {
        artistDescription.style.display = 'none';
    });

    // Functionality to drag the div
    let isDragging = false;
    let offsetX, offsetY;

    artistDescription.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - artistDescription.getBoundingClientRect().left;
        offsetY = e.clientY - artistDescription.getBoundingClientRect().top;
        artistDescription.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            artistDescription.style.left = `${e.clientX - offsetX}px`;
            artistDescription.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            artistDescription.style.cursor = 'grab';
        }
    });

    // start of Function to toggle the side menu visibility
    function toggleSideMenu() {
        if (sideMenu.style.display === 'block') {
            sideMenu.style.display = 'none';
            document.body.classList.remove('no-scroll'); // Enable scrolling when menu is closed
        } else {
            sideMenu.style.display = 'block';
            document.body.classList.add('no-scroll'); // Disable scrolling when menu is open
        }
    }

    // Function to close the side menu
    function closeSideMenu() {
        sideMenu.style.display = 'none';
        document.body.classList.remove('no-scroll'); // Re-enable scrolling when the menu is closed
    }

    // Attach event listener to the menu toggle button
    menuToggle.addEventListener('click', toggleSideMenu);
    closeMenu.addEventListener('click', closeSideMenu);

    // Close side menu when any link within the menu is clicked
    document.querySelectorAll('#mobileNavLinks a').forEach(link => {
        link.addEventListener('click', closeSideMenu);
    });
    
    // start of projectsPage 
    // Initially hide all .projectShow elements
   projectShows.forEach(projectShow => {
    projectShow.style.display = 'none';
});

projects.forEach(project => {
    project.addEventListener('click', function() {
        const projectShow = this.querySelector('.projectShow');
        const img = this.querySelector('img.plusImg');
        const isCurrentlyVisible = projectShow.style.display === 'block';

        // Reset all projectShows to their original state
        projectShows.forEach(show => {
            show.style.display = 'none';
            const plusImgInOtherProjects = show.closest('.project').querySelector('.plusImg');
            if (plusImgInOtherProjects) plusImgInOtherProjects.style.transform = 'rotate(0deg)';
        });

        // Toggle the visibility of the current projectShow
        if (!isCurrentlyVisible) {
            projectShow.style.display = 'block';
            img.style.transform = 'rotate(180deg)';
            this.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            projectShow.style.display = 'none';
            img.style.transform = 'rotate(0deg)';
            this.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Scroll the project into view if it is being closed
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100); // A slight delay to ensure the closing animation can be seen
        }
    });
});

    // end of projectsPage 

});


// start of Toggle theme and image on theme change
themeToggle.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    document.documentElement.classList.toggle('dark-mode');
});
// end of Toggle theme and image on theme change



// move after mouse move
document.addEventListener('DOMContentLoaded', () => {
    const imgDesktop = document.getElementById('background');
    const imgMobile = document.getElementById('backgroundMobile'); // New image for mobile

    let mouseX = 0;
    let mouseY = 0;
    let translateX = 0;
    let translateY = 0;
    let currentAngle = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX - (window.innerWidth / 2);
        mouseY = e.clientY - (window.innerHeight / 2);

        // Apply the movement to both images
        update(imgDesktop);
        update(imgMobile);
    });

    function update(img) {
        if (!img) return; // If the image isn't found, exit the function

        translateX += (mouseX - translateX) * 0.01;
        translateY += (mouseY - translateY) * 0.01;

        const angleToMouse = Math.atan2(mouseY - translateY, mouseX - translateX) * (180 / Math.PI);
        currentAngle += (angleToMouse - currentAngle) * 0.01;

        img.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${currentAngle}deg)`;
    }

    // Initial call to update for both images to set their initial position
    update(imgDesktop);
    update(imgMobile);

    // Continuously update the position
    function animate() {
        update(imgDesktop);
        update(imgMobile);
        requestAnimationFrame(animate);
    }

    animate();
});


