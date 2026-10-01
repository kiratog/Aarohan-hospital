document.addEventListener("DOMContentLoaded", function () {
    document.fonts.ready.then(() => {

        gsap.registerPlugin(SplitText);

        const splits = SplitText.create(".hero-h", {
            type: "words",
            tag: "span",
            wordsClass: "word"
        });

        gsap.set(splits.words, {
            yPercent: 100
        });

        gsap.to(splits.words, {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        });

    });
});

const facilityData = {

    emergency: {
        title: "Emergency Care",
        description:
            "24x7 emergency response with rapid triage and stabilisation.",
        image: "./assets/emergency.webp",
        icon: "./assets/icons/ambulence.svg"
    },

    icu: {
        title: "ICU & Ventilator",
        description:
            "Continuous monitoring and critical-care support for patients requiring intensive treatment.",
        image: "./assets/icu.webp",
        icon: "./assets/icons/icu.svg"
    },

    beds: {
        title: "Bed Facilities",
        description:
            "Comfortable inpatient facilities designed to support patients throughout their stay.",
        image: "./assets/beds.webp",
        icon: "./assets/icons/bed.svg"
    },

    pharmacy: {
        title: "Pharmacy",
        description:
            "Convenient access to essential medicines and prescription support.",
        image: "./assets/pharmacy.webp",
        icon: "./assets/icons/pharmacy.svg"
    }

};


const items = document.querySelectorAll(".facility-item");

const image = document.querySelector("#facility-img");
const title = document.querySelector("#facility-h");
const description = document.querySelector("#facility-desc");
const icon = document.querySelector("#facility-icon");


let currentFacility = "emergency";
let isAnimating = false;


function changeFacility(id) {

    if (id === currentFacility || isAnimating) {
        return;
    }

    isAnimating = true;

    const facility = facilityData[id];

    const outgoing = [
        image,
        title,
        description,
        icon
    ];

    gsap.to(outgoing, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        ease: "power2.out",

        onComplete: () => {

            title.textContent = facility.title;
            description.textContent = facility.description;
            icon.src = facility.icon;
            image.src = facility.image;

            gsap.fromTo(
                outgoing,
                {
                    opacity: 0,
                    y: 10
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.03,
                    ease: "power3.out",

                    onComplete: () => {
                        isAnimating = false;
                    }
                }
            );

            items.forEach(item => {
                item.classList.toggle(
                    "active",
                    item.dataset.facility === id
                );
            });

            currentFacility = id;
        }
    });


    // image gets its own little zoom effect
    gsap.fromTo(
        image,
        {
            scale: 1.05
        },
        {
            scale: 1,
            duration: 0.6,
            ease: "power3.out"
        }
    );
}


items.forEach(item => {

    item.addEventListener("mouseenter", () => {
        changeFacility(item.dataset.facility);
    });

    // important for mobile
    item.addEventListener("click", () => {
        changeFacility(item.dataset.facility);
    });

});

const form = document.querySelector('.appointment-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert("Thank you! We have received your appointment request. We will call you shortly to confirm your appointment.");
});

const sideBar = document.querySelector('.sidebar')

function showSidebar (){
    sideBar.style.display = 'flex'
}
function hideSidebar (){
    sideBar.style.display = 'none'
}