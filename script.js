// Date Initialization
const dateInput = document.getElementById('appointmentDate');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;

// Time Slots Generation
const timeSlotsContainer = document.getElementById('timeSlots');
const timeSlots = [];

for (let hour = 9; hour <= 18; hour++) {
    ['00', '30'].forEach((minute) => {
        const time = (hour < 10 ? '0' : '') + hour + ':' + minute;
        timeSlots.push(time);
    });
}

timeSlots.forEach((time) => {
    const slot = document.createElement('div');
    slot.className = 'time-slot';
    slot.textContent = time;
    slot.addEventListener('click', () => {
        const slots = document.querySelectorAll('.time-slot');
        slots.forEach((s) => {
            s.classList.remove('selected');
        });
        slot.classList.add('selected');
    });
    timeSlotsContainer.appendChild(slot);
});

// Service Selection
const services = document.querySelectorAll('.service');
let selectedService = null;

services.forEach((service) => {
    service.addEventListener('click', () => {
        services.forEach((s) => {
            s.classList.remove('selected');
        });
        service.classList.add('selected');
        selectedService = {
            name: service.getAttribute('data-service'),
            price: service.getAttribute('data-price'),
        };
    });
});

// Booking Process
const bookingForm = document.getElementById('bookingForm');
const confirmationMessage = document.getElementById('confirmationMessage');
const confirmationDetails = document.getElementById('confirmationDetails');
const bookButton = document.getElementById('bookAppointment');
const newAppointmentButton = document.getElementById('newAppointment');

bookButton.addEventListener('click', (e) => {
    e.preventDefault();

    const date = dateInput.value;
    const selectedTimeSlot = document.querySelector('.time-slot.selected');
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;

    if (!selectedService || !date || !selectedTimeSlot || !customerName || !customerPhone) {
        alert('Please complete all booking details');
        return;
    }

    // In real scenario, this would be sent to a backend
    const bookingDetails =
        'Service: ' + selectedService.name + ' ($' + selectedService.price + ')\n' +
        'Date: ' + date + '\n' +
        'Time: ' + selectedTimeSlot.textContent + '\n' +
        'Name: ' + customerName + '\n' +
        'Phone: ' + customerPhone;

    confirmationDetails.textContent = bookingDetails;
    bookingForm.style.display = 'none';
    confirmationMessage.style.display = 'block';

    // Simulate backend booking (log to console)
    console.log('Booking Details:', {
        service: selectedService,
        date: date,
        time: selectedTimeSlot.textContent,
        name: customerName,
        phone: customerPhone,
    });
});

// Reset for new appointment
newAppointmentButton.addEventListener('click', () => {
    bookingForm.style.display = 'block';
    confirmationMessage.style.display = 'none';
    
    // Reset form
    dateInput.value = '';
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
    
    services.forEach((s) => {
        s.classList.remove('selected');
    });
    
    document.querySelectorAll('.time-slot').forEach((s) => {
        s.classList.remove('selected');
    });
    
    selectedService = null;
});
