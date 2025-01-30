let events = [];

document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('eventTitle').value;
    const date = new Date(document.getElementById('eventDate').value);
    const status = date > new Date() ? 'Upcoming' : 'Past';

    const newEvent = { title, date, status };
    events.push(newEvent);
    renderEvents();
    this.reset();
});

function renderEvents(filter = null) {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = '';

    const filteredEvents = filter ? events.filter(event => event.status === filter) : events;

    filteredEvents.forEach((event, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${event.title} - ${event.date.toLocaleDateString()} - ${event.status} 
            <button onclick="deleteEvent(${index})" style="background: red;">Delete</button>`;
        eventList.appendChild(li);
    });
}

function deleteEvent(index) {
    events.splice(index, 1);
    renderEvents();
}

document.getElementById('showUpcoming').addEventListener('click', () => renderEvents('Upcoming'));
document.getElementById('showPast').addEventListener('click', () => renderEvents('Past'));
document.getElementById('showAll').addEventListener('click', () => renderEvents());