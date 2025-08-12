var actual = new Date();

function showCalendar(year, month) {
    var now = new Date(year, month - 1, 1);
    var last = new Date(year, month, 0);

    // Adjustment required, Sunday's value is 0.

    var firstDayWeek = now.getDay();
    var lastDayMonth = last.getDate();
    var day = 0;

    // No colour for background.

    var result = "<tr>";
    var dayActual = 0;
    console.log(lastDayMonth);
    var last_cell = firstDayWeek + lastDayMonth;

    // Looping rows upto 7 days
    for (var i = 1; i <= 42; i++) {
        if (i == firstDayWeek + 1) {

            // Determine what day to start.

            day = 1;
        }
        if (i <= firstDayWeek || i >= last_cell) {

            // Value of empty cell.

            result += "<td>&nbsp;</td>";
        } else {

            // Showing day

            if (
                day == actual.getDate() &&

                month == actual.getMonth() + 1 &&

                year == actual.getFullYear()
            )

                // Class 'today'

                result += "<td class='today'>" + day + "</td>";



            else

                // Daily fund apply only.

                result +=
                    "<td style='background-color: silver;'>" + day + "</td>";
            day++;
        }
        if (i % 7 == 0) {
            if (day > lastDayMonth) break;
            result += "</tr><tr>\n";
        }
    }

    result += "</tr>";

    var months =

        [
            "January",
            "February",
            "March",
            "Abril",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

    // Next month and year calculation

    var nextMonth = month + 1;
    var nextYear = year;

    if (month + 1 > 12) {
        nextMonth = 1;
        nextYear = year + 1;
    }

    // Previous month and year calculation

    var prevMonth = month - 1;
    var prevYear = year;

    if (month - 1 < 1) {
        prevMonth = 12;
        prevYear = year - 1;
    }

    // Updated caption and body content

    document
        .getElementById("calendar")
        .getElementsByTagName("caption")[0].innerHTML =
        "<div>" +
        months[month - 1] +
        " / " +
        year +
        "</div>" +
        "<div><a href='javascript:void(0)' onclick='showCalendar(" +
        prevYear +
        "," +
        prevMonth +
        ")'>&lt;</a> " +
        "<a href='javascript:void(0)' onclick='showCalendar(" +
        nextYear +
        "," +
        nextMonth +
        ")'>&gt;</a></div>";

    document
        .getElementById("calendar")
        .getElementsByTagName("tbody")[0].innerHTML = result;
}

// Start calander with current month

showCalendar(actual.getFullYear(), actual.getMonth() + 1);

document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll(".lazy-image");

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute("data-src");
                img.classList.remove("lazy-image");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach((image) => {
        imageObserver.observe(image);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let currentImageIndex = 0;
    const article = document.querySelector("#article-02");


    // Check article existince

    if (!article) {
        console.error("Article error, DOM not found.");
        return;
    }


    // Active image creation, h3 elements adding to article information. 

    const imageContainer = document.createElement("img");
    const descriptionContainer = document.createElement("h3");

    article.appendChild(imageContainer);
    article.appendChild(descriptionContainer);


    // Process of collecting images and getting descriptions from JSON file.


    fetch("data/discover.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Slow network response!");
            }
            return response.json();
        })
        .then((events) => {
            if (!events || events.length === 0) {
                console.error("Events not found within JSON file content.");
                return;
            }

            //This function updates description & image.

            function updateImage() {
                const event = events[currentImageIndex];
                imageContainer.src = `images/${event.image}`;

                // Alt attribute information added.

                imageContainer.alt = event.description;
                imageContainer.loading = "lazy";

                // Adding slow / lazy loading animation.

                descriptionContainer.textContent = event.description;

                // Move to the next image after 4 seconds

                currentImageIndex = (currentImageIndex + 1) % events.length;

            }

            // First time loading
            updateImage();


            // Image animation updating every 8 seconds.

            setInterval(() => {
                imageContainer.classList.remove("fade-in");

                // Restart CSS animation fade in.

                void imageContainer.offsetWidth;
                imageContainer.classList.add("fade-in");
                updateImage();
            }, 8000);
        })
        .catch((error) => {
            console.error("Error, unable to contact JSON file content:", error);
        });
});

document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll(".lazy-image");

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute("data-src");
                img.classList.remove("lazy-image");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach((image) => {
        imageObserver.observe(image);
    });
});
