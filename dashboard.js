/* =========================================
   LOAD USER PROFILE
========================================= */

const storedUser =
    localStorage.getItem("airguardUser");


if (storedUser) {

    const user =
        JSON.parse(storedUser);


    /* Name */

    document.getElementById(
        "profileName"
    ).textContent =
        user.fullName || "User";


    document.getElementById(
        "panelName"
    ).textContent =
        user.fullName || "User";


    document.getElementById(
        "welcomeName"
    ).textContent =
        user.fullName || "User";


    /* Email */

    document.getElementById(
        "panelEmail"
    ).textContent =
        user.email || "No email";


    /* Age */

    document.getElementById(
        "userAge"
    ).textContent =
        user.age || "--";


    /* Gender */

    document.getElementById(
        "userGender"
    ).textContent =
        user.gender || "--";


    /* Location */

    document.getElementById(
        "userLocation"
    ).textContent =
        user.location || "--";


    document.getElementById(
        "location"
    ).textContent =
        user.location || "Unknown Location";


    /* Diseases */

    let diseases =
        user.diseases || [];


    if (diseases.length > 0) {

        document.getElementById(
            "userDiseases"
        ).textContent =
            diseases.join(", ");

    } else {

        document.getElementById(
            "userDiseases"
        ).textContent =
            "None";

    }

}



/* =========================================
   PROFILE OPEN / CLOSE
========================================= */

function toggleProfile() {

    const panel =
        document.getElementById(
            "profilePanel"
        );


    panel.classList.toggle("show");

}


/* =========================================
   CLOSE PROFILE WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener(
    "click",
    function(event) {

        const panel =
            document.getElementById(
                "profilePanel"
            );

        const button =
            document.querySelector(
                ".profile-button"
            );


        if (
            !panel.contains(event.target) &&
            !button.contains(event.target)
        ) {

            panel.classList.remove(
                "show"
            );

        }

    }
);



/* =========================================
   LOGOUT
========================================= */

function logout() {

    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (confirmLogout) {

        localStorage.removeItem(
            "airguardUser"
        );

        localStorage.removeItem(
            "airguardEmail"
        );

        localStorage.removeItem(
            "airguardPassword"
        );


        window.location.href =
            "index.html";

    }

}



/* =========================================
   REFRESH DATA
========================================= */

function refreshData() {

    const button =
        document.querySelector(
            ".refresh-btn"
        );


    button.innerHTML =
        "⏳ Updating...";


    setTimeout(
        function() {

            button.innerHTML =
                "✓ Updated";

            setTimeout(
                function() {

                    button.innerHTML =
                        "🔄 Refresh Data";

                },
                1500
            );

        },
        1000
    );

}