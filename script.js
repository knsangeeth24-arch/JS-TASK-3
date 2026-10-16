let bookings = [];

let prices = {
    "Inception": 150,
    "The Lion King": 120,
    "Avengers Endgame": 180
};

let movie = document.getElementById("movie");
let tickets = document.getElementById("tickets");
let total = document.getElementById("total");
let form = document.getElementById("bookingForm");

function calculatePrice() {
    total.innerText =
        (prices[movie.value] || 0) *
        (Number(tickets.value) || 0);
}

movie.addEventListener("change", calculatePrice);
tickets.addEventListener("input", calculatePrice);

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = movie.value;
    let time = document.getElementById("time").value;
    let email = document.getElementById("email").value;
    let quantity = Number(tickets.value);

    if (!name || !time || !email ||
        !Number.isInteger(quantity) || quantity < 1) {
        document.getElementById("message").innerText =
            "Please enter valid details.";
        return;
    }

    let booking = {
        movie: name,
        time: time,
        email: email,
        tickets: quantity,
        price: prices[name] * quantity
    };

    bookings.push(booking);

    document.getElementById("message").innerText =
        "Booking successful! Total: Rs" + booking.price;

    showBookings();
    form.reset();
    calculatePrice();
});

function showBookings() {
    let list = document.getElementById("bookingList");
    let search = document.getElementById("search").value.toLowerCase();

    list.innerHTML = "";

    let found = 0;

    bookings.forEach(function(b, i) {
        if (!b.movie.toLowerCase().includes(search)) {
            return;
        }

        found++;

        let item = document.createElement("div");
        item.className = "booking-item";

        let details = document.createElement("p");
        details.innerText =
            b.movie + " | " + b.time +
            "\nTickets: " + b.tickets +
            "\nEmail: " + b.email +
            "\nTotal: Rs" + b.price;

        let cancel = document.createElement("button");
        cancel.innerText = "Cancel Booking";
        cancel.className = "cancel";

        cancel.addEventListener("click", function() {
            bookings.splice(i, 1);
            showBookings();
        });

        item.append(details, cancel);
        list.appendChild(item);
    });

    if (found === 0) {
        list.innerText = "No bookings found.";
    }

    document.getElementById("count").innerText = bookings.length;
}

document.getElementById("search").addEventListener("input", showBookings);

form.addEventListener("reset", function() {
    document.getElementById("message").innerText = "";
    setTimeout(calculatePrice(), 0);
});