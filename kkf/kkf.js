// Add any custom interactivity here
document.addEventListener('DOMContentLoaded', function() {
    // Example: Button click for "Message from the President"
    const messageButton = document.querySelector('.hero-section .btn');
    messageButton.addEventListener('click', function() {
        var modal = new bootstrap.Modal(document.getElementById('presidentMessageModal'));
        modal.show();
    });

    // Show loading spinner
    function showLoadingSpinner() {
        document.getElementById('loadingSpinner').style.display = 'block';
    }

    // Hide loading spinner
    function hideLoadingSpinner() {
        document.getElementById('loadingSpinner').style.display = 'none';
    }

    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showLoadingSpinner();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill out all fields.');
                hideLoadingSpinner();
                return;
            }

            // AJAX form submission
            fetch('/submitContactForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('responseMessage').innerText = data.message;
                contactForm.reset(); // Clear the form
                hideLoadingSpinner();
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('responseMessage').innerText = 'Error sending message.';
                hideLoadingSpinner();
            });
        });
    }

    // Membership form submission
    document.getElementById('membershipForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('memberName').value.trim();
        const email = document.getElementById('memberEmail').value.trim();
        const phone = document.getElementById('memberPhone').value.trim();

        if (!name || !email || !phone) {
            alert('Please fill out all fields.');
            return;
        }

        // Example: Send form data to a server
        fetch('https://example.com/membership', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone }),
        })
        .then(response => response.json())
        .then(data => {
            alert('Membership form submitted successfully!');
            document.getElementById('membershipForm').reset(); // Clear the form
            var modal = bootstrap.Modal.getInstance(document.getElementById('membershipModal'));
            modal.hide();
        })
        .catch(error => {
            alert('Error submitting membership form.');
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Image upload and preview for activities
    function handleImageUpload(inputId, previewId) {
        const input = document.getElementById(inputId);
        const preview = document.getElementById(previewId);

        input.addEventListener('change', function() {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    handleImageUpload('activity1Image', 'activity1Preview');
    handleImageUpload('activity2Image', 'activity2Preview');
    handleImageUpload('activity3Image', 'activity3Preview');

    // Modal popup for "Message from the President"
    const presidentMessageBtn = document.getElementById('presidentMessageBtn');
    if (presidentMessageBtn) {
        presidentMessageBtn.addEventListener('click', function() {
            var modal = new bootstrap.Modal(document.getElementById('presidentMessageModal'));
            modal.show();
        });
    }

    // Initialize FullCalendar
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'en',
        events: [
            {
                title: 'Community Outreach',
                start: '2023-11-01',
                description: 'Description of Community Outreach event.'
            },
            {
                title: 'Educational Program',
                start: '2023-11-10',
                description: 'Description of Educational Program event.'
            },
            {
                title: 'Health Initiative',
                start: '2023-11-20',
                description: 'Description of Health Initiative event.'
            }
        ],
        eventClick: function(info) {
            document.getElementById('eventTitle').innerText = info.event.title;
            document.getElementById('eventDescription').innerText = info.event.extendedProps.description;
            document.getElementById('eventDate').innerText = info.event.start.toLocaleDateString();
            var modal = new bootstrap.Modal(document.getElementById('eventDetailsModal'));
            modal.show();
        }
    });
    calendar.render();

    // Fetch product data and display it
    fetch('/products')
        .then(response => response.json())
        .then(products => {
            const productContainer = document.getElementById('productContainer');
            products.forEach(product => {
                const productCard = `
                    <div class="col-md-4">
                        <div class="card" data-bs-toggle="modal" data-bs-target="#productModal" data-title="${product.title}" data-description="${product.description}" data-image="${product.image}">
                            <img src="${product.image}" class="card-img-top" alt="${product.title}">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">${product.description}</p>
                                <a href="#" class="btn btn-primary">Buy Now</a>
                            </div>
                        </div>
                    </div>
                `;
                productContainer.innerHTML += productCard;
            });
        });

    // Product modal interactivity
    var productModal = document.getElementById('productModal');
    productModal.addEventListener('show.bs.modal', function(event) {
        var button = event.relatedTarget;
        var title = button.getAttribute('data-title');
        var description = button.getAttribute('data-description');
        var image = button.getAttribute('data-image');

        var modalTitle = productModal.querySelector('.modal-title');
        var modalDescription = productModal.querySelector('#productDescription');
        var modalImage = productModal.querySelector('#productImage');

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalImage.src = image;
    });

    // Executive member modal interactivity
    var executiveModal = document.getElementById('executiveModal');
    executiveModal.addEventListener('show.bs.modal', function(event) {
        var button = event.relatedTarget;
        var name = button.getAttribute('data-name');
        var position = button.getAttribute('data-position');
        var bio = button.getAttribute('data-bio');
        var image = button.getAttribute('data-image');

        var modalName = executiveModal.querySelector('#executiveName');
        var modalPosition = executiveModal.querySelector('#executivePosition');
        var modalBio = executiveModal.querySelector('#executiveBio');
        var modalImage = executiveModal.querySelector('#executiveImage');

        modalName.textContent = name;
        modalPosition.textContent = position;
        modalBio.textContent = bio;
        modalImage.src = image;
    });
});
